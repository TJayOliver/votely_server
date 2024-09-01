import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as id } from "uuid";
import { sendMail } from "../../../configurations/sendMail.js";
import cronJob from "node-cron";
import moment from "moment";
import { nanoid } from "nanoid";

const today = moment().format("YYYY-MM-DD");

class UserService {
  constructor(database) {
    this.database = database;
  }

  async createUserService(profile) {
    const saltRounds = 10;
    try {
      const checkUsername = await this.database.getUserByUsername(
        profile.user_name
      );
      const checkLink = await this.database.getLink(profile.link);
      const password = profile.user_password;
      const confirmPassword = profile.confirm_password;
      if (password !== confirmPassword)
        return { error: "Password Do Not Match" };
      if (checkUsername.length) return { error: "Username exists" };
      if (checkLink.length) return { error: "Link exists" };
      if (profile.price_per_vote < 0.5)
        return { error: "A vote should cost 0.50 or more" };
      if (profile.vote_deadline === today)
        return { error: "Kindly Adjust Polls Deadline to the Next Day" };
      const sendOTP = await this.createOTPService(profile.user_name);
      if (sendOTP) {
        const passwordHash = await bcrypt.hash(
          profile.user_password,
          saltRounds
        );
        const details = {
          id: id(),
          user_name: profile.user_name,
          user_password: passwordHash,
          organization_name: profile.organization_name,
          link: profile.link,
          price_per_vote: profile.price_per_vote,
          about: profile.about,
          vote_deadline: profile.vote_deadline,
          status: profile.status,
        };
        const user = await this.database.createUser(details);
        return user;
      }
      return {
        error:
          "Sorry, E-mail Verification Error. Please try again later or contact our support team for assistance.",
      };
    } catch (error) {
      console.error("create user {service}:", error.message);
    }
  }

  async getLinkService(link) {
    try {
      const user = await this.database.getLink(link);
      return user;
    } catch (error) {
      console.error("get link {service}:", error.message);
    }
  }
  
  async readUserService() {
    try {
      const user = await this.database.readUser();
      return user;
    } catch (error) {
      console.error("read User {service}:", error.message);
    }
  }

  async readUserByIDService(id) {
    try {
      const user = await this.database.readUserByID(id);
      return user;
    } catch (error) {
      console.error("read User {service}:", error.message);
    }
  }

  async deleteUserService(id) {
    try {
      const checkID = await this.database.getUserByID(id);
      if (!checkID.length) return { error: "user does not exist" };
      const user = await this.database.deleteUserdatabase(id);
      return user;
    } catch (error) {
      console.error("delete user {service}:", error.message);
    }
  }

  async signInUserService(profile) {
    try {
      const checkUsername = await this.database.getUserByUsername(
        profile.user_name
      );
      if (checkUsername.length === 0)
        return { error: "Incorrect Username or Password" };
      const user = checkUsername[0];
      if (!user.user_name) return { error: "Incorrect Username or Password" };
      const passwordMatch = await bcrypt.compare(
        profile.user_password,
        user.user_password
      );
      if (!passwordMatch) return { error: "Incorrect Password" };
      const accessToken = jwt.sign(
        { user: user.user_id },
        process.env.ACCESS_TOKEN,
        { expiresIn: "1m" }
      );
      const refreshToken = jwt.sign(
        { user: user.user_id },
        process.env.REFRESH_TOKEN,
        { expiresIn: "20m" }
      );
      return { accessToken, refreshToken, user };
    } catch (error) {
      console.error("sign in User {service}:", error.message);
    }
  }

  async getPricePerVoteService(id) {
    try {
      const user = await this.database.getPricePerVote(id);
      return user;
    } catch (error) {
      console.error("get price per vote {service}:", error.message);
    }
  }

  async getCategoryCandidateService(id) {
    try {
      const user = await this.database.getCategoryCandidate(id);
      return user;
    } catch (error) {
      console.error("get category and candidate {service}:", error.message);
    }
  }

  async getCategoryByNameService(category_name) {
    try {
      const user = await this.database.getCategoryByName(category_name);
      return user;
    } catch (error) {
      console.error("get category by name {service}:", error.message);
    }
  }

