import Admin from "../models/admin.model.js";
import Student from "../models/student.model.js";
import StudentProfile from "../models/profile.model.js"; // Import StudentProfile
import crypto from "crypto";
import bcrypt from "bcrypt";
import Application from "../models/application.model.js";
import Post from "../models/posts.model.js";

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: "Admin does not exist" });
    }

    // Check if password is hashed
    if (admin.password.length < 60) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(admin.password, salt);
      admin.password = hashedPassword;
      await admin.save();
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = crypto.randomBytes(32).toString("hex");
    admin.token = token;
    await admin.save();

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error during admin login:", error);
    return res.status(500).json({ message: "An internal server error occurred" });
  }
};

// Admin creates a student
export const createStudent = async (req, res) => {
  try {
    const { college_id, password, name, email } = req.body;

    if (!college_id || !password || !name || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if college_id or email already exists
    const existingStudent = await Student.findOne({ $or: [{ college_id }, { email }] });
    if (existingStudent) {
      return res.status(400).json({ message: "College ID or email already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new student
    const newStudent = new Student({
      college_id,
      password: hashedPassword,
      name,
      email,
      active: true,
      profilePicture: "default.jpg",
    });

    await newStudent.save();

    // Create student profile
    const newStudentProfile = new StudentProfile({
      student: newStudent._id,
      bio: "",
      education: [],
      resume: "",
    });

    await newStudentProfile.save();

    return res.status(201).json({
      message: "Student created successfully",
      student: newStudent,
      profile: newStudentProfile,
    });
  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({ message: "An internal server error occurred" });
  }
};

export const getStudentAndProfile = async (req, res) => {
  try {
    const { college_id } = req.query;
    console.log(" Received college_id:", college_id);

    const student = await Student.findOne({ college_id: college_id });
    console.log(" Student Found:", student);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const studentProfile = await StudentProfile.findOne({ student: student._id })
      .populate("student", "name email college_id profilePicture");

    console.log(" Student Profile Found:", studentProfile);

    return res.json(studentProfile);
  } catch (error) {
    console.error(" Error fetching student profile:", error.message);
    return res.status(500).json({ message: error.message });
  }
};



export const getAllStudentProfile = async(req,res) => {
  try {
    const profiles = await StudentProfile.find().populate('student','name email college_id profilePicture');
    return res.json({profiles})
  }catch(error) {
    return res.status(500).json({message:error.message})
  }
}

export const getApplicantsForJob = async (req, res) => {
  try {
    console.log("Request received:", req.body);
    const { post_id } = req.body;

    if (!post_id) {
      return res.status(400).json({ message: "Job post ID is required" });
    }

    // Find the job post
    const jobPost = await Post.findById(post_id);
    if (!jobPost) {
      return res.status(404).json({ message: "Job post not found" });
    }

    // Find applications and populate student and studentProfile
    const applications = await Application.find({ job: post_id })
      .populate({
        path: "student",
        select: "name email college_id profilePicture", // ✅ Populating Student details
      })
      .populate({
        path: "studentProfile", // ✅ Ensure this exists in Application Schema
        select: "-_id resume education bio", // ✅ Fetching Student Profile
      })
      .sort({ appliedOn: -1 });

    return res.json({ job: jobPost.title, applicants: applications });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
