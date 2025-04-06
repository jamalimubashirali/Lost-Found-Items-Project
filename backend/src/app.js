import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

// Required Middlewares
app.use(cors({
    origin: process.env.FONTEND_ORIGIN,
    credentials: true
}));
app.use(express.json({
    limit: "16kb"
}));
app.use(express.urlencoded({
    extended: true, limit: "16kb"
}));
app.use(cookieParser());


// Routes 
import { chatRouter } from "./routes/chats.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { matchesRouter } from "./routes/matches.routes.js";
import { messageRouter } from "./routes/messages.routes.js";
import { itemRouter } from "./routes/item.routes.js";

app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/matches", matchesRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/items", itemRouter);


// Error Handling Middleware
app.use(errorHandler);


export { app };