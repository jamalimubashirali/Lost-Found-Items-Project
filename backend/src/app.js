import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

// Required Middlewares
app.use(cors({
    origin : process.env.FRONTEND_ORIGIN,
    credentials : true
}));
app.use(express.json({
    limit : "16kb"
}));
app.use(express.urlencoded({
    extended : true , limit : "16kb"
}));
app.use(cookieParser());


// Routes 


// Error Handling Middleware
app.use(errorHandler);


export {app};