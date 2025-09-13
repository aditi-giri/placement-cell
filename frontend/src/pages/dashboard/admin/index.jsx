import AdminLayout from "@/layout/AdminLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, deletePost, getAllPosts } from "@/config/redux/action/postAction";
import AdminDashboardLayout from "@/layout/AdminDashboardLayout";
import withAuth from "@/Components/hoc/withAuth";
import styles from "./index.module.css";
import { getApplicantsForJob, getStudentProfile } from "@/config/redux/action/authAction";
import { BASE_URL } from "@/config";

function AdminDashboard() {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const postState = useSelector((state) => state.postReducer);
    const { applicants, applicantsFetched, studentProfile } = authState;

    const [selectedJob, setSelectedJob] = useState(null);
    const [expandedPosts, setExpandedPosts] = useState({});
    const [viewingProfileId, setViewingProfileId] = useState(null);
    const [newPost, setNewPost] = useState({
        company_name: "",
        company_website_url: "",
        job: {
            job_title: "",
            requirements: "",
            job_description: "",
            skills_required: "",
            salary_package: "",
            location: "",
            deadline: ""
        }
    });


    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    const fetchApplicants = (postId) => {
        setSelectedJob(postId);
        dispatch(getApplicantsForJob(postId));
    };

    const toggleExpandPost = (postId) => {
        setExpandedPosts((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    const viewProfile = (studentId) => {
        setViewingProfileId(studentId);
        dispatch(getStudentProfile(studentId));
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();
        const formattedPost = {
            ...newPost,
            skills_required: newPost.skills_required.split(",").map(skill => skill.trim()),  // Convert to array
        };
        await dispatch(createPost(formattedPost));
        setNewPost({
            company_name: "",
            company_website_url: "",
            job: {
                job_title: "",
                requirements: "",
                job_description: "",
                skills_required: "",
                salary_package: "",
                location: "",
                deadline: ""
            }
        });
        dispatch(getAllPosts());
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
        <AdminLayout>
            <AdminDashboardLayout>
                <div className={styles.scrollComponent}>
                    <div className={styles.createPostComponent}>
                        <h2>Create a New Job Post</h2>
                        <form onSubmit={handleCreatePost} className={styles.postForm}>
                            <input type="text" placeholder="Job Title" value={newPost.job_title} onChange={(e) => setNewPost({ ...newPost, job_title: e.target.value })} required />
                            <input type="text" placeholder="Company Name" value={newPost.company_name} onChange={(e) => setNewPost({ ...newPost, company_name: e.target.value })} required />
                            <input type="url" placeholder="Company Website" value={newPost.company_website_url} onChange={(e) => setNewPost({ ...newPost, company_website_url: e.target.value })} required />
                            <textarea placeholder="Job Requirements" value={newPost.requirements} onChange={(e) => setNewPost({ ...newPost, requirements: e.target.value })} required />
                            <textarea placeholder="Job Description" value={newPost.job_description} onChange={(e) => setNewPost({ ...newPost, job_description: e.target.value })} required />
                            <input type="text" placeholder="Skills Required" value={newPost.skills_required} onChange={(e) => setNewPost({ ...newPost, skills_required: e.target.value })} required />
                            <input type="text" placeholder="Salary Package" value={newPost.salary_package} onChange={(e) => setNewPost({ ...newPost, salary_package: e.target.value })} required />
                            <input type="text" placeholder="Job Location" value={newPost.location} onChange={(e) => setNewPost({ ...newPost, location: e.target.value })} required />
                            <input type="date" value={newPost.deadline} onChange={(e) => setNewPost({ ...newPost, deadline: e.target.value })} required />
                            <button type="submit">Create Post</button>
                        </form>
                    </div>

                    <div className={styles.postsContainer}>
                        {postState.posts.map((post) => {
                            const isExpanded = expandedPosts[post._id];
                            return (
                                <div key={post._id} className={styles.singleCard}>
                                    <div className={styles.singleCard__expandButton} onClick={() => toggleExpandPost(post._id)}>
                                        {isExpanded ? "Collapse" : "Expand"}
                                    </div>
                                    {authState.isAdmin && (
                                        <button
                                            className={styles.deleteButton}
                                            onClick={async () => {
                                                await dispatch(deletePost( post._id ));
                                                dispatch(getAllPosts());
                                            }}
                                        >
                                            Delete
                                        </button>
                                    )}
                                    <h2>{post.job.job_title}</h2>
                                    <h3>{post.company_name}</h3>
                                    <p>{post.company_website_url}</p>
                                    {isExpanded && (
                                        <>
                                            <p><strong>Requirements:</strong> {post.job.requirements}</p>
                                            <p><strong>Description:</strong> {post.job.job_description}</p>
                                            <p><strong>Skills Required:</strong> {post.job.skills_required}</p>
                                            <p><strong>Salary Package:</strong> {post.job.salary_package}</p>
                                            <p><strong>Location:</strong> {post.job.location}</p>
                                            <p><strong>Deadline:</strong> {formatDate(post.deadline)}</p>
                                            <button className={styles.applicantsButton} onClick={() => fetchApplicants(post._id)}>
                                                Show Applicants
                                            </button>
                                            {selectedJob === post._id && applicantsFetched && (
                                                <div className={styles.applicantsList}>
                                                    <h4>Applicants:</h4>
                                                    {applicants.length > 0 ? (
                                                        <ul>
                                                            {applicants.map((applicant) => (
                                                                <li key={applicant._id}>
                                                                    <strong>Name:</strong> {applicant.student.name} <br />
                                                                    <strong>Email:</strong> {applicant.student.email} <br />
                                                                    <strong>College ID:</strong> {applicant.student.college_id} <br />
                                                                    <img src={`${BASE_URL}/${applicant.student?.profilePicture}`} alt="Profile" width="50" height="50" />
                                                                    <br />
                                                                    <button className={styles.viewProfileButton} onClick={() => viewProfile(applicant.student.college_id)}>
                                                                        View Profile
                                                                    </button>
                                                                    {viewingProfileId === applicant.student.college_id && studentProfile && (
                                                                        <div className={styles.profileDetails}>
                                                                            <h4>Profile Details:</h4>
                                                                            <p><strong>Resume:</strong> <a href={`/uploads/${studentProfile.resume}`} target="_blank">View Resume</a></p>
                                                                            <p><strong>Specialization:</strong> {studentProfile.education?.specialization || "N/A"}</p>
                                                                            <p><strong>Projects:</strong> {studentProfile.projects || "No projects available"}</p>
                                                                            <p><strong>Experience:</strong> {studentProfile.experience || "No experience available"}</p>
                                                                        </div>
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p>No applicants yet.</p>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </AdminDashboardLayout>
        </AdminLayout>
    );
}

export default withAuth(AdminDashboard, "admin");
