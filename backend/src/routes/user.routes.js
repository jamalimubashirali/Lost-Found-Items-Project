import express from 'express';
import { register, login, logout, getUser, getAllUsers, updateUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', authMiddleware, logout);
userRouter.get('/user', authMiddleware, getUser);
userRouter.put('/update', authMiddleware, updateUser);
userRouter.get('/all', authMiddleware, getAllUsers);

export { userRouter };