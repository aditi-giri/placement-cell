import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAllPosts = createAsyncThunk(
    "post/getAllPosts",
    async (_, thunkAPI) => {
        try {
            const response = await clientServer.get("/allposts");
            return thunkAPI.fulfillWithValue(response.data);
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || { message: "Something went wrong!" });
        }
    }
);
export const createPost = createAsyncThunk(
  "post/createPost",
  async (data, thunkAPI) => {
    try {
      const payload = {
        token: localStorage.getItem("userToken"),
        company_name: data.company_name,  // Fix: match backend expectation
        company_website_url: data.company_website_url,
        job_title: data.job_title,
        job_description: data.job_description,
        requirements: data.requirements,
        location: data.location,
        salary_package: data.salary_package,
        skills_required: data.skills_required,
        deadline: data.deadline,
      };

      const response = await clientServer.post("/createpost", payload);
      
      if (response.status === 201) {
        return thunkAPI.fulfillWithValue(response.data);
      } else {
        return thunkAPI.rejectWithValue({ message: "Something went wrong while uploading post!" });
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Something went wrong!" }
      );
    }
  }
);


export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId, thunkAPI) => {
      try {
          const token = localStorage.getItem("userToken"); // Get token from local storage

          const response = await clientServer.delete("/deletepost", {
            headers: { "Content-Type": "application/json" },
            data: { token, post_id: postId },
        });

          return thunkAPI.fulfillWithValue(postId); // Return postId to update state
      } catch (err) {
          return thunkAPI.rejectWithValue(
              err.response?.data || { message: "Something went wrong!" }
          );
      }
  }
);
