import express from 'express';
import { startChat, getChatMessages , deleteChat , getUserChats } from '../controllers/chat.conrtoller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const chatRouter = express.Router();

chatRouter.post('/start-chat', authMiddleware, startChat);
chatRouter.get('/get-chat-message/:chatId', authMiddleware, getChatMessages);
chatRouter.post('/delete-chat/:chatId', authMiddleware, deleteChat);
chatRouter.get('/get-user-chats', authMiddleware, getUserChats);

export { chatRouter };