import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "@/config";

// Action: Submit feedback (for students)
export const submitFeedback = createAsyncThunk(
  "feedback/submitFeedback",
  async ({ title, feedback }, thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken");
      const payload = { token, title, feedback };
      const response = await clientServer.post("/submit_feedback", payload);
      if (response.status === 201) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue({
          message: "Feedback submission failed",
        });
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Feedback submission failed" }
      );
    }
  }
);

// Action: Get all feedbacks (for admin)
export const getAllFeedbacks = createAsyncThunk(
  "feedback/getAllFeedbacks",
  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get("/admin/get_feedbacks");
      return response.data.feedbacks;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Failed to fetch feedbacks" }
      );
    }
  }
);
