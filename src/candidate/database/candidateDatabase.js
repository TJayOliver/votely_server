import { executeQuery } from "../../../configurations/mysql.config.js";

class CandidateDatabase {
  async createCandidate(details) {
    try {
      const query =
        "INSERT INTO candidate (candidate_id, user_id, candidate_name, candidate_profile, category_id, image) VALUES (?,?,?,?,?,?)";
      const parameter = [
        details.id,
        details.user_id,
        details.candidate_name,
        details.candidate_profile,
        details.category_id,
        details.image,
      ];
      const candidate = await executeQuery(query, parameter);
      return candidate;
    } catch (error) {
      throw error;
    }
  }

  async readCandidate() {
    try {
      const query = `SELECT * FROM candidate`;
      const candidate = await executeQuery(query);
      return candidate;
    } catch (error) {
      throw error;
    }
  }

  async deleteCandidate(id) {
    try {
      const query = "DELETE FROM candidate WHERE candidate_id = ?";
      const parameter = [id];
      const candidate = await executeQuery(query, parameter);
      return candidate;
    } catch (error) {
      throw error;
    }
  }

  async getCandidateByID(id) {
    try {
      const query = "SELECT * FROM candidate WHERE candidate_id = ?";
      const parameter = [id];
      const candidate = await executeQuery(query, parameter);
      return candidate;
    } catch (error) {
      throw error;
    }
  }

  async getCandidateByName(candidatename) {
    try {
      const query = "SELECT * FROM candidate WHERE candidate_name = ?";
      const parameter = [candidatename];
      const candidate = await executeQuery(query, parameter);
      return candidate;
    } catch (error) {
      throw error;
    }
  }
}

export default CandidateDatabase;
