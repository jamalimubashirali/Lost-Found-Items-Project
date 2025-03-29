import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload Helper: Local File
export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.error("Local file path is not provided.");
            return null;
        }

        // Upload file to Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto", // Automatically detect file type
        });

        // Cleanup: Remove the local file after upload
        await fs.unlink(localFilePath);

        return response;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        // Attempt to delete the local file if upload fails
        try {
            await fs.unlink(localFilePath);
        } catch (unlinkError) {
            console.error("Error deleting local file:", unlinkError);
        }

        return null;
    }
};

