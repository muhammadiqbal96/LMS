import mongoose from "mongoose";

const purchaseCourseSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default:"Pending"
    },
    paymentId:{
        type: String,
        required: true
    }
}, { timestamps: true });

export const PurchaseCourse = mongoose.model('PurchaseCourse', purchaseCourseSchema);
