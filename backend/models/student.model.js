// This will represent the students registering on the website.
import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    college_id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    active:{
        type: Boolean,
        default: true,
    },
    profilePicture: {
        type:String,
        default: "default.jpg"
    },
    token: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const Student = mongoose.model('Student',StudentSchema);

export default Student;