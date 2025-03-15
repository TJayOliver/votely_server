import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import adminRouter from "./src/admin/router/adminRouter.js";
import userRouter from "./src/user/router/userRouter.js";
import categoryRouter from "./src/category/router/categoryRouter.js";
import candidateRouter from "./src/candidate/router/candidateRouter.js";
import globalRouter from "./src/event/router/eventRouter.js";
import voteRouter from "./src/vote/router/voteRouter.js";
import transactionRouter from "./src/transaction/router/transactionRouter.js";
import cookieParser from "cookie-parser";
import cronJob from "node-cron";
import { executeQuery } from "./configurations/mysql.config.js";
import helmet from "helmet";
import passport from "passport";
import session from "express-session";
import MySQLStore from "express-mysql-session";

dotenv.config();

const PORT = process.env.PORT;
const app = express();
const factory = MySQLStore(session);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use("/upload", express.static("upload"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const options = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  checkExpirationInterval: 60 * 60 * 1000,
  expiration: 60 * 60 * 1000,
};
const sessionStore = new factory(options);

app.use(
  session({
    key: "_u",
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { secure: true, sameSite: "strict", maxAge: 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(adminRouter);
app.use(userRouter);
app.use(categoryRouter);
app.use(candidateRouter);
app.use(globalRouter);
app.use(voteRouter);
app.use(transactionRouter);

// delete unverified new accounts after one week
cronJob.schedule("0 */3 * * *", async () => {
  try {
    const query = `DELETE FROM users WHERE status='false' AND date_created < NOW() - INTERVAL 1 WEEK`;
    const user = await executeQuery(query);
    return user;
  } catch (error) {
    console.error(error.message);
  }
});

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
}

app.listen(PORT, () => console.log(`Connected on http://localhost:${PORT}`));
