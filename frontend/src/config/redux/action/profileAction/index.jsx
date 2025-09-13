import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "@/config";

// Fetch profile by token (assumes token is passed as query string)
export const getMyProfile = createAsyncThunk(
  "profile/getMyProfile",
  async (token, thunkAPI) => {
    try {
      const response = await clientServer.get(`/get_my_profile?token=${token}`);
      return response.data; // Expect full profile object
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Failed to fetch profile" }
      );
    }
  }
);

// Update profile data
export const updateProfileData = createAsyncThunk(
    "profile/updateProfileData",
    async (newProfileData, thunkAPI) => {
      try {
        const response = await clientServer.post("/update_profile_data", newProfileData);
        return response.data; // Expect updated profile in response
      } catch (err) {
        return thunkAPI.rejectWithValue(
          err.response?.data || { message: "Failed to update profile" }
        );
      }
    }
  );
