import mongoose from "mongoose";
import Student from "../models/student.model.js";
import dotenv from 'dotenv';

// MongoDB connection string
const mongoURI = dotenv.DB_URL;

// Seeding function
const seedStudentRecords = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("Database connected");

        const records = [
            { college_id: "STU001", name: "Aarav Sharma", password: "Aarav@123", email: "aarav.sharma@example.com" },
            { college_id: "STU002", name: "Anaya Gupta", password: "Anaya@123", email: "anaya.gupta@example.com" },
            { college_id: "STU003", name: "Vivaan Singh", password: "Vivaan@123", email: "vivaan.singh@example.com" },
            { college_id: "STU004", name: "Isha Roy", password: "Isha@123", email: "isha.roy@example.com" },
            { college_id: "STU005", name: "Arjun Verma", password: "Arjun@123", email: "arjun.verma@example.com" },
            { college_id: "STU006", name: "Kavya Jain", password: "Kavya@123", email: "kavya.jain@example.com" },
            { college_id: "STU007", name: "Rohan Patel", password: "Rohan@123", email: "rohan.patel@example.com" },
            { college_id: "STU008", name: "Myra Joshi", password: "Myra@123", email: "myra.joshi@example.com" },
            { college_id: "STU009", name: "Krishna Mehta", password: "Krishna@123", email: "krishna.mehta@example.com" },
            { college_id: "STU010", name: "Diya Bansal", password: "Diya@123", email: "diya.bansal@example.com" },
            { college_id: "STU011", name: "Kabir Nair", password: "Kabir@123", email: "kabir.nair@example.com" },
            { college_id: "STU012", name: "Aditi Kulkarni", password: "Aditi@123", email: "aditi.kulkarni@example.com" },
            { college_id: "STU013", name: "Aryan Deshmukh", password: "Aryan@123", email: "aryan.deshmukh@example.com" },
            { college_id: "STU014", name: "Saanvi Iyer", password: "Saanvi@123", email: "saanvi.iyer@example.com" },
            { college_id: "STU015", name: "Yash Reddy", password: "Yash@123", email: "yash.reddy@example.com" },
            { college_id: "STU016", name: "Anvi Rao", password: "Anvi@123", email: "anvi.rao@example.com" },
            { college_id: "STU017", name: "Reyansh Choudhary", password: "Reyansh@123", email: "reyansh.choudhary@example.com" },
            { college_id: "STU018", name: "Tara Srinivasan", password: "Tara@123", email: "tara.srinivasan@example.com" },
            { college_id: "STU019", name: "Devansh Malhotra", password: "Devansh@123", email: "devansh.malhotra@example.com" },
            { college_id: "STU020", name: "Riya Menon", password: "Riya@123", email: "riya.menon@example.com" },
            { college_id: "STU021", name: "Omkar Pillai", password: "Omkar@123", email: "omkar.pillai@example.com" },
            { college_id: "STU022", name: "Meera Shukla", password: "Meera@123", email: "meera.shukla@example.com" },
            { college_id: "STU023", name: "Laksh Mishra", password: "Laksh@123", email: "laksh.mishra@example.com" },
            { college_id: "STU024", name: "Shruti Bhatt", password: "Shruti@123", email: "shruti.bhatt@example.com" },
            { college_id: "STU025", name: "Advait Ghosh", password: "Advait@123", email: "advait.ghosh@example.com" },
            { college_id: "STU026", name: "Pooja Banerjee", password: "Pooja@123", email: "pooja.banerjee@example.com" },
            { college_id: "STU027", name: "Harsh Yadav", password: "Harsh@123", email: "harsh.yadav@example.com" },
            { college_id: "STU028", name: "Nisha Kapoor", password: "Nisha@123", email: "nisha.kapoor@example.com" },
            { college_id: "STU029", name: "Rudra Saxena", password: "Rudra@123", email: "rudra.saxena@example.com" },
            { college_id: "STU030", name: "Sneha Agarwal", password: "Sneha@123", email: "sneha.agarwal@example.com" },
            { college_id: "STU031", name: "Ishaan Tripathi", password: "Ishaan@123", email: "ishaan.tripathi@example.com" },
            { college_id: "STU032", name: "Prachi Tiwari", password: "Prachi@123", email: "prachi.tiwari@example.com" },
            { college_id: "STU033", name: "Aarush Pandey", password: "Aarush@123", email: "aarush.pandey@example.com" },
            { college_id: "STU034", name: "Neha Chatterjee", password: "Neha@123", email: "neha.chatterjee@example.com" },
            { college_id: "STU035", name: "Shaurya Das", password: "Shaurya@123", email: "shaurya.das@example.com" },
            { college_id: "STU036", name: "Anika Bose", password: "Anika@123", email: "anika.bose@example.com" },
            { college_id: "STU037", name: "Dhruv Sengupta", password: "Dhruv@123", email: "dhruv.sengupta@example.com" },
            { college_id: "STU038", name: "Payal Dutta", password: "Payal@123", email: "payal.dutta@example.com" },
            { college_id: "STU039", name: "Kunal Chakraborty", password: "Kunal@123", email: "kunal.chakraborty@example.com" },
            { college_id: "STU040", name: "Simran Ahuja", password: "Simran@123", email: "simran.ahuja@example.com" },
            { college_id: "STU041", name: "Vihan Lala", password: "Vihan@123", email: "vihan.lala@example.com" },
            { college_id: "STU042", name: "Sakshi Joshi", password: "Sakshi@123", email: "sakshi.joshi@example.com" },
            { college_id: "STU043", name: "Ishan Sehgal", password: "Ishan@123", email: "ishan.sehgal@example.com" },
            { college_id: "STU044", name: "Vidya Rajan", password: "Vidya@123", email: "vidya.rajan@example.com" },
            { college_id: "STU045", name: "Ayush Grover", password: "Ayush@123", email: "ayush.grover@example.com" },
            { college_id: "STU046", name: "Mahika Rathi", password: "Mahika@123", email: "mahika.rathi@example.com" },
            { college_id: "STU047", name: "Pranav Chopra", password: "Pranav@123", email: "pranav.chopra@example.com" },
            { college_id: "STU048", name: "Charvi Arora", password: "Charvi@123", email: "charvi.arora@example.com" },
            { college_id: "STU049", name: "Ayan Khanna", password: "Ayan@123", email: "ayan.khanna@example.com" },
            { college_id: "STU050", name: "Sanya Sethi", password: "Sanya@123", email: "sanya.sethi@example.com" },
          ];
          
        await Student.insertMany(records);
        console.log("Student records seeded successfully");

        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding student records:", error.message);
        mongoose.connection.close();
    }
};

seedStudentRecords();
