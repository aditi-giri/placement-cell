import StudentLayout from "@/layout/StudentLayout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentDashboardLayout from "@/layout/StudentDashboardLayout";
import withAuth from "@/Components/hoc/withAuth";
import { getApplicationRequests, getMyProfile, applyForJob } from "@/config/redux/action/authAction";
import { getAllPosts } from "@/config/redux/action/postAction";
import styles from "./index.module.css";

function StudentDashboard() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const postState = useSelector((state) => state.postReducer);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});

  useEffect(() => {
    if (authState.isTokenThere) {
      dispatch(getAllPosts());
      dispatch(getApplicationRequests({ token: localStorage.getItem("userToken") }))
        .then((res) => {
          if (res.payload && res.payload.applications) {
            const validAppliedJobs = res.payload.applications
              .filter((app) => app.job && app.job._id) // ✅ Ensure job exists
              .map((app) => app.job._id);
  
            setAppliedJobs(validAppliedJobs);
          }
        });
    }
  }, [authState.isTokenThere, dispatch]);
  
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      dispatch(getMyProfile(token));
    }
  }, [dispatch]);

  const toggleExpandPost = (postId) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleApply = (postId) => {
    if (!appliedJobs.includes(postId)) {
      dispatch(applyForJob({ token: localStorage.getItem("userToken"), jobId: postId }))
        .then((res) => {
          if (res.payload) {
            setAppliedJobs([...appliedJobs, postId]);
          }
        });
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <StudentLayout>
      <StudentDashboardLayout>
        <div className={styles.scrollComponent}>
          <h1 style={{ marginBottom: "1rem" }}>Job Posts</h1>
          <div className={styles.postsContainer}>
            {postState.posts && postState.posts.length > 0 ? (
              postState.posts.map((post) => {
                const isExpanded = expandedPosts[post._id];
                return (
                  <div key={post._id} className={styles.singleCard}>
                    <div
                      className={styles.singleCard__expandButton}
                      onClick={() => toggleExpandPost(post._id)}
                    >
                      {isExpanded ? "Collapse" : "Expand"}
                    </div>
                    <h2>{post.job.job_title}</h2>
                    <h3>{post.company_name}</h3>
                    <p>{post.company_website_url}</p>
                    {isExpanded && (
                      <>
                        <p><strong>Description:</strong> {post.job.job_description}</p>
                        <p><strong>Requirements:</strong> {post.job.requirements}</p>
                        <p><strong>Skills Required:</strong> {post.job.skills_required}</p>
                        <p><strong>Salary Package:</strong> {post.job.salary_package}</p>
                        <p><strong>Location:</strong> {post.job.location}</p>
                        <p><strong>Deadline:</strong> {formatDate(post.deadline)}</p>
                        <div
                          onClick={() => handleApply(post._id)}
                          className={styles.applyButton}
                          style={{
                            backgroundColor: appliedJobs.includes(post._id) ? "gray" : "#007bff",
                            cursor: appliedJobs.includes(post._id) ? "not-allowed" : "pointer"
                          }}
                        >
                          {appliedJobs.includes(post._id) ? "Applied" : "Apply"}
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            ) : (
              <p>No job posts available.</p>
            )}
          </div>
        </div>
      </StudentDashboardLayout>
    </StudentLayout>
  );
}

export default withAuth(StudentDashboard, "student");
