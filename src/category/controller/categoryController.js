class CategoryController {
  constructor(service) {
    this.service = service;
  }

  async createCategory(req, res) {
    const { category_name, user_id } = req.body;
    try {
      const options = {
        category_name,
        user_id,
      };
      const category = await this.service.createCategoryService(options);
      return res.status(201).json({ message: "success", data: category });
    } catch (error) {
      console.error("create category {Controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // displays all categories created by user using the user_id (user_id)
  async readCategory(req, res) {
    const { id } = req.params;
    try {
      const category = await this.service.readCategoryService(id);
      return res.status(201).json({ message: "success", data: category });
    } catch (error) {
      console.error("read category {Controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteCategory(req, res) {
    const { category_id } = req.params;
    try {
      const category = await this.service.deleteCategoryService(category_id);
      return res.status(201).json({ message: "success", data: category });
    } catch (error) {
      console.error("delete category {Controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // displays only the id from the category database
  async getCategoryByID(req, res) {
    try {
      const category = await this.service.getCategoryByIDService(id);
      return res.status(201).json({ message: "success", data: category });
    } catch (error) {
      console.error("get category by id category {Controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // displays all the candidates information from the category database using the categoryname
  async getCategoryByName(req, res) {
    const { name } = req.params;
    try {
      const category = await this.service.getCategoryByNameService(name);
      return res.status(201).json({ message: "success", data: category });
    } catch (error) {
      console.error(
        "get category by name category {Controller}:",
        error.message
      );
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default CategoryController;
