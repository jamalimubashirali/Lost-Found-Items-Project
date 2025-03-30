import { asyncHandler } from "../utils/asynchandler.js";
import { Message } from "../models/messages.model.js";

const createMessage = asyncHandler(async (req, res) => {
    const { chatId, senderId, text } = req.body;
    if(!chatId || !senderId || !text) {
        return res.status(400).json({
            message : "Please fill in all fields"
        });
    }
    await Message.create({
        chatId,
        senderId,
        message : text,
    });

    return res.status(201).json({
        message : "Message sent successfully"
    });
});

export { createMessage };