  async getUserByUsernameService(user_name) {
    try {
      const user = await this.database.getUserByUsername(user_name);
      if (user) return user;
      return { error: "Username Does Not Exist" };
    } catch (error) {
      console.error("get user by username {service}:", error.message);
    }
  }

  async updateUserStatusService(user_name) {
    try {
      const user = await this.database.updateUserStatus(user_name);
      return user;
    } catch (error) {
      console.error("update user status {service}:", error.message);
    }
  }

  // for new accounts
  async createOTPService(user_name) {
    try {
      const details = {
        otp: nanoid(8),
        user_name,
      };
      await this.database.createOTP(details);
      cronJob.schedule("*/10 * * * *", async () => {
        try {
          await this.database.deleteOTP();
          console.log("Successfully Deleted OTP");
        } catch (error) {
          console.error(error.message);
        }
      });
      await sendMail(
        user_name,
        "Your One-Time Password (OTP) Code",
        `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@100..900&display=swap" rel="stylesheet">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                </head>
                <style>
                    .bebas-neue-regular {
                        font-family: "Bebas Neue", sans-serif;
                        font-weight: 500;
                        font-style: normal;
                        font-size: 50px;
                    }
                    .inter {
                        font-family: "Inter", sans-serif;
                        font-optical-sizing: auto;
                        font-weight: 300;
                        font-style: normal;
                        font-variation-settings: "slnt" 0;
                    }
                    .code{
                        font-size: 100px;
                        color: blue;
                    }
                    .time{
                        color: blue;
                        font-family: "Bebas Neue", sans-serif;
                        letter-spacing: 5px;
                    }
                    .material-symbols-outlined {
                        font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24
                    }
                    .material-symbols-outlined {
                        font-variation-settings:
                        'FILL' 0,
                        'wght' 400,
                        'GRAD' 0,
                        'opsz' 24
                    }
                    .call{
                        display: flex;
                        align-items: center;
                        gap: 1px
                        color: white
                    }
                    footer{
                        display: flex;
                        background-color: #261e1e;
                        color: white;
                        padding: 4px;
                        justify-content: space-between;
                    }
                </style>
                <body class="inter">
                    <header>
                        <h1 class="bebas-neue-regular">Verify Your Account</h1>
                    </header>
                    <main>
                        <section>
                            <p>Thank you for using our service. To proceed with your request, please find your OTP code below:</p>
                            <p class="code"> ${details.otp} </p>
                        </section>
                        <section>
                            <p>Please use this code within <b class="time">10 minutes</b> to verify your account. For security reasons, please do not share this code with anyone.</p>
                            <p>If you did not request this OTP or have any concerns, please contact our support team immediately.</p>
                            <p>Thank you for your cooperation </p>
                        </section>
                    </main>
                    <footer>
                            <div class="call">
                                <span class="material-symbols-outlined">mail:</span>
                                <p>contact@votely.gmail.com</p> 
                            </div>
                            
                            <div class="call">
                                <span class="material-symbols-outlined">call:</span>
                                <p>+233203695063</p>
                            </div>
                    </footer>
                </body>
                </html>`
      );
      return true;
    } catch (error) {
      console.error("create Verification Code {service}:", error.message);
    }
  }

  // for new accounts
  async checkOTPService(user_name, code) {
    try {
      const user = await this.database.checkOTP(user_name, code);
      if (user.length > 0) {
        const user = await this.updateUserStatusService(user_name);
        return user;
      }
      return { error: "OTP is Incorrect" };
    } catch (error) {
      console.error("checkVerificationCode {service}:", error.message);
    }
  }

