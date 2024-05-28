import CategoryController from "../controller/categoryController.js";
import CategoryService from "../service/categoryService.js";
import CategoryDatabase from "../database/categoryDatabase.js";

export const dependency = () => {
  const database = new CategoryDatabase();
  const service = new CategoryService(database);
  const controller = new CategoryController(service);

  return { controller };
};
