import UserLayout from '@/layout/StudentLayout';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style.module.css';
import { loginAdmin, loginUser } from '@/config/redux/action/authAction';
import { emptyMessage, setTokenIsThere, setTokenIsNotThere } from '@/config/redux/reducer/authReducer';

function LoginComponent() {
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const [isAdmin, setIsAdmin] = useState(false);
  const [college_id, setCollegeId] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const hasRedirected = useRef(false); // Prevent multiple redirects

  // Redirect after login if already authenticated
  useEffect(() => {
    if (authState.loggedIn && !hasRedirected.current) {
      hasRedirected.current = true;
      if (authState.isAdmin) {
        router.replace('/dashboard/admin');
      } else {
        router.replace('/dashboard/student');
      }
    }
  }, [authState.loggedIn, authState.isAdmin, router]);

  // Initialize token state on mount (if needed)
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      dispatch(setTokenIsThere());
      // If not already logged in, trigger the login action based on stored role.
      const isAdminStored = localStorage.getItem("isAdmin") === "true";
      if (!authState.loggedIn) {
        if (isAdminStored) {
          dispatch(loginAdmin({ token }));
        } else {
          dispatch(loginUser({ token }));
        }
      }
    } else {
      dispatch(setTokenIsNotThere());
    }
  }, [dispatch, authState.loggedIn]);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (authState.message) {
      const timer = setTimeout(() => {
        dispatch(emptyMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [authState.message, dispatch]);

  const handleLogin = () => {
    if (authState.isLoading) return;
    if (isAdmin) {
      dispatch(loginAdmin({ username, password }));
    } else {
      dispatch(loginUser({ college_id, password }));
    }
  };

  const handleToggleLogin = () => {
    setIsAdmin(!isAdmin);
    setCollegeId("");
    setUsername("");
    setPassword("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.cardContainer__left}>
            <div className={styles.cardContainer__left__div}>
              <p className={styles.cardleft__heading}>
                {isAdmin ? "Admin Login" : "Student Login"}
              </p>
              <p style={{ color: authState.isError ? "red" : "green" }}>
                {authState.message?.message || ""}
              </p>
              <div className={styles.inputContainers}>
                {!isAdmin && (
                  <input
                    value={college_id}
                    onChange={(e) => setCollegeId(e.target.value)}
                    className={styles.inputField}
                    type="text"
                    placeholder="College Id"
                    onKeyDown={handleKeyPress}
                  />
                )}
                {isAdmin && (
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={styles.inputField}
                    type="text"
                    placeholder="Username"
                    onKeyDown={handleKeyPress}
                  />
                )}
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.inputField}
                  type="password"
                  placeholder="Password"
                  onKeyDown={handleKeyPress}
                />
                <div onClick={handleLogin} className={styles.buttonWithOutlineLeft}>
                  <p style={{marginBottom:'0px'}}>Sign In</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.cardContainer__right}>
            <div className={styles.cardContainer__right__div}>
              <p >{!isAdmin ? "Sign In as Admin?" : "Sign In as Student?"}</p>
              <div className={styles.buttonWithOutlineRight} onClick={handleToggleLogin}>
                <p style={{marginBottom:'0px'}}>{isAdmin ? "Student Login" : "Admin Login"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default LoginComponent;
