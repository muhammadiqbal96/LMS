import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { createCourse, getCourseById, getCreatorCourses } from "../controllers/course.controller.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, upload.single("courseThumbnail"), createCourse);
router.route("/get").get(isAuthenticated, getCreatorCourses);
router.route("/getById/:id").get(isAuthenticated, getCourseById);

export default router;