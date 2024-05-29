import { executeQuery } from "../../../configurations/mysql.config.js";

class VoteDatabase {
  async getVoteByCandidateID(id) {
    try {
      const query = `
            SELECT * 
            FROM vote 
            JOIN candidate USING(candidate_id)
            WHERE candidate.candidate_id = ?
            `;
      const parameter = [id];
      const vote = await executeQuery(query, parameter);
      return vote;
    } catch (error) {
      throw error;
    }
  }

  async createCandidateVote(voted) {
    try {
      const query = `
            INSERT INTO 
            vote (number_of_vote, candidate_id)
            VALUES(?,?)
            `;
      const parameter = [voted.number_of_vote, voted.candidate_id];
      const vote = await executeQuery(query, parameter);
      return vote;
    } catch (error) {
      throw error;
    }
  }

  async updateCandidateVote(voted) {
    try {
      const query = `
            UPDATE vote
            SET 
            number_of_vote = ?
            WHERE candidate_id = ?
            `;
      const parameter = [voted.number_of_vote, voted.candidate_id];
      const vote = await executeQuery(query, parameter);
      return vote;
    } catch (error) {
      throw error;
    }
  }
}

export default VoteDatabase;
