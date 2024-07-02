import express from "express";
import { dependency } from "../settings/event.config.js";

const { controller } = dependency();

const globalRouter = express.Router();

export default globalRouter;

globalRouter.get("/event/:link", async (req, res) => controller.getLink(req, res));

globalRouter.get("/event/profile/:id", async (req, res) => controller.userProfile(req, res));

globalRouter.get("/event/category/:id", async (req, res) => controller.userCategory(req, res));
