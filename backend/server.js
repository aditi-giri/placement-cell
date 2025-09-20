import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.routes.js';
import studentRoutes from './routes/student.routes.js';
import adminRoutes from './routes/admin.routes.js'
import applicationRoutes from "./routes/application.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import eventRoutes from "./routes/event.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(postRoutes);
app.use(studentRoutes);
app.use(adminRoutes);
app.use(applicationRoutes);
app.use(feedbackRoutes)
app.use(eventRoutes)
app.use(express.static("uploads"))



const start = async() => {

    const connectDB = await mongoose.connect(process.env.DB_URL);

    app.listen(8080,()=> {
        console.log("server is running on port 8080");
    })


}

start();