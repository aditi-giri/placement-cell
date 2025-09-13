// This will represent an admin account who can manage job posts.
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: ''
    }
}, { timestamps: true });

  
const Admin = mongoose.model('Admin', AdminSchema);
  
export default Admin;