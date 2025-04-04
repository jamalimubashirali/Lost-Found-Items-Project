import express from 'express';
import { createMatches, getMatches, updateMatchStatus } from '../controllers/matches.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const matchesRouter = express.Router();

matchesRouter.post('/create-match/:itemId', createMatches);
matchesRouter.get('/get-match/:itemId', getMatches);
matchesRouter.patch('/update-match/:id', updateMatchStatus);

export { matchesRouter };