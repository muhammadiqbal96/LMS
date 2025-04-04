import Stripe from "stripe";
import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { PurchaseCourse } from "../models/purchaseCourse.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const CreateCheckOutSession = async (req, res) => {
    try {
        const userId = req.id;
        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({
                message: "Course not found.",
                success: false
            });
        }

        const existingPurchase = await PurchaseCourse.findOne({ courseId, userId });
        if (existingPurchase) {
            if (existingPurchase.status === "Completed") {
                return res.status(200).json({
                    success: true,
                    message: "You have already purchased this course.",
                });
            } else if (existingPurchase.status === "Pending" || existingPurchase.status === "Failed") {
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    line_items: [
                        {
                            price_data: {
                                currency: "usd",
                                product_data: {
                                    name: course.courseTitle,
                                    images: [course.courseThumbnail],
                                },
                                unit_amount: course.coursePrice * 100,
                            },
                            quantity: 1,
                        },
                    ],
                    mode: "payment",
                    success_url: `http://localhost:5173/course/progress/${courseId}`, // FRONT_END_URL
                    cancel_url: `http://localhost:5173/course/detail/${courseId}`, // FRONT_END_URL
                    metadata: {
                        courseId: courseId,
                        userId: userId,
                    },
                    shipping_address_collection: {
                        allowed_countries: ["US"],
                    },
                });

                if (!session.url) {
                    return res.status(400).json({
                        message: "Error while creating session",
                        success: false
                    });
                }

                existingPurchase.paymentId = session.id;
                await existingPurchase.save();
                return res.status(200).json({
                    success: true,
                    url: session.url,
                });
            }
        }

        const newPurchase = new PurchaseCourse({
            courseId,
            userId,
            amount: course.coursePrice,
            status: "Pending"
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: course.courseTitle,
                            images: [course.courseThumbnail],
                        },
                        unit_amount: course.coursePrice * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `http://localhost:5173/course/progress/${courseId}`, // FRONT_END_URL
            cancel_url: `http://localhost:5173/course/detail/${courseId}`, // FRONT_END_URL
            metadata: {
                courseId: courseId,
                userId: userId,
            },
            shipping_address_collection: {
                allowed_countries: ["US"],
            },
        });

        if (!session.url) {
            return res.status(400).json({
                message: "Error while creating session",
                success: false
            });
        }

        newPurchase.paymentId = session.id;
        await newPurchase.save();

        return res.status(200).json({
            success: true,
            url: session.url,
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


export const stripeWebhook = async (req, res) => {
    let event;

    try {
        const payloadString = JSON.stringify(req.body, null, 2);
        const secret = process.env.WEBHOOK_ENDPOINT_SECRET;

        const header = stripe.webhooks.generateTestHeaderString({
            payload: payloadString,
            secret,
        });

        event = stripe.webhooks.constructEvent(payloadString, header, secret);
    } catch (error) {
        console.error("Webhook error:", error.message);
        return res.status(400).send(`Webhook error: ${error.message}`);
    }

    if (event.type === "checkout.session.completed") {
        console.log("check session complete is called");

        try {
            const session = event.data.object;

            const purchase = await PurchaseCourse.findOne({
                paymentId: session.id,
            }).populate({ path: "courseId" });

            if (!purchase) {
                return res.status(404).json({ message: "Purchase not found" });
            }

            if (session.amount_total) {
                purchase.amount = session.amount_total / 100;
            }
            purchase.status = "Completed";

            await purchase.save();

            await User.findByIdAndUpdate(
                purchase.userId,
                { $addToSet: { enrolledCourses: purchase.courseId._id } },
                { new: true }
            );

            await Course.findByIdAndUpdate(
                purchase.courseId._id,
                { $addToSet: { enrolledStudents: purchase.userId } },
                { new: true }
            );
        } catch (error) {
            console.error("Error handling event:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    res.status(200).send();
};


export const getCourseDetailWithPurchasedStatus = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.id;
        const course = await Course.findById(courseId)
            .populate({
                path: "lectures"
            })
            .populate({
                path: "creator",
                select: "name"
            }).lean();

        const purchased = await PurchaseCourse.findOne({ courseId, userId });

        if (!course) {
            return res.status(400).json({
                course: [],
                message: "Course not found.",
                success: false
            })
        }
        if (!purchased) {
            course.lectures = course.lectures.map(lecture => ({
                lectureTitle: lecture.lectureTitle,
                videoUrl: lecture.isPreviewFree === true ? lecture.videoUrl : null
            }));
        }
        return res.status(200).json({
            course,
            purchased: purchased.status == "Completed" ? true : false,
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

export const getAllPurchasedCourse = async (req, res) => {
    try {
        const purchasedCourses = await PurchaseCourse.find({ status: "Completed" }).populate({
            path: "courseId",
            populate: {
                path: "creator",
                select: "name"
            },
        });

        if (!purchasedCourses) {
            return res.status(400).json({
                purchasedCourse: [],
                message: "Course not purchased yet.",
                success: false
            })
        }

        return res.status(200).json({
            purchasedCourses,
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