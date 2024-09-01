import { executeQuery } from "../../../configurations/mysql.config.js";

class CategoryDatabase {
  async createCategory(options) {
    try {
      const query =
        "INSERT INTO category (category_id, user_id, category_name) VALUES (?,?,?)";
      const parameter = [options.id, options.user_id, options.category_name];
      const category = await executeQuery(query, parameter);
      return category;
    } catch (error) {
      throw error;
    }
  }

  // displays all categories created by user using the user_id (user_id)
  async readCategory(id) {
    try {
      const query = `SELECT category_id, category_name, date_created FROM category WHERE user_id = ?  `;
      const parameter = [id];
      const category = await executeQuery(query, parameter);
      return category;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      const query = "DELETE FROM category WHERE category_id = ?";
      const parameter = [id];
      const category = await executeQuery(query, parameter);
      return category;
    } catch (error) {
      throw error;
    }
  }

  // displays only the id from the category database
  async getCategoryByID(id) {
    try {
      const query = "SELECT id FROM category WHERE category_id = ?";
      const parameter = [id];
      const category = await executeQuery(query, parameter);
      return category;
    } catch (error) {
      throw error;
    }
  }

  // displays all the candidates information from the category database using the categoryname
  async getCategoryByName(categoryname) {
    try {
      const query = `
            SELECT 
            candidate.candidate_id,
            candidate.candidate_name,
            candidate.candidate_profile,
            category.category_name,
            vote.number_of_vote 
            FROM candidate
            JOIN category USING(category_id)
            JOIN users ON category.user_id = users.user_id
            LEFT JOIN vote ON candidate.candidate_id = vote.candidate_id
            WHERE category_name = ?
            `;
      const parameter = [categoryname];
      const category = await executeQuery(query, parameter);
      return category;
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryDatabase;
