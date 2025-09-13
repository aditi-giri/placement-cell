import AdminDashboardLayout from '@/layout/AdminDashboardLayout'
import AdminLayout from '@/layout/AdminLayout'
import React from 'react'
import styles from './index.module.css'
import Footer from '@/Components/Footer'
import { useSelector } from 'react-redux'

export default function RecruitersPage() {

  const authstate = useSelector((state)=>state.auth)
  // Sample recruiting companies data - replace with your actual data
  const recruiters = [
    { name: "Infosys", industry: "IT Services" },
    { name: "HDFC Bank", industry: "Banking" },
    { name: "TCS", industry: "IT Services" },
    { name: "Deloitte", industry: "Consulting" },
    { name: "Wipro", industry: "IT Services" },
    { name: "ICICI Bank", industry: "Banking" },
    { name: "Cognizant", industry: "IT Services" },
    { name: "EY", industry: "Consulting" },
    { name: "L&T Infotech", industry: "IT Services" },
    { name: "Axis Bank", industry: "Banking" },
    { name: "Tech Mahindra", industry: "IT Services" },
    { name: "KPMG", industry: "Consulting" }
  ]

  return (
    <AdminLayout>
      <AdminDashboardLayout>      
        <div className={styles.container}>
          <h1 className={styles.title}>Our Esteemed Recruiters</h1>
          
          <div className={styles.grid}>
            {recruiters.map((recruiter, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.imageContainer}>
                  <img 
                    src={`/images/${recruiter.name}.png`} 
                    alt={recruiter.name} 
                    className={styles.image} 
                  />
                </div>
                <div className={styles.name}>{recruiter.name}</div>
                <div className={styles.industry}>{recruiter.industry}</div>
              </div>
            ))}
          </div>
        </div>
{!authstate.loggedIn &&<Footer/>}
   
   </AdminDashboardLayout>

    </AdminLayout>
  )
}