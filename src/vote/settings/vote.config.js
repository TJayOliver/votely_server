import VoteController from "../controller/voteController.js";
import VoteService from "../service/voteService.js";
import VoteDatabase from "../database/voteDatabase.js";

export const dependency = () => {
  const database = new VoteDatabase();
  const service = new VoteService(database);
  const controller = new VoteController(service);

  return { controller };
};
