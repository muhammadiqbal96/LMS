import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config({});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export const uploadMediaToCloudinary = async (file) => {
    try {
        const uploadRes = await cloudinary.uploader.upload(file, {
            resource_type: "auto"
        })
        return uploadRes;
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error occurred.",
            success: false,
            error: error.message
        });
    }
}

export const deleteMediaFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error occurred.",
            success: false,
            error: error.message
        });
    }
}

export const deleteVideoFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId,{
            resource_type:"video"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error occurred.",
            success: false,
            error: error.message
        });
    }
}
