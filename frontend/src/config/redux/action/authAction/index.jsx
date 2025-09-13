import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "@/config";

// User Login
export const loginUser = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/login", {
        college_id: user.college_id,
        password: user.password,
      });

      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token);
      } else {
        return thunkAPI.rejectWithValue({
          message: "Token not provided",
        });
      }

      return thunkAPI.fulfillWithValue({
        token: response.data.token,
        user: response.data.student, // student details
        profile: response.data.profile, // profile details
      });
    } catch (err) {
      console.error("Login User Error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Something went wrong!" }
      );
    }
  }
);

// Admin Login
export const loginAdmin = createAsyncThunk(
  "user/adminLogin",
  async (admin, thunkAPI) => {
    try {
      const response = await clientServer.post("/adminlogin", {
        username: admin.username,
        password: admin.password,
      });

      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token);
      } else {
        return thunkAPI.rejectWithValue({
          message: "Token not provided",
        });
      }

      return thunkAPI.fulfillWithValue({
        token: response.data.token,
        admin: response.data.admin,
      });
    } catch (err) {
      console.error("Login Admin Error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Something went wrong!" }
      );
    }
  }
);

// Get My Profile
export const getMyProfile = createAsyncThunk(
  "user/getMyProfile",
  async (token, thunkAPI) => {
    try {
      const response = await clientServer.get("/get_my_profile", {
        params: { token },
      });
      // Assuming your backend returns { student: ..., profile: ... } in response.data,
      // but here we're only storing the student part in auth.user.
      return {
        token,
        user: response.data.student, // student details
        profile: response.data.profile, // profile details
      };
    } catch (error) {
      console.error("Get My Profile Error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Session restore failed" }
      );
    }
  }
);

// Get All Students (for admin)
export const getAllStudents = createAsyncThunk(
  "/admin/getAllStudents",
  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get("/admin/get_all_students");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.error("Get All Students Error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

// Create Student (by admin)
export const createStudent = createAsyncThunk(
  "student/createStudent",
  async (data, thunkAPI) => {
    try {
      const payload = {
        college_id: data.collegeId, // mapping frontend's camelCase to backend's expected field name
        password: data.password,
        name: data.name,
        email: data.email,
      };

      const response = await clientServer.post("/createstudent", payload);

      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      } else {
        return thunkAPI.rejectWithValue({
          message: "Something went wrong while creating student!",
        });
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Something went wrong!" }
      );
    }
  }
);

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

export const updateProfilePhoto = createAsyncThunk(
  "user/updateProfilePhoto",
  async (file, thunkAPI) => {
    try {
      const token = localStorage.getItem("userToken");
      // Create a FormData object to hold file and token
      const formData = new FormData();
      formData.append("profile_picture", file);
      formData.append("token", token);

      // Post to the endpoint that updates profile picture
      const response = await clientServer.post("/update_profile_picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Return message or refetch profile if needed
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Failed to update profile photo" }
      );
    }
  }
);


export const applyForJob = createAsyncThunk(
  "student/applyForJob",
  async ({ token, jobId }, thunkAPI) => {
    try {
      const response = await clientServer.post("/apply", { token, jobId });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);


export const getApplicationRequests = createAsyncThunk(
  "student/getApplicationRequests",
  async(student, thunkAPI) =>{
    try{

      const response = await clientServer.get("/get_my_applications",{
        params:{
          token:student.token
        }
        
      })
      return thunkAPI.fulfillWithValue(response.data);
    }catch(err) {
      console.log(err)
      return rejectWithValue(error.response?.data || { message: "Unknown error occurred" });
    }
  }
)
export const getApplicantsForJob = createAsyncThunk(
  "admin/getApplicantsForJob",
  async (postId, thunkAPI) => {
    try {
      console.log("Fetching applicants for postId:", postId); // Debugging line

      const response = await clientServer.post(
        "/get_applicants_for_job",
        { post_id: postId }, // ✅ Ensure it's sent in request body
        { headers: { "Content-Type": "application/json" } }
      );

      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      console.error("Get Applicants Error:", err.response?.data || err.message);
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Failed to fetch applicants" }
      );
    }
  }
);


export const getStudentProfile = createAsyncThunk(
  "post/getStudentProfile",
  async (college_id, thunkAPI) => {
      try {
          const response = await clientServer.get(`/get_student_and_profile`, {
              params: { college_id },
          });
          return thunkAPI.fulfillWithValue(response.data);
      } catch (err) {
          return thunkAPI.rejectWithValue(err.response?.data || { message: "Something went wrong!" });
      }
  }
);

// Create Event (Admin Only)
export const createEvent = createAsyncThunk(
  "event/createEvent",
  async ({ token, title, description }, thunkAPI) => {
    try {
      const response = await clientServer.post("/add", {
        token,
        title,
        description,
        
      });

      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Failed to create event" }
      );
    }
  }
);

// Get All Events
export const getAllEvents = createAsyncThunk(
  "event/getAllEvents",
  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get("/all");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Failed to fetch events" }
      );
    }
  }
);

// Delete Event (Admin Only)
export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async ({ eventId }, thunkAPI) => {
    try {
      const response = await clientServer.delete(`/delete/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // Use stored token
        }
      });

      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Failed to delete event" }
      );
    }
  }
);