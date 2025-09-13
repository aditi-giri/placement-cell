import React from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/config/redux/reducer/authReducer'; // Adjust the import path as needed
import { getMyProfile } from '@/config/redux/action/authAction';
import { BASE_URL } from '@/config';

export default function NavBarComponent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  // Logout function: Remove token from localStorage, dispatch logout action, and redirect to login.
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("isAdmin");
    dispatch(logout());
    setTimeout(() => {
      router.push("/login");
    }, 100);
  };

  // Handle profile click - dispatch getMyProfile if needed, then navigate
  const handleProfileClick = () => {
    const token = localStorage.getItem("userToken");
    if (token) {
      // Dispatch getMyProfile (optional if your profile page fetches on mount)
      dispatch(getMyProfile(token));
    }
    router.push("/profile");
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navBar}>
        {!authState.loggedIn&&
        <h1
        style={{ cursor: "pointer", padding: '1.2rem' }}
        onClick={() => router.push("/")}
      >
        Placement Cell
      </h1>
        }
        {
          authState.loggedIn &&
          <div style={{alignItems:'center', paddingLeft:'2rem'}}><img  src='/images/logo.jpg' width={90} /></div>
          
        }
        
        <div style={{ cursor: "pointer" }} className={styles.navBarOptionContainer}>
          {!authState.loggedIn && (
            <div className={styles.navBarOptionContainer__options}>
              <div
                onClick={() => router.push('/home')}
                className={styles.navBarOptionContainer__option}
              >
                Home
              </div>
              <div
                onClick={() => router.push('/our_team')}
                className={styles.navBarOptionContainer__option}
              >
                Our Team
              </div>
              <div
                onClick={() => router.push('/recruitment_process')}
                className={styles.navBarOptionContainer__option}
              >
                Recruitment Process
              </div>
              <div
                onClick={() => router.push('/our_recruiters')}
                className={styles.navBarOptionContainer__option}
              >
                Our Recruiters
              </div>
              <div 
                onClick={() => router.push('/contact_us')}
                className={styles.navBarOptionContainer__option}
              >
                Contact Us
              </div>
            </div>
          )}

          {authState.loggedIn ? (
            <div style={{ display: 'flex', gap: '1.2rem' }}>
              {authState.isAdmin ? (
                <div style={{ display: 'flex' }}>
                  <p style={{ fontSize: '1.1rem', fontWeight: 'bold', cursor: 'default', padding: '1.5rem' }}>
                    Hey, Admin
                  </p>
                  <p onClick={handleLogout} style={{ fontWeight: 'bold', cursor: 'pointer', padding: '1.5rem', fontSize: '1.1rem' }}>
                    Logout
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    width={60} height={60} style={{ borderRadius: '50%', objectFit: 'cover' }}
                    src={`${BASE_URL}/${authState.user.profilePicture}`}
                    alt="Profile Picture"
                  />
                  <p style={{ fontWeight: '500', cursor: 'pointer', padding: '1.5rem', fontSize: '1.1rem' }}>
                    Hey, {authState.user.name}
                  </p>
                  <p 
                    onClick={handleProfileClick}
                    style={{ fontWeight: 'bold', cursor: 'pointer', padding: '1.5rem', fontSize: '1.1rem' }}
                  >
                    Profile
                  </p>
                  <p onClick={handleLogout} style={{ fontWeight: 'bold', cursor: 'pointer', padding: '1.5rem', fontSize: '1.1rem' }}>
                    Logout
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div onClick={() => router.push("/login")} className={styles.buttonJoin}>
              Login
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
