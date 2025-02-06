import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { createCourse, createLecture, getCourseById, getCourseLectures, getCreatorCourses, updateCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, upload.single("courseThumbnail"), createCourse);
router.route("/get").get(isAuthenticated, getCreatorCourses);
router.route("/getById/:id").get(isAuthenticated, getCourseById);
router.route("/update/:id").put(isAuthenticated, upload.single("courseThumbnail"), updateCourse);
router.route("/:id/create_lecture").post(isAuthenticated, upload.single("video"), createLecture);
router.route("/:id/get_lectures").get(isAuthenticated,getCourseLectures);

export default router; 