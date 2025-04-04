import { asyncHandler } from "../utils/asynchandler.js";
import mongoose from "mongoose";
import { Chat } from "../models/Chat.model.js";
import { Message } from "../models/messages.model.js";

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

const deleteChat = asyncHandler(async (req, res) => {
    const { chatId } = req.params;

    // Check if the chat exists
    const chat = await Chat.findById(chatId);
    if (!chat) {
        return res.status(404).json({ success: false, message: "Chat not found" });
    }

    await Message.deleteMany({ chatId }); // Delete all messages in the chat

    // Delete the chat
    await Chat.findByIdAndDelete(chatId);

    res.status(200).json({ success: true, message: "Chat deleted successfully" });
});

const getUserChats = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    // Find all chats where the user is a participant
    const chats = await Chat.find({ participants: userId });

    res.status(200).json({ success: true, chats });
});

export { startChat, getChatMessages , getUserChats, deleteChat };
