import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { login, logout, register, updatePassword, updateProfile } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated, logout);
router.route("/update").put(isAuthenticated, upload.single("file"), updateProfile);
router.route("/update/password").put(isAuthenticated, updatePassword);

export default router;