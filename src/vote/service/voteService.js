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

  async createCandidateVoteService(voted) {
    try {
      const checkCandidateExistance = await this.getVoteByCandidateIDService(
        voted.candidate_id
      );
      if (checkCandidateExistance.length > 0)
        return this.updateCandidateVoteService(voted);
      const votes = {
        vote_id: id(),
        number_of_vote: voted.number_of_vote,
        candidate_id: voted.candidate_id,
      };
      const vote = await this.database.createCandidateVote(votes);
      return vote;
    } catch (error) {
      console.error("cteate candidate vote {service}:", error.message);
    }
  }

  async updateCandidateVoteService(voted) {
    try {
      const getPreviousVote = await this.getVoteByCandidateIDService(
        voted.candidate_id
      );
      const candidateNumberOfVote = getPreviousVote[0].number_of_vote;
      const currentVote =
        Number(candidateNumberOfVote) + Number(voted.number_of_vote);
      const newVote = {
        number_of_vote: currentVote,
        candidate_id: voted.candidate_id,
      };
      const vote = await this.database.updateCandidateVote(newVote);
      return vote;
    } catch (error) {
      console.error("update candidate vote {service}:", error.message);
    }
  }
}

export default VoteService;
