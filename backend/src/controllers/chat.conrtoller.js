import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { Chat } from "../models/chatModel.js";
import { Message } from "../models/messageModel.js";

// 🟢 Start a new chat if it doesn’t exist
const startChat = asyncHandler(async (req, res) => {
    const { matchId, userId } = req.body;

    // Check if a chat already exists for the match
    let chat = await Chat.findOne({ matchId });

    if (!chat) {
        chat = new Chat({
            matchId,
            participants: [req.user._id, userId], // Current user and matched user
        });
        await chat.save();
    }

    res.status(200).json({ success: true, chatId: chat._id });
});

// 🟢 Retrieve chat messages using aggregation
const getChatMessages = asyncHandler(async (req, res) => {
    const { chatId } = req.params;

    // Aggregation pipeline to fetch messages linked to this chat
    const messages = await Message.aggregate([
        {
            $match: { chatId: mongoose.Types.ObjectId(chatId) }
        },
        {
            $lookup: {
                from: "users",
                localField: "senderId",
                foreignField: "_id",
                as: "senderInfo"
            }
        },
        {
            $unwind: "$senderInfo"
        },
        {
            $project: {
                _id: 1,
                message: 1,
                sender: {
                    _id: "$senderInfo._id",
                    name: "$senderInfo.name",
                    email: "$senderInfo.email"
                },
                createdAt: 1
            }
        },
        { $sort: { createdAt: 1 } } // Sort messages by time
    ]);

    res.status(200).json({ success: true, messages });
});

// 🟢 Send a message
const sendMessage = asyncHandler(async (req, res) => {
    const { chatId, message } = req.body;

    // Create a new message
    const newMessage = new Message({
        chatId,
        senderId: req.user._id,
        message
    });

    await newMessage.save();

    res.status(200).json({ success: true, message: newMessage });
});

export { startChat, getChatMessages, sendMessage };
