import express from 'express';
import { createMatches, getMatches, updateMatchStatus } from '../controllers/matches.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const matchesRouter = express.Router();

matchesRouter.post('/create-match/:itemId',authMiddleware ,createMatches);
matchesRouter.get('/get-match/:itemId',authMiddleware ,getMatches);
matchesRouter.patch('/update-match/:id',authMiddleware ,updateMatchStatus);

export { matchesRouter };