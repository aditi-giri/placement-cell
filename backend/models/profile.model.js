import mongoose from "mongoose";

// Define enums for degree and specialization
const DegreeEnum = [
  "TY BCOM 2025",
  "TY BCOM - ACCA 2025",
  "TY BCOM - CMA-USA 2025",
  "TY BCOM Fintech 2025",
  "TY BCOM Honours 2025",
  "TY BBA 2025",
  "TY BBA IB 2025",
  "TY BMS 2025",
  "TY BCA 2025",
];

const SpecializationEnum = [
  "Computer Application",
  "International Business (IB)",
  "BBA - Finance",
  "BBA - Marketing",
  "BBA - HR",
  "BBA - Services",
  "Cost & Works Accounting",
  "Business Administration",
  "Business Entrepreneurship",
  "Business Statistics",
  "Marketing Management",
  "Banking & Finance",
  "Strategic Finance (CMA-USA)",
  "Tax Procedure & Practice",
  "International Finance (ACCA)",
  "Fintech",
  "Honours",
  "eCommerce",
  "MCOM - Advance Accounting",
  "MCOM - Advance Cost Accounting",
  "MCOM - Business Administration",
  "Other",
];

// Education Schema
const EducationSchema = new mongoose.Schema({
  degree: {
    type: String,
    enum: DegreeEnum, // Restrict to predefined degrees
    required: true,
  },
  specialization: {
    type: String,
    enum: SpecializationEnum, // Restrict to predefined specializations
    required: true,
  },
  percent_10th: {
    type: String,
    default: "",
  },
  percent_12th: {
    type: String,
    default: "",
  },
  cgpa_grad: {
    type: String,
    default: "",
  },
  cgpa_pg: {
    type: String,
    default: "",
  },
});

// Student Profile Schema
const StudentProfileSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  education: {
    type: [EducationSchema],
    default: [],
  },
  resume: {
    type: String,
    default: "",
  },
});

const StudentProfile = mongoose.model("StudentProfile", StudentProfileSchema);
export default StudentProfile;