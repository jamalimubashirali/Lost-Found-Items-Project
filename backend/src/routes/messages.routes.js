import express from 'express';
import { createMessage , deleteMessage } from '../controllers/messages.controller.js';
import {authMiddleware} from '../middlewares/auth.middleware.js';

const messageRouter = express.Router();

messageRouter.post('/create-message', authMiddleware, createMessage);
messageRouter.delete('/delete-message/:messageId', authMiddleware, deleteMessage);

export { messageRouter };


