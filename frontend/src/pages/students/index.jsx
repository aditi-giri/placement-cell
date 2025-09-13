// src/pages/dashboard/admin/StudentPage.jsx
import { createStudent, getAllStudents } from "@/config/redux/action/authAction";
import AdminDashboardLayout from "@/layout/AdminDashboardLayout";
import AdminLayout from "@/layout/AdminLayout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import { BASE_URL } from "@/config";

export default function StudentPage() {
  const authState = useSelector((state) => state.auth);
  console.log("authState:", authState);
  // Assuming your student slice stores profiles in "profiles"
  // const studentState = useSelector((state) => state.studentReducer);
  const dispatch = useDispatch();

  // Frontend state for student creation form
  const [expanded, setExpanded] = useState(false);
  const [collegeId, setCollegeId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!authState.all_profiles_fetched) {
      dispatch(getAllStudents());
    }
  }, [authState.all_profiles_fetched, dispatch]);

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(
      createStudent({
        collegeId,
        password,
        name,
        email,
      })
    );
    if (createStudent.fulfilled.match(resultAction)) {
      setExpanded(false);
      setCollegeId("");
      setPassword("");
      setName("");
      setEmail("");
      dispatch(getAllStudents());
    }
  };

  if (authState.token) {
    return (
      <AdminLayout>
        <AdminDashboardLayout>
          <div className={styles.scrollComponent}>
            {/* Create Student Form */}
            <div className={styles.createStudentComponent}>
              <div className={styles.createStudentComponent__container}>
                <h2>Create Student</h2>
                {expanded ? (
                  <form onSubmit={handleCreateStudent}>
                    <div>
                      <label htmlFor="college_id">College ID:</label>
                      <input
                        type="text"
                        id="college_id"
                        name="college_id"
                        placeholder="Enter college ID"
                        onFocus={() => setExpanded(true)}
                        onChange={(e) => setCollegeId(e.target.value)}
                        value={collegeId}
                      />
                    </div>
                    <div>
                      <label htmlFor="password">Password:</label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        onFocus={() => setExpanded(true)}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                    <div>
                      <label htmlFor="name">Name:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter name"
                        onFocus={() => setExpanded(true)}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </div>
                    <div>
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        onFocus={() => setExpanded(true)}
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                    <button type="submit" className={styles.createButton}>
                      Create Student
                    </button>
                  </form>
                ) : (
                  <input
                    type="text"
                    placeholder="create a student..."
                    onFocus={() => setExpanded(true)}
                  />
                )}
              </div>
            </div>

            {/* Display All Students */}

            <div className={styles.postsContainer}>
              {authState.all_profiles
                ?.filter((profile) => profile.student) // Remove profiles where student is null
                .map((profile) => (
                  <div key={profile._id} className={styles.singleCard}>
                    <div style={{ alignItems: 'center' }}>
                      <h2>{profile.student.name}</h2>
                      <img width={70} height={70} src={`${BASE_URL}/${profile.student.profilePicture}`} alt="Profile" />
                    </div>
                    <div style={{ gap: '1rem' }}>
                      <h3>{profile.student.college_id}</h3>
                      <p>{profile.student.email}</p>
                    </div>
                  </div>
                ))}
            </div>



          </div>
        </AdminDashboardLayout>
      </AdminLayout >
    );
  } else {
    return (
      <AdminLayout>
        <AdminDashboardLayout>
          <div className={styles.scrollComponent}>
            <div className={styles.createStudentComponent}>
              <h2>Loading...</h2>
            </div>
          </div>
        </AdminDashboardLayout>
      </AdminLayout>
    );
  }
}
