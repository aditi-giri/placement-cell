import Feedback from "../models/feedback.model.js";
import Student from "../models/student.model.js";

export const submitFeedback = async (req, res) => {
    try {
      const { token, title, feedback } = req.body;
  
      // Verify student
      const student = await Student.findOne({ token: token });
  
      if (!student) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
  
      const newFeedback = new Feedback({
        student: student._id, // Link feedback to student
        title,
        feedback,
        timestamp: new Date(),
      });
  
      await newFeedback.save();
  
      return res.status(201).json({ message: "Feedback submitted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Enter All the Fields" });
    }
  };


  export const getAllFeedbacks = async (req, res) => {
    try {
      const feedbacks = await Feedback.find()
        .populate("student", "name email college_id") // Show student details
        .sort({ timestamp: -1 });
  
      return res.json({ feedbacks });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  

  export const getFeedbackById = async (req, res) => {
    try {
      const { feedback_id } = req.params;
  
      const feedback = await Feedback.findById(feedback_id).populate(
        "student",
        "name email college_id"
      );
  
      if (!feedback) {
        return res.status(404).json({ message: "Feedback not found" });
      }
  
      return res.json(feedback);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  