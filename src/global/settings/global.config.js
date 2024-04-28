import GlobalController from "../controller/globalController.js";
import GlobalService from "../service/globalService.js";
import GlobalDatabase from "../database/globalDatabase.js";

export const dependency = () => {
  const database = new GlobalDatabase();
  const service = new GlobalService(database);
  const controller = new GlobalController(service);

  return { controller };
};
