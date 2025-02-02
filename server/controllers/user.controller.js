import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { deleteMediaFromCloudinary, uploadMediaToCloudinary } from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing. Please fill all fields.",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
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


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing. Please fill all fields.",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            });
        }

        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY is not defined in the environment variables.");
        }

        const tokenData = { user: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            enrolledCourses: user.enrolledCourses,
            profile: user.profile
        };

        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict"
        }).json({
            message: `Welcome back ${user.name}.`,
            user: userResponse,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error occurred.",
            success: false,
            error: error.message
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error occurred.",
            success: false,
            error: error.message
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { name, email, phoneNumber, skills } = req.body;
        const file = req.file;

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id;

        let user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (skills) user.profile.skills = skillsArray
        if (phoneNumber) user.profile.phoneNumber = phoneNumber;
        if (file) {
            if (user.profile.profilePhoto) {
                const userPic = user.profile.profilePhoto;
                const publicId = userPic.split("/").pop().split(".")[0];
                deleteMediaFromCloudinary(publicId);
            }
            const cloudRes = await uploadMediaToCloudinary(file.path);
            user.profile.profilePhoto = cloudRes.secure_url;
        }

        await user.save();
        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error occurred.",
            success: false,
            error: error.message
        });
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { currentpassword, newpassword } = req.body;
        const userId = req.id;
        if (!currentpassword || !newpassword) {
            return res.status(400).json({
                message: "Something is missing. Please fill all fields.",
                success: false
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        const isPasswordMatched = await bcrypt.compare(currentpassword, user.password);
        if (!isPasswordMatched) {
            return res.status(400).json({
                message: "Incorrect current password.",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(newpassword, 10);
        user.password = hashedPassword
        await user.save();

        return res.status(200).json({
            message: "Password updated successfully.",
            success: true
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An unexpected error occurred.",
            success: false,
            error: error.message
        });
    }
};