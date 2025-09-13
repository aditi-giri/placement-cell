import Admin from "../models/admin.model.js"
import Post from "../models/posts.model.js"
import mongoose from "mongoose"

export const activeCheck = async (req,res) => {
    return res.status(200).json({message:"RUNNING"})
}

export const createPost = async (req, res) => {
    try {
      const { token, company_name, company_website_url, job_title, job_description, requirements, location, salary_package, skills_required, deadline } = req.body;
  
      // Validate required fields
      if (!company_name || !company_website_url || !job_title || !job_description || !requirements || !location || !deadline) {
        return res.status(400).json({ message: "All required fields must be filled" });
      }
  
      // Find admin by token
      const admin = await Admin.findOne({ token });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      // Validate deadline
      const deadlineDate = new Date(deadline);
      if (isNaN(deadlineDate.getTime()) || deadlineDate <= Date.now()) {
        return res.status(400).json({ message: "Deadline must be a valid future date" });
      }
  
      // Create new job post
      const post = new Post({
        adminId: admin._id,
        company_name,
        company_website_url,
        job: {
          job_title,
          job_description,
          requirements,
          location,
          salary_package: salary_package || "",
          skills_required: skills_required || [],
        },
        deadline: deadlineDate,
      });
  
      await post.save();
  
      return res.status(201).json({ message: "Job post created successfully", post });
    } catch (err) {
      console.error("Error creating job post:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  export const getPost = async (req, res) => {
    try {
      const {post_id} = req.body;
      const post = await Post.find({_id:post_id}); // Excluding applicants and adminId
  
      return res.status(200).json({ post });
    } catch (err) {
      console.error("Error fetching job post:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  export const getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find({}); // Excluding applicants and adminId
  
      return res.status(200).json({ posts });
    } catch (err) {
      console.error("Error fetching job posts:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  


  export const deletePost = async (req, res) => {
    try {
      const { token, post_id } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(post_id)) {
        return res.status(400).json({ message: "Invalid post ID format" });
      }
  
      // Find the admin using the provided token
      const admin = await Admin.findOne({ token }).select("_id");
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
  
      // Find the post by ID
      const post = await Post.findById(post_id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Check if the logged-in admin is the one who created the post
      if (post.adminId.toString() !== admin._id.toString()) {
        return res.status(403).json({ message: "Unauthorized: You can only delete your own posts" });
      }
  
      // Delete the post
      await Post.deleteOne({ _id: post_id });
  
      return res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
      console.error("Error deleting post:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  