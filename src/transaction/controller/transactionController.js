import VoteService from "../../vote/service/voteService.js";
import https from "https";
import { nanoid } from "nanoid";
import moment from "moment";

const insertVoteIntoDatabase = new VoteService();
const todaysDate = moment().format("DD-MM-YYYY");

const secretKey = process.env.PAYSTACK_TEST_KEY;

export const transaction = (req, res) => {
  const { number_of_vote, candidate_id } = req.body;
  const amount = number_of_vote * 100;
  try {
    const params = JSON.stringify({
      email: "customer@email.com",
      amount: amount,
      cart_id: todaysDate + "-" + nanoid(5),
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
          const details = JSON.parse(data);

          await insertVoteIntoDatabase.createCandidateVoteService(
            number_of_vote,
            candidate_id
          );
          return res.status(200).json(details);
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
