import express from "express";
import { dependency } from "../settings/candidate.config.js";
import { upload, handleMulterErrors } from "../../../configurations/multer.js";

const { controller } = dependency();

const candidateRouter = express.Router();

candidateRouter.get("/candidate", async (req, res) =>
  controller.readCandidate(req, res)
);

candidateRouter.get("/candidate/id/:candidate_id", async (req, res) =>
  controller.getCandidateByID(req, res)
);

candidateRouter.post(
  "/candidate/create",
  upload.single("image"),
  handleMulterErrors,
  async (req, res) => controller.createCandidate(req, res)
);

candidateRouter.delete("/candidate/delete/:candidate_id", async (req, res) =>
  controller.deleteCandidate(req, res)
);

export default candidateRouter;
