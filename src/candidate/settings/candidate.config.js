import CandidateController from "../controller/candidateController.js";
import CandidateService from "../service/candidateService.js";
import CandidateDatabase from "../database/candidateDatabase.js";

export const dependency = () => {
  const database = new CandidateDatabase();
  const service = new CandidateService(database);
  const controller = new CandidateController(service);

  return { controller };
};
