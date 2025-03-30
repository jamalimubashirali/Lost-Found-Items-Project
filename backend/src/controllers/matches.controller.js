import {Match} from '../models/Matches.model.js';
import mongoose from 'mongoose';
import { asyncHandler } from '../utils/asynchandler.js';
import { Item } from '../models/Items.model.js';

const createMatches = asyncHandler(async (req, res) => {
    const lostItem = await Item.findById(req.params.lostItemId);
    if (!lostItem) return res.status(404).json({ message: "Lost item not found" });

    // Fetch potential matches
    const potentialMatches = await Item.find({
        type: "found",
        category: lostItem.category,
        location: { $regex: lostItem.location, $options: "i" },
        description: { $regex: lostItem.description, $options: "i" },
    });

    // Get existing matches
    const existingMatches = await Match.find({ lostItemId: lostItem._id });
    const matchedFoundIds = existingMatches.map(m => m.foundItemId.toString());

    // Filter new matches
    const newMatches = potentialMatches
        .filter(foundItem => !matchedFoundIds.includes(foundItem._id.toString()))
        .map(foundItem => ({
            lostItemId: lostItem._id,
            foundItemId: foundItem._id,
            status: "pending",
        }));

    if (newMatches.length > 0) {
        await Match.insertMany(newMatches);
    }

    res.status(201).json({ message: `Matches Created for the Item` });
});


const getMatches = asyncHandler(async (req, res) => {
    const {lostItemId} = req.params;

    const matches = await Match.aggregate([
        {
            $match: {
                lostItemId: mongoose.Types.ObjectId(lostItemId),
            },
        },
        {
            $lookup: {
                from: "items",
                localField: "foundItemId",
                foreignField: "_id",
                as: "foundItem",
            },
        },
        {
            $unwind: "$foundItem",
        },
        {
            $project: {
                _id: "$foundItem._id",
                itemName: "$foundItem.itemName",
                description: "$foundItem.description",
                category: "$foundItem.category",
                location: "$foundItem.location",
                images : "$foundItem.images",
                status: "$status",
            },
        },
    ]);

    if(matches.length === 0) {
        return res.status(404).json({
            message : "No matches found"
        });
    }

    res.status(200).json({
        matches
    });
});

const updateMatchStatus = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {status} = req.body;

    if(!status) {
        return res.status(400).json({
            message : "Please provide status"
        });
    }

    const updatedMatch = await Match.findByIdAndUpdate(id , {
        status
    } , {
        new : true
    });

    if(!updatedMatch) {
        return res.status(404).json({
            message : "Match not found"
        });
    }
    
    res.status(200).json({
        updatedMatch
    });
});

export { createMatches, getMatches, updateMatchStatus };



// import asyncHandler from "express-async-handler";
// import mongoose from "mongoose";
// import { Match } from "../models/matchModel.js";
// import { Item } from "../models/itemModel.js";

// // 🟢 Find potential matches for a lost item
// const findMatches = asyncHandler(async (req, res) => {
//     const { lostItemId } = req.body;

//     // Retrieve lost item details
//     const lostItem = await Item.findById(lostItemId);
//     if (!lostItem) {
//         return res.status(404).json({ success: false, message: "Lost item not found" });
//     }

//     // Find matching found items using category, location, and similar descriptions
//     const foundItems = await Item.aggregate([
//         {
//             $match: {
//                 type: "found", // Only match with found items
//                 category: lostItem.category,
//                 location: lostItem.location,
//                 _id: { $ne: lostItem._id } // Avoid self-matching
//             }
//         },
//         {
//             $project: {
//                 _id: 1,
//                 title: 1,
//                 description: 1,
//                 category: 1,
//                 location: 1,
//                 date: 1,
//                 similarityScore: {
//                     $cond: {
//                         if: { $eq: ["$description", lostItem.description] },
//                         then: 1,
//                         else: 0
//                     }
//                 }
//             }
//         },
//         { $sort: { similarityScore: -1, date: 1 } } // Prioritize high similarity and recent items
//     ]);

//     // Store matches in the `matches` collection
//     let matches = [];
//     for (const foundItem of foundItems) {
//         const match = new Match({
//             lostItemId,
//             foundItemId: foundItem._id,
//             status: "pending"
//         });
//         await match.save();
//         matches.push(match);
//     }

//     res.status(200).json({ success: true, matches });
// });

// // 🟢 Retrieve matches for a specific user
// const getUserMatches = asyncHandler(async (req, res) => {
//     const userId = req.user._id;

//     // Aggregation pipeline to fetch matches with item details
//     const matches = await Match.aggregate([
//         {
//             $lookup: {
//                 from: "items",
//                 localField: "lostItemId",
//                 foreignField: "_id",
//                 as: "lostItem"
//             }
//         },
//         {
//             $lookup: {
//                 from: "items",
//                 localField: "foundItemId",
//                 foreignField: "_id",
//                 as: "foundItem"
//             }
//         },
//         {
//             $unwind: "$lostItem"
//         },
//         {
//             $unwind: "$foundItem"
//         },
//         {
//             $match: {
//                 $or: [
//                     { "lostItem.userId": mongoose.Types.ObjectId(userId) },
//                     { "foundItem.userId": mongoose.Types.ObjectId(userId) }
//                 ]
//             }
//         },
//         {
//             $project: {
//                 _id: 1,
//                 status: 1,
//                 matchedOn: 1,
//                 lostItem: {
//                     _id: "$lostItem._id",
//                     title: "$lostItem.title",
//                     category: "$lostItem.category",
//                     location: "$lostItem.location"
//                 },
//                 foundItem: {
//                     _id: "$foundItem._id",
//                     title: "$foundItem.title",
//                     category: "$foundItem.category",
//                     location: "$foundItem.location"
//                 }
//             }
//         },
//         { $sort: { matchedOn: -1 } }
//     ]);

//     res.status(200).json({ success: true, matches });
// });

// export { findMatches, getUserMatches };

