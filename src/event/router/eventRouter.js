import express from "express";
import { dependency } from "../settings/event.config.js";

const { controller } = dependency();

const eventRouter = express.Router();

export default eventRouter;

eventRouter.get("/event/:link", async (req, res) => controller.getLink(req, res));

eventRouter.get("/event/profile/:id", async (req, res) => controller.userProfile(req, res));

eventRouter.get("/event/category/:id", async (req, res) => controller.userCategory(req, res));
