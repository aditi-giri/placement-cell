import Student from "../models/student.model.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import StudentProfile from "../models/profile.model.js"
import PDFDocument from 'pdfkit';
import fs from 'fs';
import Application from "../models/application.model.js";

//functions
const convertStudentDataTOPDF = async (studentData) => {
  const doc = new PDFDocument();

  const outputPath = crypto.randomBytes(32).toString("hex")+".pdf";
  const stream = fs.createWriteStream("uploads/" + outputPath);

  doc.pipe(stream);

  doc.image(`uploads/${studentData.student.profilePicture}`,{align:"center",width:100});
  doc.fontSize(16).text(`Name: ${studentData.student.name}`);
  doc.fontSize(14).text(`College_id: ${studentData.student.college_id}`);
  doc.fontSize(14).text(`Email: ${studentData.student.email}`);
  doc.fontSize(14).text(`Contact: ${studentData.student.contact_number}`);
  doc.fontSize(14).text(`Location: ${studentData.student.location}`);

  doc.fontSize(14).text("Education")
  studentData.education.forEach((ed,index)=>{
    doc.fontSize(14).text(`Institution: ${ed.institution}`);
        doc.fontSize(14).text(`Degree: ${ed.degree}`);
        doc.fontSize(14).text(`Field of Study: ${ed.fieldOfStudy}`);
  })

  doc.end();
  return outputPath;
}


export const login = async (req, res) => {
  try {
    const { college_id, password } = req.body;

    // Validate input fields
    if (!college_id || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the student by college ID
    let student = await Student.findOne({ college_id });
    if (!student) {
      return res.status(404).json({ message: "Student does not exist" });
    }

    // Ensure the password is hashed
    if (student.password.length < 60) {
      const salt = await bcrypt.genSalt(10);
      student.password = await bcrypt.hash(student.password, salt);
      await student.save();
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate and save token
    const token = crypto.randomBytes(32).toString("hex");
    student.token = token;
    await student.save();

    // Check if profile exists, create if not
    let profile = await StudentProfile.findOne({ student: student._id });
    if (!profile) {
      
      return res.status(500).json({message:"profile not found"});
    }

    return res.status(200).json({ token, profile, student });

  } catch (error) {
    console.error("Error during student login:", error);
    return res.status(500).json({ message: "An internal server error occurred" });
  }
};


export const getMyProfile = async (req, res) => {
  try {
    const { token } = req.query; // Get token from request body

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Find the student using the token
    const student = await Student.findOne({ token });

    if (!student) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Find the student's profile and ensure it belongs to the logged-in student
    const studentProfile = await StudentProfile.findOne({ student: student._id })
      .populate("student", "name email college_id profilePicture");

    if (!studentProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Ensure the logged-in student is only accessing their own profile
    if (String(studentProfile.student._id) !== String(student._id)) {
      return res.status(403).json({ message: "Forbidden: You cannot access this profile" });
    }

    return res.status(200).json({
      token,
      student: student,            // full student details (or part of it)
      profile: studentProfile,     // full profile
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export const uploadProfilePicture = async (req,res)=> {
    const { token} = req.body;

    try {

        const student = await Student.findOne({token:token});

        if(!student) {
            return res.status(404).json({message: "Student not found"})
        }

        student.profilePicture = req.file.filename;

        await student.save();

        return res.json({message: "Profile Picture Updated"})

    }catch(error) {
        return res.status(500).json({message:error.message});
    }
}

//make sure the basic info added by admin is not changed by student
// export const updateStudentProfile = async (req, res) => {
//   try {
//     const { token, ...newStudentData } = req.body;

//     const student = await Student.findOne({ token });
//     if (!student) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const { college_id, email } = newStudentData;

//     const existingStudent = await Student.findOne({
//       $or: [{ college_id }, { email }],
//     });

//     if (existingStudent && String(existingStudent._id) !== String(student._id)) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     Object.assign(student, newStudentData);
//     await student.save();

//     return res.json({ message: "Student updated" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };


export const updateProfileData = async (req, res) => {
  try {
    const { token, ...newProfileData } = req.body;

    const studentProfile = await Student.findOne({ token });
    if (!studentProfile) {
      return res.status(404).json({ message: "Student not found" });
    }

    let profileToUpdate = await StudentProfile.findOne({ student: studentProfile._id });

    if (!profileToUpdate) {
      return res.status(404).json({ message: "Profile not found" });
    }

    Object.assign(profileToUpdate, newProfileData);
    await profileToUpdate.save();

    return res.json({ message: "Profile updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// export const downloadProfile = async(req, res)=> {
//   try {
//     const student_id = req.query.id;
//     const studentProfile = await StudentProfile.findOne({student:student_id})
//        .populate('student', 'name college_id email profilePicture');

//     let outputPath = await convertStudentDataTOPDF(studentProfile);
//     return res.json({"message": outputPath})

//   }catch(error) {
//     return res.status(500).json({message:error.message})
//   }
// }

export const getMyApplications = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Find the student using the token
    const student = await Student.findOne({ token });

    if (!student) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Find all job applications of the logged-in student
    const applications = await Application.find({ student: student._id })
      .populate("job", "_id")
      .sort({ appliedOn: -1 }); // Sort by most recent applications

    return res.json({ applications });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};