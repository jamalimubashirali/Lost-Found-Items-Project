import express from 'express';
import { createMatches, getMatches, updateMatchStatus } from '../controllers/matches.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const matchesRouter = express.Router();

matchesRouter.post('/:lostItemId', authMiddleware, createMatches);
matchesRouter.get('/:lostItemId', authMiddleware, getMatches);
matchesRouter.put('/:id', authMiddleware, updateMatchStatus);

export { matchesRouter };