import express from 'express';
import { startChat, getChatMessages, sendMessage } from '../controllers/chat.conrtoller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const chatRouter = express.Router();

chatRouter.post('/start', authMiddleware, startChat);
chatRouter.get('/:chatId', authMiddleware, getChatMessages);
chatRouter.post('/:chatId', authMiddleware, sendMessage);

export { chatRouter };