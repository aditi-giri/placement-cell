import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

// Create an index to speed up queries by student ID
FeedbackSchema.index({ student: 1 });

const Feedback = mongoose.model("Feedback", FeedbackSchema);
export default Feedback;
