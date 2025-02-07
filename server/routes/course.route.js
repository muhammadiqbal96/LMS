import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { createCourse, createLecture, deleteCourseLecture, getCourseById, getCourseLectures, getCreatorCourses, getPublishedCourses, updateCourse, updateCourseLecture } from "../controllers/course.controller.js";

const router = express.Router();

// Course Routes
router.route("/create").post(isAuthenticated, upload.single("courseThumbnail"), createCourse);
router.route("/get").get(isAuthenticated, getCreatorCourses);
router.route("/getById/:id").get(isAuthenticated, getCourseById);
router.route("/update/:id").put(isAuthenticated, upload.single("courseThumbnail"), updateCourse);
router.route("/publishedCourses").get(getPublishedCourses);

// Lecture Routes
router.route("/:id/create_lecture").post(isAuthenticated, upload.single("video"), createLecture);
router.route("/:id/get_lectures").get(isAuthenticated, getCourseLectures);
router.route("/:id/update_lecture").put(isAuthenticated, upload.single("video"), updateCourseLecture);
router.route("/:id/delete_lectures").get(isAuthenticated, deleteCourseLecture);

export default router; 