import UserController from "../controller/userController.js";
import UserService from "../service/userService.js";
import UserDatabase from "../database/userDatabase.js";

export const dependency = () => {
  const database = new UserDatabase();
  const service = new UserService(database);
  const controller = new UserController(service);

  return { controller };
};
