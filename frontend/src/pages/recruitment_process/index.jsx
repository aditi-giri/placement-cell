// index.jsx
import AdminDashboardLayout from '@/layout/AdminDashboardLayout'
import AdminLayout from '@/layout/AdminLayout'
import React from 'react'
import styles from './index.module.css'
import Footer from '@/Components/Footer'
import { useSelector } from 'react-redux'

export default function RecruitmentProcessPage() {
  const authstate = useSelector((state)=>state.auth)
  const steps = [
    "Students Register for Placement Session",
    "Placement Cell Opens Registration for Companies",
    "Companies Submit Job Requirements and Details",
    "Verification of Company Documents by Placement Cell",
    "Job/Internship Announcements for Available Positions",
    "Interested Students Apply Through Portal",
    "Eligibility Screening as per Company Requirements",
    "Pre-Placement Talks and Company Presentations",
    "Conducting Written Tests/Group Discussions",
    "Technical and HR Interview Rounds",
    "Final Selection and Offer Letter Distribution"
  ]

  return (
    <AdminLayout>
     <AdminDashboardLayout>
        <div className={styles.container}>
          <h1 className={styles.title}>Recruitment Process at BMCC Pune</h1>
          <div className={styles.processContainer}>
            {steps.map((step, index) => (
              <div key={index} className={styles.stepWrapper}>
                <div className={styles.stepCard}>
                  <span className={styles.stepNumber}>{index + 1}</span>
                  <p className={styles.stepText}>{step}</p>
                </div>
                {index !== steps.length - 1 && (
                  <div className={styles.arrow}>
                    <svg height="24" width="24" viewBox="0 0 24 24">
                      <path d="M7 10l5 5 5-5H7z" fill="#4a90a0" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={styles.note}>
            <p>Note: The recruitment process may be modified based on specific company requirements and current circumstances.</p>
          </div>
        </div>
     {!authstate.loggedIn &&<Footer/>}
     </AdminDashboardLayout>
    </AdminLayout>
  )
}