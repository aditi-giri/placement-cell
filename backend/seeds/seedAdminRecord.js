import mongoose from "mongoose";
import Admin from "../models/admin.model.js";
import dotenv from 'dotenv';

dotenv.config();
// MongoDB connection string
const mongoURI = process.env.DB_URL;

// Seeding function
const seedAdminRecords = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("Database connected");

        const records = [
            {username: "admin2", password: "admin2"}
        ];
          
        await Admin.insertMany(records);
        console.log("Admin records seeded successfully");

        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding admin records:", error.message);
        mongoose.connection.close();
    }
};

seedAdminRecords();
