import { createSlice } from "@reduxjs/toolkit";
import { submitFeedback, getAllFeedbacks } from "@/config/redux/action/feedbackAction";

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    feedbacks: [],
    loading: false,
    error: null,
    submissionSuccess: false,
  },
  reducers: {
    // Optional: A reducer to reset submission state
    resetSubmission(state) {
      state.submissionSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // submitFeedback cases
    builder
      .addCase(submitFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.submissionSuccess = true;
        // Optionally, add the new feedback to the list:
        state.feedbacks.unshift(action.payload);
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Feedback submission failed";
      });
    // getAllFeedbacks cases
    builder
      .addCase(getAllFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(getAllFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch feedbacks";
      });
  },
});

export const { resetSubmission } = feedbackSlice.actions;
export default feedbackSlice.reducer;
