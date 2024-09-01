import { executeQuery } from "../../../configurations/mysql.config.js";

class UserDatabase {
  async createUser(profile) {
    try {
      const query = `INSERT INTO 
            users (user_id, organization_name, user_name, user_password, link, price_per_vote, vote_deadline, about, status) 
            VALUES (?,?,?,?,?,?,?,?,?)`;
      const parameter = [
        profile.id,
        profile.organization_name,
        profile.user_name,
        profile.user_password,
        profile.link,
        profile.price_per_vote,
        profile.vote_deadline,
        profile.about,
        profile.status,
      ];
      const user = await executeQuery(query, parameter);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async readUser() {
    try {
      const query = `SELECT * FROM users`;
      const user = await executeQuery(query);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async readUserByID(id) {
    try {
      const query = `SELECT 
      organization_name,
      user_name,
      user_password,
      link,
      about,
      vote_deadline,
      status,
      date_created
      FROM users
      WHERE user_id = ?`;
      const parameter = [id];
      const user = await executeQuery(query, parameter);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getPricePerVote(id) {
    try {
      const query = `
            SELECT price_per_vote, DATE_FORMAT(vote_deadline, '%Y-%m-%d') AS vote_deadline 
            FROM users
            WHERE user_id = ?
            `;
      const parameter = [id];
      const user = await executeQuery(query, parameter);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      const query = "DELETE FROM users WHERE user_id=?";
      const parameter = [id];
      const user = await executeQuery(query, parameter);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getLink(link) {
    try {
      const query = "SELECT link FROM users WHERE link = ?";
      const parameter = [link];
      const user = await executeQuery(query, parameter);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByID(id) {
    try {
      const query = "SELECT id FROM users WHERE user_id = ?";
      const parameter = [id];
      const user = await executeQuery(query, parameter);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserByUsername(username) {
    try {
      const query = "SELECT * FROM users WHERE user_name = ?";
      const parameter = [username];
      const user = await executeQuery(query, parameter);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getCategoryCandidate(id) {
    try {
      const query = `SELECT
            candidate.candidate_id,
            candidate.candidate_name,
            candidate.candidate_profile,
            category.category_name,
            candidate.image,
            vote.number_of_vote
            FROM candidate
            JOIN category USING(category_id)
            JOIN users ON candidate.user_id = users.user_id
            LEFT JOIN vote USING(candidate_id)
            WHERE users.user_id = ?
            ORDER BY category.category_name
            `;
      const parameter = [id];
      const user = await executeQuery(query, parameter);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getCategoryByName(category_name) {
    try {
      const query = `SELECT
            candidate.candidate_id,
            candidate.candidate_name,
            candidate.candidate_profile,
            category.category_name,
            candidate.image,
            vote.number_of_vote
            FROM candidate
            JOIN category USING(category_id)
            JOIN users ON candidate.user_id = users.user_id
            LEFT JOIN vote USING(candidate_id)
            WHERE category.category_name = ?
            ORDER BY category.category_name
            `;
      const parameter = [category_name];
      const user = await executeQuery(query, parameter);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUserStatus(user_name) {
    try {
      const query = `UPDATE users SET status = ? WHERE user_name = ?`;
      const parameter = ["true", user_name];
      const user = await executeQuery(query, parameter);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createOTP(details) {
    try {
      const query = `INSERT INTO onetimeverification (otp_code, user_name) VALUES (?, ?)`;
      const parameter = [details.otp, details.user_name];
      const user = await executeQuery(query, parameter);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async checkOTP(user_name, code) {
    try {
      const query = `SELECT * FROM onetimeverification WHERE user_name=? AND otp_code=?`;
      const parameter = [user_name, code];
      const user = await executeQuery(query, parameter);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteOTP() {
    try {
      const query = `DELETE FROM onetimeverification`;
      const user = await executeQuery(query);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async createVerificationCode(details) {
    try {
      const query = `INSERT INTO verificationcode (code, user_id) VALUES (?, ?)`;
      const parameter = [details.code, details.user_id];
      const user = await executeQuery(query, parameter);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async checkVerificationCode(user_id, code) {
    try {
      const query = `SELECT * FROM verificationcode WHERE user_id=? AND code=?`;
      const parameter = [user_id, code];
      const user = await executeQuery(query, parameter);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(details) {
    try {
      const query = `UPDATE users SET user_password = ? WHERE user_id = ?`;
      const parameter = [details.user_password, details.user_id];
      const user = await executeQuery(query, parameter);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async editUser(user_id) {
    try {
      const query = `
      SELECT 
      price_per_vote,
      organization_name,
      about,
      DATE_FORMAT(vote_deadline, '%Y-%m-%d') AS vote_deadline
      FROM users
      WHERE user_id = ?`;
      const parameter = [user_id];
      const user = await executeQuery(query, parameter);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(profile) {
    try {
      const query = `UPDATE users 
        SET  
        organization_name=?,
        price_per_vote=?,
        vote_deadline=?,
        about=?
        WHERE user_id =? 
        `;
      const parameter = [
        profile.organization_name,
        profile.price_per_vote,
        profile.vote_deadline,
        profile.about,
        profile.user_id,
      ];
      const user = await executeQuery(query, parameter);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async deleteVerificationCode() {
    try {
      const query = `DELETE FROM verificationcode`;
      const user = await executeQuery(query);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UserDatabase;
