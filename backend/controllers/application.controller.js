import Application from "../models/application.model.js";
import Student from "../models/student.model.js";
import Post from "../models/posts.model.js";

export const applyForJob = async (req, res) => {
  try {
    const { token, jobId } = req.body;

    // Find student by token
    const student = await Student.findOne({ token });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if the job post exists
    const job = await Post.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job post not found" });
    }

    // Check if student has already applied
    const existingApplication = await Application.findOne({
      student: student._id,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    // Create a new job application
    const application = new Application({
      student: student._id,
      job: jobId,
    });

    await application.save();

    return res.status(201).json({ message: "Job application submitted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
