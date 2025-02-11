import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { CreateCheckOutSession, stripeWebhook } from "../controllers/purchaseCourse.controller.js";

const router = express.Router();

router.route("/checkout/create-checkout-session").post(isAuthenticated, CreateCheckOutSession);
router.route("/weebhook").post(express.raw({ type: "application/json" }), stripeWebhook);

// router.route("/course/:courseId/detail-with-status").get();
// router.route("/").get();

export default router;