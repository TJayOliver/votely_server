import express from 'express';
import { dependency } from '../settings/vote.config.js';

const voteRouter = express.Router();

const { controller } = dependency();


voteRouter.get('/vote/:candidate_id', 
    async (req, res) => controller.getVoteByCandidateID(req, res) 
);

voteRouter.post('/vote/create', 
    async (req, res) => controller.createCandidateVote(req, res) 
);

export default voteRouter;