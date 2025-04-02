import jwt from 'jsonwebtoken';
import { User } from '../models/User.model.js';
import { asyncHandler } from '../utils/asynchandler.js';

const register = asyncHandler(async (req, res) => {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
        return res.status(400).json({
            message: "Please fill in all fields",
        });
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists",
        });
    }
    const user = await User.create({ username, name, email, password }).select("-password");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
    });
    
    return res.status(201).json({
        user,
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // checking if email and password are provided
    if(!email || !password) {
        return res.status(400).json({
            message : "Please fill in all fields"
        });
    }
    // checking if user exists
    const user = await User.findOne({email});
    if(!user) {
        return res.status(400).json({
            message : "Invalid credentials"
        });
    }
    const isMatch = await user.isPasswordCorrect(password);
    if(!isMatch) {
        return res.status(400).json({
            message : "Invalid credentials"
        });
    }
    const token = jwt.sign({id : user._id} , process.env.JWT_SECRET_KEY , {
        expiresIn : "30d"
    });

    res.cookie("token" , token , {
        httpOnly : true,
        sameSite : "strict"
    });

    return res.status(200).json({
        user
    });
});

const logout = asyncHandler(async (_, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        message : "Logged out successfully"
    });
});

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if(!user) {
        return res.status(404).json({
            message : "User not found"
        });
    }
    return res.status(200).json({
        user
    });
});

const getUserById = asyncHandler(async (req , res) => {
    const {id} = req.params;

    const user = await User.findById(id);

    if(!user) {
        return res.status(404).json({
            message : "User not Found"
        });
    }

    return res.status(200).json({
        user
    });
});

const updateUser = asyncHandler(async (req, res) => {
    const updatedUserData = req.body;
    if(!updatedUserData){
        return res.status(400).json({
            message : "Please provide data to update"
        });
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id , updatedUserData , {
        new : true
    }).select("-password");

    return res.status(200).json({
        updatedUser
    });
});

const getAllUsers = asyncHandler(async (_, res) => {
    const users = await User.find({}).select("-password");
    return res.status(200).json({
        users
    });
});

export { register, login, logout , getUser , updateUser , getAllUsers , getUserById };
