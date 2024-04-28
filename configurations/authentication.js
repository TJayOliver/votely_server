import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import UserDatabase from "../src/user/database/userDatabase.js";
const database = new UserDatabase();

export default passport.use(
  new Strategy(
    { usernameField: "user_name", passwordField: "user_password" },
    async (user_name, user_password, done) => {
      try {
        const checkUsername = await database.getUserByUsername(user_name);
        const user = checkUsername[0];
        if (!user) return done(null, false);
        const passwordMatch = await bcrypt.compare(
          user_password,
          user.user_password
        );
        if (!passwordMatch) return done(null, false);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(async (user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (user_id, done) => {
  try {
    const user = await database.readUserByID(user_id);
    console.log(user);
    if (!user) return done(null, false);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