  // forgot password
  async createVerificationCodeService(user_name) {
    try {
      const user = await this.database.getUserByUsername(user_name);
      if (user.length > 0) {
        const id = user[0].user_id;
        const details = {
          code: nanoid(8),
          user_id: id,
        };
        await this.database.createVerificationCode(details);
        cronJob.schedule("*/3 * * * *", async () => {
          try {
            await this.database.deleteVerificationCode();
            console.log("Successfully Deleted Sign in OTP");
          } catch (error) {
            console.error(error.message);
          }
        });
        await sendMail(
          user_name,
          "Your One-Time Verification Code",
          `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link rel="preconnect" href="https://fonts.googleapis.com">
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@100..900&display=swap" rel="stylesheet">
                        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                    </head>
                    <style>
                        .bebas-neue-regular {
                            font-family: "Bebas Neue", sans-serif;
                            font-weight: 500;
                            font-style: normal;
                            font-size: 50px;
                        }
                    
                        .inter {
                            font-family: "Inter", sans-serif;
                            font-optical-sizing: auto;
                            font-weight: 300;
                            font-style: normal;
                            font-variation-settings: "slnt" 0;
                        }
                        .code{
                            font-size: 100px;
                            color: blue;
                        }
                        .time{
                            color: blue;
                            font-family: "Bebas Neue", sans-serif;
                            letter-spacing: 5px;
                        }
                        .material-symbols-outlined {
                            font-variation-settings:
                            'FILL' 0,
                            'wght' 400,
                            'GRAD' 0,
                            'opsz' 24
                        }
                        .material-symbols-outlined {
                            font-variation-settings:
                            'FILL' 0,
                            'wght' 400,
                            'GRAD' 0,
                            'opsz' 24
                        }
                        .call{
                            display: flex;
                            align-items: center;
                            gap: 1px;
                            color: white;
                        }
                        footer{
                            display: flex;
                            background-color: #261e1e;
                            color: white;
                            padding: 4px;
                            justify-content: space-between;
                        }
                    </style>
                    <body class="inter">
                        <header>
                            <h1 class="bebas-neue-regular">Reset Password</h1>
                        </header>
                        <main>
                            <section>
                                <p>Thank you for using our service. To proceed with your request, please find your Verification code below:</p>
                                <p class="code"> ${details.code} </p>
                            </section>
                            <section>
                                <p>Please use this code within <b class="time">3 minutes</b> to reset your account. For security reasons, please do not share this code with anyone.</p>
                                <p>If you did not request this OTP or have any concerns, please contact our support team immediately.</p>
                                <p>Thank you for your cooperation </p>
                            </section>
                        </main>
                        <footer>
                                <div class="call">
                                    <span class="material-symbols-outlined">mail:</span>
                                    <p>contact@votely.gmail.com</p> 
                                </div>
                                
                                <div class="call">
                                    <span class="material-symbols-outlined">call:</span>
                                    <p>+233203695063</p>
                                </div>
                        </footer>
                    </body>
                    </html>`
        );

        return user;
      }
      return { error: "Username Does Not Exist" };
    } catch (error) {
      console.error("create Verification Code {service}:", error.message);
    }
  }

  // forgot password
  async checkVerificationCodeService(user_id, code) {
    try {
      const user = await this.database.checkVerificationCode(user_id, code);
      if (user.length > 0) return user;
      return { error: "Verification Code is Incorrect" };
    } catch (error) {
      console.error("checkVerificationCode {service}:", error.message);
    }
  }

  async updatePasswordService(details) {
    const saltRounds = 10;
    try {
      // check if user has already used the password
      const checkUser = await this.database.readUserByID(details.user_id);
      if (checkUser.length > 0) {
        const oldPassword = checkUser[0].user_password;
        const newPassword = details.user_password;
        const comparePassword = await bcrypt.compare(newPassword, oldPassword);
        if (comparePassword) return { error: "Use a different Password" };
      }
      if (details.user_password.length < 6)
        return { error: "Password must be more than 5 characters" };
      const passwordHash = await bcrypt.hash(details.user_password, saltRounds);
      const credentials = {
        user_id: details.user_id,
        user_password: passwordHash,
      };
      const user = await this.database.updatePassword(credentials);
      return user;
    } catch (error) {
      console.error("change password {service}:", error.message);
    }
  }

  // async updatePasswordService(profile) {
  //   try {
  //     const user = await this.database.updateUser(profile);
  //     return user;
  //   } catch (error) {
  //     console.error("change password {service}:", error.message);
  //   }
  // }

  async editUserService(user_id) {
    try {
      const user = await this.database.editUser(user_id);
      return user;
    } catch (error) {
      console.error("edit user {service}:", error.message);
    }
  }

  async deleteVerificationCodeService() {
    try {
      const user = await this.database.deleteVerificationCode();
      return user;
    } catch (error) {
      console.error("delete verification code {service}:", error.message);
    }
  }
}

export default UserService;
