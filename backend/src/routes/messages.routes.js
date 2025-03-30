import express from 'express';
import { createMessage } from '../controllers/messages.controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';

const messageRouter = express.Router();

messageRouter.post('/create', authMiddleware, createMessage);

export { messageRouter };


