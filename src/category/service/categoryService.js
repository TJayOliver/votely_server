import { v4 as id } from "uuid";

class CategoryService {
  constructor(database) {
    this.database = database;
  }

  async createCategoryService(options) {
    try {
      const option = {
        id: id(),
        category_name: options.category_name,
        user_id: options.user_id,
      };
      const category = await this.database.createCategory(option);
      return category;
    } catch (error) {
      console.error("create category {Service}:", error.message);
    }
  }

  async readCategoryService(id) {
    try {
      const category = await this.database.readCategory(id);
      return category;
    } catch (error) {
      console.error("read category {Service}:", error.message);
    }
  }

  async deleteCategoryService(id) {
    try {
      const category = await this.database.deleteCategory(id);
      return category;
    } catch (error) {
      console.error("delete category {Service}:", error.message);
    }
  }

  async getCategoryByIDService(id) {
    try {
      const category = await this.database.getCategoryByID(id);
      return category;
    } catch (error) {
      console.error("get category by id category {Service}:", error.message);
    }
  }

  async getCategoryNameService(categoryname) {
    try {
      const category = await this.database.getCategoryName(categoryname);
      return category;
    } catch (error) {
      console.error("get category name category {Service}:", error.message);
    }
  }

  async getCategoryByNameService(categoryname) {
    try {
      const category = await this.database.getCategoryByName(categoryname);
      return category;
    } catch (error) {
      console.error("get category by name category {Service}:", error.message);
    }
  }
}

export default CategoryService;
