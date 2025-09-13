import AdminDashboardLayout from '@/layout/AdminDashboardLayout';
import AdminLayout from '@/layout/AdminLayout';
import React from 'react';
import styles from './index.module.css';
import Footer from '@/Components/Footer';
import { useSelector } from 'react-redux';


export default function HomePage() {
  const authstate = useSelector((state)=>state.auth)
  const responsibilities = [
    {
      icon: "check-lg",
      text: "Facilitating Industry Training and Internships for students across all programs"
    },
    {
      icon: "check-lg",
      text: "Inviting Companies/Organizations of repute for campus placements"
    },
    {
      icon: "check-lg",
      text: "Conducting pre-placement training sessions and workshops"
    },
    {
      icon: "check-lg",
      text: "Organizing career guidance and industry interaction sessions"
    }
  ];

  const fliers = [
    
    {
      session: "2023-24",
      placement: "/docs/Placement_Flier_2023-24.png",
      internship: "/docs/Internship_Flier_2023-24.png"
    }
  ];

  const placementCommittee = [
    {
      name: "Nilofer Agnihotri",
      role: "Professor In-charge, Training & Placement Cell",
      phone: "+91-982-XXX-XXXX",
      email: "pic.tnp@bmcc.edu.in"
    },
    {
      name: "Anushka Muchlambkar",
      role: "Student Coordinator",
      phone: "+91-897-XXX-XXXX",
      email: "placements@bmcc.edu.in"
    }
  ];

  const departmentCoordinators = [
    {
      name: "Mrs. Bharati Upadhye",
      department: "BBA",
      phone: "9876543210",
      email: "bharati.upadhye.bba@bmcc.edu.in"
    },
    {
      name: "Mrs. Vinaya Hasamnis",
      department: "BCA",
      phone: "9876543211",
      email: "vinaya.hasamnis.bca@bmcc.edu.in"
    },
    {
      name: "Dr. Jagdish Lanjekar",
      department: "B.Com",
      phone: "9876543212",
      email: "jagdish.lanjekar.bcom@bmcc.edu.in"
    }
  ];

  return (
    <AdminLayout>
      <AdminDashboardLayout>
        <div className={styles.container}>
          <h4 className={styles.header}>Welcome to Training and Placement Cell, BMCC Pune</h4>
          
          <div className={styles.content}>
            {/* About Section */}
            <div className={styles.section}>
              <h5 className={styles.sectionTitle}>About Us</h5>
              <p className={styles.aboutText}>
                The Training and Placement Cell at BMCC, Pune plays a crucial role in bridging the gap between academia and industry. 
                Our cell is dedicated to providing comprehensive career development services and creating opportunities for students 
                to secure rewarding positions in leading organizations. With a legacy of excellence, BMCC has consistently maintained 
                strong relationships with industry partners, resulting in excellent placement records across all programs.
              </p>
            </div>

            {/* Main Responsibilities Section */}
            <div className={styles.section}>
              <h5 className={styles.sectionTitle}>
                Key Functions of the Training & Placement Cell
              </h5>
              <div className={styles.responsibilitiesGrid}>
                {responsibilities.map((item, index) => (
                  <div key={index} className={styles.responsibilityCard}>
                    <div className={styles.iconContainer}>
                      <i className={`bi bi-${item.icon}`}></i>
                    </div>
                    <div className={styles.responsibilityText}>
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Placement Process Section */}
            <div className={styles.section}>
              <h5 className={styles.sectionTitle}>Placement Process</h5>
              <div className={styles.processContainer}>
                <div className={styles.processStep}>
                  <div className={styles.stepNumber}>1</div>
                  <h6>Company Registration</h6>
                  <p>Companies submit their Job Notification Form (JNF) with role details and requirements</p>
                </div>
                <div className={styles.processStep}>
                  <div className={styles.stepNumber}>2</div>
                  <h6>Pre-Placement Talk</h6>
                  <p>Companies conduct information sessions to introduce their organization and opportunities</p>
                </div>
                <div className={styles.processStep}>
                  <div className={styles.stepNumber}>3</div>
                  <h6>Selection Process</h6>
                  <p>Written tests, interviews, and group discussions as per company requirements</p>
                </div>
                <div className={styles.processStep}>
                  <div className={styles.stepNumber}>4</div>
                  <h6>Offer Roll-out</h6>
                  <p>Final selection and offer letters issued to selected candidates</p>
                </div>
              </div>
            </div>

            {/* Info Cards Section */}
            <div className={styles.infoCardsContainer}>
              <div className={styles.infoCard}>
                <h5>Placement Schedule</h5>
                <p>
                  The placement season commences from August and continues through March. 
                  Pre-placement activities begin from June with training sessions and workshops.
                  <a href="/docs/placement-brochure.pdf" className={styles.pdfLink}>
                    <i className="bi bi-file-earmark-pdf-fill"></i> Placement Brochure
                  </a>
                </p>
              </div>

              <div className={styles.infoCard}>
                <h5>Placement Policy</h5>
                <p>
                  Our comprehensive placement policy ensures fair opportunity for all students.
                  View the complete policy document here:
                  <a href="/docs/policy.pdf" className={styles.pdfLink}>
                    <i className="bi bi-file-earmark-pdf-fill"></i>
                  </a>
                </p>
              </div>
            </div>

            {/* Contact Section */}
            <div className={styles.section}>
              <h5 className={styles.sectionTitle}>Placement Committee</h5>
              <div className={styles.committeeGrid}>
                {placementCommittee.map((member, index) => (
                  <div key={index} className={styles.memberCard}>
                    <h6>{member.name}</h6>
                    <p className={styles.role}>{member.role}</p>
                    <div className={styles.contactInfo}>
                      <p><i className="bi bi-telephone"></i> {member.phone}</p>
                      <p><i className="bi bi-envelope"></i> {member.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Coordinators */}
            <div className={styles.section}>
              <h5 className={styles.sectionTitle}>Department Placement Coordinators</h5>
              <div className={styles.tableContainer}>
                <table className={styles.coordinatorsTable}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Contact</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentCoordinators.map((coordinator, index) => (
                      <tr key={index}>
                        <td>{coordinator.name}</td>
                        <td>{coordinator.department}</td>
                        <td>{coordinator.phone}</td>
                        <td>{coordinator.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fliers Section */}
            <div className={styles.section}>
              <h5 className={styles.sectionTitle}>Placement & Internship Fliers</h5>
              <div className={styles.tableContainer}>
                <table className={styles.fliersTable}>
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Session</th>
                      <th>Placement Flier</th>
                      <th>Internship Flier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fliers.map((flier, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{flier.session}</td>
                        <td>
                          <a href={flier.placement} className={styles.pdfLink}>
                            <i className="bi bi-file-earmark-pdf-fill"></i>
                          </a>
                        </td>
                        <td>
                          <a href={flier.internship} className={styles.pdfLink}>
                            <i className="bi bi-file-earmark-pdf-fill"></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      {!authstate.loggedIn&&<Footer/>}
      </AdminDashboardLayout>
    </AdminLayout>
  );
}