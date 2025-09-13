import { createSlice } from "@reduxjs/toolkit";
import { getMyProfile, updateProfileData } from "@/config/redux/action/profileAction";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    error: null,
    updateSuccess: false,
  },
  reducers: {
    resetUpdateSuccess(state) {
      state.updateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // getMyProfile
    builder.addCase(getMyProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(getMyProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to fetch profile";
    });
    // updateProfileData
    builder.addCase(updateProfileData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProfileData.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload.profile;
      state.updateSuccess = true;
    });
    builder.addCase(updateProfileData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to update profile";
    });
  },
});

export const { resetUpdateSuccess } = profileSlice.actions;
export default profileSlice.reducer;
