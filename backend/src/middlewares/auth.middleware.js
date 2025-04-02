import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../models/User.model.js";

const authMiddleware = asyncHandler( async (req , res , next) => {
    try {
        const token = req.cookies?.token || req.header("Authorization")?.split(" ")[1];

        if(!token) {
            return res.status(401).json({
                message : "Unathorized User"
            });
        }
        
        const decoded =  jwt.verify(token , process.env.JWT_SECRET_KEY);

        const user = await User.findById({
            _id : decoded.id
        }); // Implement Database Check
        
        if(!user) {
            return res.status(400).json({
                message : "Invalid Token"
            });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            message : "Error Verify the user Authentication"
        });
    }
})

export { authMiddleware };