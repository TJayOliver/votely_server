import { executeQuery } from "../../../configurations/mysql.config.js";

class GlobalDatabase {
  async getLink(link) {
    try {
      const query = `SELECT 
        users.organization_name, 
        users.link, 
        users.about, 
        category.category_name, 
        candidate.candidate_name, 
        candidate.candidate_profile 
        FROM users 
        JOIN category USING(user_id)
        JOIN candidate USING(category_id)
        WHERE users.status = 'true' AND users.link = ?`;
      const parameter = [link];
      const global = await executeQuery(query, parameter);
      return global;
    } catch (error) {
      throw error;
    }
  }

  async userProfile(link) {
    try {
      const query = `SELECT 
        organization_name, 
        about,
        DATE_FORMAT(vote_deadline, '%d-%m-%Y') AS vote_deadline
        FROM users
        WHERE link = ?`;
      const parameter = [link];
      const global = await executeQuery(query, parameter);
      return global;
    } catch (error) {
      throw error;
    }
  }

  async userCategory(link) {
    try {
      const query = `SELECT 
        category.category_name
        FROM category
        JOIN users USING(user_id)
        WHERE users.link = ?
        ORDER BY category.category_name`;
      const parameter = [link];
      const global = await executeQuery(query, parameter);
      return global;
    } catch (error) {
      throw error;
    }
  }
}

export default GlobalDatabase;
