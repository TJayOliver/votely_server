import AdministratorController from "../controller/adminController.js";
import AdministratorService from "../service/adminService.js";
import AdministratorDatabase from "../database/adminDatabase.js";

export const dependency = () => {
  const database = new AdministratorDatabase();
  const service = new AdministratorService(database);
  const controller = new AdministratorController(service);

  return { controller };
};
