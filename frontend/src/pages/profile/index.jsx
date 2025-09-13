import React, { useEffect, useState } from "react";
import withAuth from "@/Components/hoc/withAuth";
import StudentLayout from "@/layout/StudentLayout";
import StudentDashboardLayout from "@/layout/StudentDashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile, updateProfileData } from "@/config/redux/action/authAction";
import styles from "./index.module.css";
import { BASE_URL, clientServer } from "@/config";


function ProfilePage() {
    const dispatch = useDispatch();
    const { profile, isLoading, message, isError } = useSelector((state) => state.auth);
    const authState = useSelector((state) => state.auth);


    // Local state for profile fields
    const [bio, setBio] = useState("");
    const [degree, setDegree] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [percent10, setPercent10] = useState("");
    const [percent12, setPercent12] = useState("");
    const [cgpaGrad, setCgpaGrad] = useState("");
    const [cgpaPg, setCgpaPg] = useState("");
    const [resume, setResume] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [updateMessage, setUpdateMessage] = useState("");

    // Enums for dropdowns (could also import these from a constants file)
    const DegreeEnum = [
        "TY BCOM 2025",
        "TY BCOM - ACCA 2025",
        "TY BCOM - CMA-USA 2025",
        "TY BCOM Fintech 2025",
        "TY BCOM Honours 2025",
        "TY BBA 2025",
        "TY BBA IB 2025",
        "TY BMS 2025",
        "TY BCA 2025",
    ];

    const SpecializationEnum = [
        "Computer Application",
        "International Business (IB)",
        "BBA - Finance",
        "BBA - Marketing",
        "BBA - HR",
        "BBA - Services",
        "Cost & Works Accounting",
        "Business Administration",
        "Business Entrepreneurship",
        "Business Statistics",
        "Marketing Management",
        "Banking & Finance",
        "Strategic Finance (CMA-USA)",
        "Tax Procedure & Practice",
        "International Finance (ACCA)",
        "Fintech",
        "Honours",
        "eCommerce",
        "MCOM - Advance Accounting",
        "MCOM - Advance Cost Accounting",
        "MCOM - Business Administration",
        "Other",
    ];

    // On mount, fetch profile using token
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            dispatch(getMyProfile(token));
        }
    }, [dispatch]);

    // When profile loads, set local fields
    useEffect(() => {
        if (profile) {
            setBio(profile.bio || "");
            if (profile.education && profile.education.length > 0) {
                const edu = profile.education[0];
                setDegree(edu.degree || "");
                setSpecialization(edu.specialization || "");
                setPercent10(edu.percent_10th || "");
                setPercent12(edu.percent_12th || "");
                setCgpaGrad(edu.cgpa_grad || "");
                setCgpaPg(edu.cgpa_pg || "");
            }
            setResume(profile.resume || "");
        }
    }, [profile]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("userToken");
        const newProfileData = {
            token,
            bio,
            education: [
                {
                    degree,
                    specialization,
                    percent_10th: percent10,
                    percent_12th: percent12,
                    cgpa_grad: cgpaGrad,
                    cgpa_pg: cgpaPg,
                },
            ],
            resume,
        };
        await dispatch(updateProfileData(newProfileData));
        // Re-fetch profile after update
        dispatch(getMyProfile(token));
        setUpdateMessage("Profile updated");
        setTimeout(() => {
            setUpdateMessage("");
        }, 3000);
    };

    const updateProfilePicture = async (file) => {
        const formData = new FormData();
        formData.append("profile_picture", file);
        formData.append("token", localStorage.getItem("userToken"));

        const response = await clientServer.post("/update_profile_picture", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        dispatch(getMyProfile(localStorage.getItem("userToken")));
    }

    return (
        <StudentLayout>
            <StudentDashboardLayout>
                {console.log("PROFILE", authState.profile)}
                {console.log("BIO", authState.profile?.profile?.bio)}

                {console.log("EDUCATION", authState.profile?.profile?.education?.[0]?.degree)}

                <div className={styles.scrollComponent}>
                    <h1>My Profile</h1>
                    {updateMessage && <p className={styles.success}>{updateMessage}</p>}
                    {/* Display existing profile data below */}
                    {/* Replace the existing profile display section in your JSX with this code */}
                    {profile && (
                        <div className={styles.profileDisplay}>
                            {/* Profile Header */}
                            <div className={styles.profileHeader}>
                                <div className={styles.headerInfo}>
                                    <h2>{authState.user?.name}</h2>
                                    <div className={styles.badge}>{authState.profile?.profile?.education?.[0]?.degree || "Student"}</div>
                                </div>
                            </div>

                            {/* Profile Image */}
                            
                                <input
                                    onChange={(e) => updateProfilePicture(e.target.files[0])}
                                    hidden
                                    type="file"
                                    id="profilePictureUpload"
                                />
                                <label htmlFor="profilePictureUpload" style={{ cursor: 'pointer' }} title="Click to change profile picture">
                                    <img
                                        className={styles.img}
                                        src={`${BASE_URL}/${authState.user.profilePicture}`}
                                        alt="Profile"
                                    />
                                </label>
                            

                            {/* Profile Content */}
                            <div className={styles.profileContent}>
                                {/* Basic Info Section */}
                                <div className={styles.infoSection}>
                                    <h3>Basic Information</h3>

                                    <div className={styles.infoItem}>
                                        <div className={styles.infoLabel}>Name</div>
                                        <div className={styles.infoValue}>{authState.user?.name}</div>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <div className={styles.infoLabel}>Email</div>
                                        <div className={styles.infoValue}>{authState.user?.email}</div>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <div className={styles.infoLabel}>College ID</div>
                                        <div className={styles.infoValue}>{authState.user?.college_id}</div>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <div className={styles.infoLabel}>Bio</div>
                                        <div className={styles.infoValue}>
                                            {authState.profile?.profile?.bio || <span className={styles.emptyState}>No bio added yet</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Education Section */}
                                <div className={styles.infoSection}>
                                    <h3>Education</h3>

                                    {authState.profile?.profile?.education?.length > 0 ? (
                                        authState.profile.profile.education.map((edu, index) => (
                                            <div key={index} className={styles.educationCard}>
                                                <div className={styles.infoItem}>
                                                    <div className={styles.infoLabel}>Degree</div>
                                                    <div className={styles.infoValue}>{edu.degree || <span className={styles.emptyState}>Not specified</span>}</div>
                                                </div>

                                                <div className={styles.infoItem}>
                                                    <div className={styles.infoLabel}>Specialization</div>
                                                    <div className={styles.infoValue}>{edu.specialization || <span className={styles.emptyState}>Not specified</span>}</div>
                                                </div>

                                                <div className={styles.infoItem}>
                                                    <div className={styles.infoLabel}>10th Percentage</div>
                                                    <div className={styles.infoValue}>{edu.percent_10th || <span className={styles.emptyState}>Not specified</span>}</div>
                                                </div>

                                                <div className={styles.infoItem}>
                                                    <div className={styles.infoLabel}>12th Percentage</div>
                                                    <div className={styles.infoValue}>{edu.percent_12th || <span className={styles.emptyState}>Not specified</span>}</div>
                                                </div>

                                                <div className={styles.infoItem}>
                                                    <div className={styles.infoLabel}>Graduation CGPA</div>
                                                    <div className={styles.infoValue}>{edu.cgpa_grad || <span className={styles.emptyState}>Not specified</span>}</div>
                                                </div>

                                                <div className={styles.infoItem}>
                                                    <div className={styles.infoLabel}>PG CGPA</div>
                                                    <div className={styles.infoValue}>{edu.cgpa_pg || <span className={styles.emptyState}>Not specified</span>}</div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className={styles.emptyState}>No education details available.</div>
                                    )}
                                </div>

                                {/* Resume Section */}
                                <div className={styles.resumeSection}>
                                    <div className={styles.infoItem}>
                                        <div className={styles.infoLabel}>Resume</div>
                                        <div className={styles.infoValue}>
                                            {authState.profile?.profile?.resume ? (
                                                <a href={authState.profile.profile.resume} className={styles.resumeLink} target="_blank" rel="noopener noreferrer">
                                                    View Resume
                                                </a>
                                            ) : (
                                                <span className={styles.emptyState}>No resume added yet</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className={styles.toggleButton}
                    >
                        {expanded ? "Hide Update Form" : "Show Update Form"}
                    </button>
                    {expanded && (
                        <>
                            <h2>Update Profile</h2>
                            <form onSubmit={handleUpdate} className={styles.profileForm}>
                                <div>
                                    <label htmlFor="bio">Bio:</label>
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        placeholder="Enter your bio"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                    />
                                </div>
                                <h3>Education</h3>
                                <div>
                                    <label htmlFor="degree">Degree:</label>
                                    <select
                                        id="degree"
                                        name="degree"
                                        value={degree}
                                        onChange={(e) => setDegree(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Degree</option>
                                        {DegreeEnum.map((deg) => (
                                            <option key={deg} value={deg}>
                                                {deg}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="specialization">Specialization:</label>
                                    <select
                                        id="specialization"
                                        name="specialization"
                                        value={specialization}
                                        onChange={(e) => setSpecialization(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Specialization</option>
                                        {SpecializationEnum.map((spec) => (
                                            <option key={spec} value={spec}>
                                                {spec}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="percent10">10th Percentage:</label>
                                    <input
                                        type="text"
                                        id="percent10"
                                        name="percent10"
                                        placeholder="Enter your 10th percentage"
                                        value={percent10}
                                        onChange={(e) => setPercent10(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="percent12">12th Percentage:</label>
                                    <input
                                        type="text"
                                        id="percent12"
                                        name="percent12"
                                        placeholder="Enter your 12th percentage"
                                        value={percent12}
                                        onChange={(e) => setPercent12(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cgpaGrad">Graduation CGPA:</label>
                                    <input
                                        type="text"
                                        id="cgpaGrad"
                                        name="cgpaGrad"
                                        placeholder="Enter your graduation CGPA"
                                        value={cgpaGrad}
                                        onChange={(e) => setCgpaGrad(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cgpaPg">Post-Graduation CGPA:</label>
                                    <input
                                        type="text"
                                        id="cgpaPg"
                                        name="cgpaPg"
                                        placeholder="Enter your post-graduation CGPA"
                                        value={cgpaPg}
                                        onChange={(e) => setCgpaPg(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="resume">Resume (Filename or URL):</label>
                                    <input
                                        type="text"
                                        id="resume"
                                        name="resume"
                                        placeholder="Enter resume filename or URL"
                                        value={resume}
                                        onChange={(e) => setResume(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className={styles.createButton}>
                                    Update Profile
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </StudentDashboardLayout>
        </StudentLayout>
    );
}

export default withAuth(ProfilePage, "student");
