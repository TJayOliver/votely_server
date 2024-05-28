import { v4 as id } from "uuid";

class VoteService {
  constructor(database) {
    this.database = database;
  }

  async getVoteByCandidateIDService(candidate_id) {
    try {
      const vote = await this.database.getVoteByCandidateID(candidate_id);
      return vote;
    } catch (error) {
      console.error("get vote by candidate id {service}:", error.message);
    }
  }

  async createCandidateVoteService(number_of_vote, candidate_id) {
    try {
      const checkCandidateExistance = await this.getVoteByCandidateIDService(
        candidate_id
      );
      if (checkCandidateExistance.length > 0)
        return this.updateCandidateVoteService(number_of_vote, candidate_id);
      const votes = {
        vote_id: id(),
        number_of_vote: number_of_vote,
        candidate_id: candidate_id,
      };
      const vote = await this.database.createCandidateVote(votes);
      return vote;
    } catch (error) {
      console.error("create candidate vote {service}:", error.message);
    }
  }

  async updateCandidateVoteService(number_of_vote, candidate_id) {
    try {
      const getPreviousVote = await this.getVoteByCandidateIDService(
        candidate_id
      );
      const candidateNumberOfVote = getPreviousVote[0].number_of_vote;
      const currentVote =
        Number(candidateNumberOfVote) + Number(number_of_vote);
      const newVote = {
        number_of_vote: currentVote,
        candidate_id: candidate_id,
      };
      const vote = await this.database.updateCandidateVote(newVote);
      return vote;
    } catch (error) {
      console.error("update candidate vote {service}:", error.message);
    }
  }
}

export default VoteService;
