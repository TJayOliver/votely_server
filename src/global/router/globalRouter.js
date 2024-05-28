import express from "express";
import { dependency } from "../settings/global.config.js";

const { controller } = dependency();

const globalRouter = express.Router();

export default globalRouter;

globalRouter.get("/global/:link", async (req, res) =>
  controller.getLink(req, res)
);

globalRouter.get("/global/profile/:id", async (req, res) =>
  controller.userProfile(req, res)
);

globalRouter.get("/global/category/:id", async (req, res) =>
  controller.userCategory(req, res)
);
