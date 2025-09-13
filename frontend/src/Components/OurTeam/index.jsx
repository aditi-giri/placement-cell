// OurTeamPage.jsx
import React from 'react';
import styles from './index.module.css';

const OurTeamPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Team</h1>

      <div className={styles.topSection}>
        {/* Director Card */}
        <div className={styles.leaderCard}>
          <h2 className={styles.whiteText}>Director, BMCC Pune</h2>
          <div className={styles.imageContainer}>
            <img src="/images/principal.jpg" alt="Principal" className={styles.image} />
          </div>
          <div className={`${styles.name} ${styles.whiteText}`}>Rajesh Kuchekar</div>
          <div className={`${styles.role} ${styles.whiteText}`}>Principal</div>
        </div>

        {/* TPO Card */}
        <div className={`${styles.leaderCard} ${styles.leaderCardSecondary}`}>
          <h2 className={styles.whiteText}>Training & Placement Officer</h2>
          <div className={styles.imageContainer}>
            <img src="/images/tpo.jpg.png" alt="TPO" className={styles.image} />
          </div>
          <div className={`${styles.name} ${styles.whiteText}`}>Nilofer Agnihotri</div>
          <div className={`${styles.role} ${styles.whiteText}`}>TPO</div>
        </div>
      </div>

      {/* Department Coordinators */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Department Placement Coordinators</h2>
        <div className={styles.grid}>
          {[
            { name: "Mrs. Bharati Upadhye", dept: "BBA" },
            { name: "Mrs. Vinaya Hasamnis", dept: "BCA" },
            { name: "Mrs. Manjusha Wadekar", dept: "B.Com" },
            { name: "Dr. Jagdish Lanjekar", dept: "M.Com" }
          ].map((coordinator, index) => (
            <div key={index} className={styles.card}>
              <div className={`${styles.imageContainer} ${styles.imageContainerSmall}`}>
                <img src="/images/logo.jpg" alt={coordinator.name} className={styles.image} />
              </div>
              <div className={styles.name}>{coordinator.name}</div>
              <div className={styles.departmentRole}>{coordinator.dept}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Coordinators */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Student Placement Coordinators</h2>
        <div className={styles.grid}>
          {[
            { name: "Anushka Muchlambkar", course: "Placement Cell Coordinator" },
            { name: "Priya Singh", course: "BCA Final Year" },
            { name: "Neha Gupta", course: "M.Com Final Year" },
            { name: "Raj Malhotra", course: "BBA Final Year" },

          ].map((student, index) => (
            <div key={index} className={styles.card}>
              <div className={`${styles.imageContainer} ${styles.imageContainerSmall}`}>
                <img src="/images/logo.jpg" alt={student.name} className={styles.image} />
              </div>
              <div className={styles.name}>{student.name}</div>
              <div className={styles.departmentRole}>{student.course}</div>
            </div>
          ))}
        </div>
      </div>
       {/* technical coordinators */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Tech Coordinators</h2>
        <div className={styles.grid}>
          {[
            
            { name: "Richa Darekar", course: " BBA CA Final Year" },
            { name: "Priyanka Gawali", course: "BBA CA Final Year" },
            { name: "Aditi Giri", course: "BBA CA Final Year" },

          ].map((student, index) => (
            <div key={index} className={styles.card}>
              <div className={`${styles.imageContainer} ${styles.imageContainerSmall}`}>
                <img src={`/images/${student.name}.jpg`} alt={student.name} className={styles.image} />
              </div>
              <div className={styles.name}>{student.name}</div>
              <div className={styles.departmentRole}>{student.course}</div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default OurTeamPage;