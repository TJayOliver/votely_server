import { validationResult } from "express-validator";

class UserController {
  constructor(service) {
    this.service = service;
  }

  async createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      organization_name,
      user_name,
      user_password,
      link,
      about,
      price_per_vote,
      vote_deadline,
      status,
      confirm_password,
    } = req.body;
    try {
      const profile = {
        organization_name,
        user_name,
        user_password,
        link,
        price_per_vote,
        vote_deadline,
        about,
        status,
        confirm_password,
      };
      const user = await this.service.createUserService(profile);
      if (user.error) return res.status(409).json({ error: user.error });
      return res.status(201).json({ message: true, data: user });
    } catch (error) {
      console.error("create user {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readUser(req, res) {
    try {
      const user = await this.service.readUserService();
      return res.status(201).json({ message: "Success", data: user });
    } catch (error) {
      console.error("read user {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async readUserByID(req, res) {
    const { id } = req.params;
    try {
      const user = await this.service.readUserByIDService(id);
      return res.status(201).json({ message: true, data: user });
    } catch (error) {
      console.error("read user by id {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await this.service.deleteUserService(id);
      if (user.error) return res.status(409).json({ error: user.error });
      return res.status(201).json({ message: "Success", data: user });
    } catch (error) {
      console.error("delete user {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async signInUser(req, res) {
    const user = req.user;
    return res.status(200).json({ message: true, user });
  }

  async getPricePerVote(req, res) {
    const { user_id } = req.params;
    try {
      const user = await this.service.getPricePerVoteService(user_id);
      return res.status(201).json({ message: "Success", data: user });
    } catch (error) {
      console.error("get vote cost {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // displays all the categories and its candidates
  async getCategoryCandidate(req, res) {
    const { id } = req.params;
    try {
      const user = await this.service.getCategoryCandidateService(
        id
      );
      return res.status(201).json({ message: "Success", data: user });
    } catch (error) {
      console.error("get category and candidate {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getCategoryByName (req, res) {
    const { category_name } = req.params;
    try {
      const user = await this.service.getCategoryByNameService(
        category_name
      );
      return res.status(201).json({ message: "Success", data: user });
    } catch (error) {
      console.error("get category by name {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async verifyUserCredentials(req, res) {
    try {
      return res.status(201).json({ status: true, user });
    } catch (error) {
      console.error("verify user {controller}");
    }
  }

  async logOutUser(req, res, next) {
    req.logout((err) => {
      if (err) return next(err);
      return res.status(201).json({ status: false });
    });
  }

  async getUserByUsername(req, res) {
    const { user_name } = req.body;
    try {
      const user = await this.service.getUserByUsernameService(user_name);
      return res.status(201).json({ message: true, user });
    } catch (error) {
      console.error("get user by username {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createOTP(req, res) {
    const { user_name } = req.body;
    try {
      const user = await this.service.createOTPService(user_name);
      if (!user) return res.status(500).json({ message: false });
      return res.status(201).json({ message: true });
    } catch (error) {
      console.error("check otp {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async checkOTP(req, res) {
    const { user_name, code } = req.body;
    try {
      const user = await this.service.checkOTPService(user_name, code);
      if (user.error) return res.status(409).json({ message: user.error });
      return res.status(201).json({ message: true });
    } catch (error) {
      console.error("check otp {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createVerificationCode(req, res) {
    const { user_name } = req.body;
    try {
      const user = await this.service.createVerificationCodeService(user_name);
      if (user.error) return res.status(409).json({ message: user.error });
      const id = user[0].user_id;
      return res.status(201).json({ message: true, user: id });
    } catch (error) {
      console.error("create verification code {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async checkVerificationCode(req, res) {
    const { user_id, code } = req.body;
    try {
      const user = await this.service.checkVerificationCodeService(
        user_id,
        code
      );
      if (user.error) return res.status(409).json({ message: user.error });
      return res.status(201).json({ message: true });
    } catch (error) {
      console.error("check verification code {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updatePassword(req, res) {
    const { user_id, user_password } = req.body;
    try {
      const details = {
        user_id,
        user_password,
      };
      const user = await this.service.updatePasswordService(details);
      if (user.error) return res.status(409).json({ message: user.error });
      return res.status(201).json({ message: true });
    } catch (error) {
      console.error("change password {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateUser(req, res) {
    const { user_id, organization_name, about, price_per_vote, vote_deadline } =
      req.body;
    try {
      const profile = {
        user_id,
        organization_name,
        about,
        price_per_vote,
        vote_deadline,
      };
      const user = await this.service.updateUserService(profile);
      return res.status(201).json({ message: true });
    } catch (error) {
      console.error("update user{controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async editUser(req, res) {
    const { user_id } = req.params;
    try {
      const user = await this.service.editUserService(user_id);
      return res.status(201).json({ message: true, data: user });
    } catch (error) {
      console.error("edit user {controller}:", error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default UserController;
