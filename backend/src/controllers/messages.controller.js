import { asyncHandler } from "../utils/asynchandler.js";
import { Message } from "../models/messages.model.js";

const createMessage = asyncHandler(async (req, res) => {
    const { chatId, text } = req.body;
    if(!chatId || !text) {
        return res.status(400).json({
            message : "Please fill in all fields"
        });
    }
    await Message.create({
        chatId,
        senderId : req.user._id,
        message : text,
    });

    return res.status(201).json({
        message : "Message sent successfully"
    });
});

const deleteMessage = asyncHandler(async (req, res) => {
    const { messageId } = req.params;
    if(!messageId) {
        return res.status(400).json({
            message : "Please fill in all fields"
        });
    }
    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if(!deletedMessage) {
        return res.status(404).json({
            message : "Message not found"
        });
    }

    return res.status(200).json({
        message : "Message deleted successfully"
    });
});


export { createMessage , deleteMessage };
