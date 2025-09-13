import React, { useEffect, useState } from "react";
import withAuth from "@/Components/hoc/withAuth";
import StudentLayout from "@/layout/StudentLayout";
import StudentDashboardLayout from "@/layout/StudentDashboardLayout";
import AdminLayout from "@/layout/AdminLayout";
import AdminDashboardLayout from "@/layout/AdminDashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { submitFeedback, getAllFeedbacks } from "@/config/redux/action/feedbackAction";
import { getMyProfile } from "@/config/redux/action/authAction";
import { resetSubmission } from "@/config/redux/reducer/feedbackReducer";
import styles from "./index.module.css";

function FeedbackPage() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  console.log("Profile:", authState.profile);

  const { feedbacks, loading, error, submissionSuccess } = useSelector((state) => state.feedback);

  // Local state for student feedback form
  const [title, setTitle] = useState("");
  const [feedback, setFeedback] = useState("");
  // Local state for success message
  const [submissionMsg, setSubmissionMsg] = useState("");

  // For students, fetch profile on mount
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token && !authState.isAdmin) {
      dispatch(getMyProfile(token));
    }
  }, [dispatch, authState.isAdmin]);

  // For admins and students, fetch all feedbacks on mount
  useEffect(() => {
    dispatch(getAllFeedbacks());
  }, [dispatch]);

  // Handle student feedback submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(submitFeedback({ title, feedback }));
  };

  // Reset form and show success message after submission success
  useEffect(() => {
    if (submissionSuccess) {
      setTitle("");
      setFeedback("");
      setSubmissionMsg("Feedback submitted successfully!");
      dispatch(resetSubmission());
      // Clear success message after 3 seconds
      const timer = setTimeout(() => {
        setSubmissionMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submissionSuccess, dispatch]);

  // Determine layout based on role
  const Layout = authState.isAdmin ? AdminLayout : StudentLayout;
  const DashboardLayout = authState.isAdmin ? AdminDashboardLayout : StudentDashboardLayout;

  // Helper function for date formatting
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // For student view, filter feedbacks to only show feedbacks for this student.
  // This assumes that authState.profile contains the student data and that the student's id is stored as authState.profile._id.
  const studentFeedbacks =
    !authState.isAdmin && authState.profile
      ? feedbacks.filter(
          (fb) => fb.student && fb.student._id === authState.profile.student
        )
      : feedbacks;

  return (
    <Layout>
      <DashboardLayout>
        <div className={styles.scrollComponent}>
          {authState.isAdmin ? (
            <>
              <h1>All Queries</h1>
              {loading ? (
                <p>Loading queries...</p>
              ) : error ? (
                <p className={styles.error}>{error}</p>
              ) : (
                <div className={styles.postsContainer}>
                  {feedbacks.map((fb) => (
                    <div key={fb._id} className={styles.singleCard}>
                      <h2>{fb.title}</h2>
                      <p>{fb.feedback}</p>
                      <p>
                        <strong>Student:</strong> {fb.student?.name} ({fb.student?.college_id})
                      </p>
                      <p>
                        <strong>Email:</strong> {fb.student?.email}
                      </p>
                      <p>
                        <strong>Submitted:</strong> {formatDate(fb?.timestamp)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <h1 style={{ marginBottom: "1rem" }}>Submit Query</h1>
              <form onSubmit={handleSubmit} className={styles.feedbackForm}>
                <div>
                  <label style={{ paddingLeft: "8%" }} htmlFor="title">
                    Title:
                  </label>
                  <br />
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter query title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ paddingLeft: "8%" }} htmlFor="feedback">
                    Query:
                  </label>
                  <br />
                  <textarea
                    id="feedback"
                    name="feedback"
                    placeholder="Enter your Query"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
                <div style={{ paddingLeft: "8%" }}>
                  <button type="submit" className={styles.createButton} disabled={loading}>
                    {loading ? "Submitting..." : "Submit Query"}
                  </button>
                </div>
                {error && <p className={styles.error}>{error}</p>}
              </form>
              {submissionMsg && <p className={styles.success}>{submissionMsg}</p>}
            </>
          )}
        </div>
      </DashboardLayout>
    </Layout>
  );
}

export default withAuth(FeedbackPage, "all");
