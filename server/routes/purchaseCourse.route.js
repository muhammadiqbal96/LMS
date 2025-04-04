import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { CreateCheckOutSession, getAllPurchasedCourse, getCourseDetailWithPurchasedStatus, stripeWebhook } from "../controllers/purchaseCourse.controller.js";

const router = express.Router();

router.route("/checkout/create-checkout-session").post(isAuthenticated, CreateCheckOutSession);
router.route("/webhook").post(express.raw({ type: "application/json" }), stripeWebhook);

router.route("/course/:courseId/detail-with-status").get(isAuthenticated, getCourseDetailWithPurchasedStatus);
router.route("/").get(isAuthenticated, getAllPurchasedCourse);

export default router;