import { v4 as id } from "uuid";

class CandidateService {
  constructor(database) {
    this.database = database;
  }

  async createCandidateService(details) {
    try {
      const option = {
        id: id(),
        user_id: details.user_id,
        candidate_name: details.candidate_name,
        candidate_profile: details.candidate_profile,
        category_id: details.category_id,
        image: details.image,
      };
      const candidate = await this.database.createCandidate(option);
      return candidate;
    } catch (error) {
      console.error("create candidate {Service}:", error.message);
    }
  }

  async readCandidateService() {
    try {
      const candidate = await this.database.readCandidate();
      return candidate;
    } catch (error) {
      console.error("read candidate {Service}:", error.message);
    }
  }

  async deleteCandidateService(id) {
    try {
      const candidate = await this.database.deleteCandidate(id);
      return candidate;
    } catch (error) {
      console.error("delete candidate {Service}:", error.message);
    }
  }

  async getCandidateByIDService(id) {
    try {
      const candidate = await this.database.getCandidateByID(id);
      return candidate;
    } catch (error) {
      console.error("get candidate by id candidate {Service}:", error.message);
    }
  }

  async getCandidateByNameService(Candidatename) {
    try {
      const candidate = await this.database.getCandidateByName(Candidatename);
      return candidate;
    } catch (error) {
      console.error(
        "get candidate by name candidate {Service}:",
        error.message
      );
    }
  }
}

export default CandidateService;
