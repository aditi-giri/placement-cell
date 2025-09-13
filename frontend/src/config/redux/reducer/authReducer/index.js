// src/config/redux/slice/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { 
  getAllStudents, 
  getApplicantsForJob, 
  getApplicationRequests, 
  getMyProfile, 
  getStudentProfile, 
  loginAdmin, 
  loginUser, 
  updateProfileData,
  getAllEvents, // ✅ Event Actions
  createEvent 
} from "../../action/authAction"; 

const initialState = {
  user: {},
  profile: {}, 
  studentProfile: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  loggedIn: false,
  isAdmin: false,
  message: "",
  isTokenThere: false,
  profileFetched: false,
  applications: [],
  applicationRequest: [],
  applicants: [],
  applicantsFetched: false,
  all_students: [],
  all_profiles_fetched: false,
  all_profiles: [],
  logoutInitiated: false,

  // ✅ Event-related state
  events: [],


};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    emptyMessage: (state) => {
      state.message = "";
    },
    setTokenIsThere: (state) => {
      state.isTokenThere = true;
    },
    setTokenIsNotThere: (state) => {
      state.isTokenThere = false;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.isAdmin = false;
      state.token = null;
      state.user = [];
      state.profile = null;
      state.studentProfile = {}; 
      state.isTokenThere = false;
      state.logoutInitiated = true;
    },
    clearLogoutFlag: (state) => {
      state.logoutInitiated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Letting you in...";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loggedIn = true;
        state.isAdmin = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
        state.isTokenThere = true;
        state.logoutInitiated = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "An error occurred.";
        state.isTokenThere = false;
        state.loggedIn = false;
      })
      
      // ✅ Login Admin
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true;
        state.message = "Logging in as Admin...";
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loggedIn = true;
        state.isAdmin = true;
        state.token = action.payload.token;
        state.user = action.payload.admin;
        state.isTokenThere = true;
        state.logoutInitiated = false;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Admin login failed.";
        state.isTokenThere = false;
        state.loggedIn = false;
      })

      // ✅ Get My Profile
      .addCase(getMyProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileFetched = true;
        state.profile = action.payload;
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message || "Failed to fetch profile.";
      })

      // ✅ Get Student Profile
      .addCase(getStudentProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentProfile = action.payload;
      })
      .addCase(getStudentProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Failed to fetch student profile.";
      })

      // ✅ Update Profile
      .addCase(updateProfileData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload.profile;
        state.message = "Profile updated successfully";
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message || "Failed to update profile.";
      })

      // ✅ Get All Students
      .addCase(getAllStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.all_students = action.payload.users;
        state.all_profiles = action.payload.profiles.reverse();
        state.all_profiles_fetched = true;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message || "Failed to fetch students.";
      })

      // ✅ Get Application Requests
      .addCase(getApplicationRequests.fulfilled, (state, action) => {
        state.applications = action.payload;
      })
      .addCase(getApplicationRequests.rejected, (state, action) => {
        state.message = action.payload?.message || "Failed to fetch applications.";
      })

      // ✅ Get Applicants for Job
      .addCase(getApplicantsForJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApplicantsForJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applicants = action.payload.applicants;
        state.applicantsFetched = true;
      })
      .addCase(getApplicantsForJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message || "Failed to fetch applicants.";
      })

      // Event Reducers  
      .addCase(getAllEvents.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        console.log("Full API Response:", action.payload);
        state.isLoading = false;
        state.events = action.payload.events;
        console.log("Events:", state.events);
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || "Failed to fetch events.";
      })
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload || "Failed to create event.";
      });
  },
});

export const { reset, emptyMessage, setTokenIsThere, setTokenIsNotThere, logout, clearLogoutFlag } = authSlice.actions;
export default authSlice.reducer;
