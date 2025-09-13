import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    studentProfile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentProfile", // ✅ Reference to StudentProfile model
      },
    appliedOn: {
        type: Date,
        default: Date.now,
    },
},{ timestamps: true });

// Add a compound unique index to prevent duplicate applications
applicationSchema.index({ student: 1, job: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);

export default Application;