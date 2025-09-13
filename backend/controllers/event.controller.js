import Event from "../models/event.model.js";
import Admin from "../models/admin.model.js";
import mongoose from "mongoose";

// ✅ Add a new event (Admin Only)
export const addEvent = async (req, res) => {
  try {
    const { token, title, description } = req.body;

    // Validate input
    if (!token || !title || !description) {
      return res.status(400).json({ message: "Token, title, and description are required" });
    }

    // Verify Admin
    const admin = await Admin.findOne({ token });
    if (!admin) {
      return res.status(403).json({ message: "Unauthorized: Admin access required" });
    }

    // Create new event
    const event = new Event({
      title,
      description,
    });

    await event.save();
    return res.status(201).json({ message: "Event added successfully", event });

  } catch (err) {
    console.error("Error adding event:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get all events (Open to Everyone)
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 }); // Latest first
    return res.status(200).json({ events });
  } catch (err) {
    console.error("Error fetching events:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete an event (Admin Only)

export const deleteEvent = async (req, res) => {
  try {
    const { event_id } = req.params; // Get event ID from URL
    const adminId = req.userId; // Get admin ID from request (session-based or middleware)

    // Ensure an admin is logged in
    if (!adminId) {
      return res.status(403).json({ message: "Unauthorized: Admin access required" });
    }

    // Check if user is an admin
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(403).json({ message: "Unauthorized: Only admins can delete events" });
    }

    // Validate event ID
    if (!mongoose.Types.ObjectId.isValid(event_id)) {
      return res.status(400).json({ message: "Invalid event ID format" });
    }

    // Find event
    const event = await Event.findById(event_id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete event
    await Event.deleteOne({ _id: event_id });

    return res.status(200).json({ message: "Event deleted successfully" });

  } catch (err) {
    console.error("Error deleting event:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};