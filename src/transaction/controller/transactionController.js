import VoteService from "../../vote/service/voteService.js";
import TransactionDatabase from "../database/transactionDatabase.js";
import CandidateDatabase from "../../candidate/database/candidateDatabase.js";
import UserDatabase from "../../user/database/userDatabase.js";
import https from "https";
import { nanoid } from "nanoid";
import moment from "moment";

const insertVoteIntoDatabase = new VoteService();
const insertTransactionDetailsToDatabase = new TransactionDatabase();
const candidateDatabase = new CandidateDatabase();
const userDatabase = new UserDatabase();

const todaysDate = moment().format("DD-MM-YYYY");

const secretKey = process.env.PAYSTACK_TEST_KEY;

export const makePayment = (req, res) => {
  const { number_of_vote, candidate_id } = req.body;
  const amount = number_of_vote * 100;
  try {
    const params = JSON.stringify({
      email: "customer@email.com",
      amount: amount,
      ref: todaysDate + nanoid(5),
      callback_url: process.env.CLIENT_URL + `/global/${candidate_id}/voted`,
    });

    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
    };

    const callPaystack = https
      .request(options, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", async () => {
          const response = JSON.parse(data);
          return res.status(200).json(response);
        });
      })
      .on("error", (error) => {
        console.error(error.message);
        return res.status(500).json("Internal Server Error");
      });
    callPaystack.write(params);
    callPaystack.end();
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

export const verifyPayment = (req, res) => {
  const { reference, candidate_id } = req.body;

  try {
    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: `/transaction/verify/${reference}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    };
    const request = https.request(options, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", async () => {
        try {
          const jsonResponse = await JSON.parse(data);
          const status = jsonResponse.data.status;
          const details = {
            reference_id: jsonResponse.data.reference,
            receipt_number: jsonResponse.data.receipt_number,
            amount: jsonResponse.data.amount / 100,
            candidate_id: candidate_id,
          };
          if (status === "success") {
            const existingReferenceID = await insertTransactionDetailsToDatabase.getReferenceID(details.reference_id);
            if (existingReferenceID.length < 1) {
              const getUserIDFromCandidateID = await candidateDatabase.getCandidateByID(candidate_id);
              const userID = getUserIDFromCandidateID[0].user_id;
              const getPricePerVoteFromUserID = await userDatabase.getPricePerVote(userID);
              const pricePerVote = getPricePerVoteFromUserID[0].price_per_vote;
              const number_of_vote = details.amount / pricePerVote;
              await insertTransactionDetailsToDatabase.createTransaction(details);
              await insertVoteIntoDatabase.createCandidateVoteService(number_of_vote, candidate_id);
              return res.status(200).json(jsonResponse);
            } else {
              console.log("Transaction already exists");
            }
          }
        } catch (error) {
          console.error("JSON parse error:", error.message);
          return res.status(500).json("Internal Server Error");
        }
      });
    });

    request.on("error", (error) => {
      console.error("Request error:", error.message);
      return res.status(500).json("Internal Server Error");
    });

    request.end();
  } catch (error) {
    console.error("verify transaction error:", error.message);
    return res.status(500).json("Internal Server Error");
  }
};
