import express from 'express';
import { register, login, logout, getUser, getAllUsers, updateUser, getUserById} from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', authMiddleware, logout);
userRouter.get('/', authMiddleware, getUser);
userRouter.get('/all-users', getAllUsers);
userRouter.get('/:id' , authMiddleware , getUserById);
userRouter.put('/update/:id', authMiddleware, updateUser);

export { userRouter };