import React from 'react';
import styles from './index.module.css';

const ContactUs = () => {
  const contactCards = [
    {
      title: "Training & Placement Cell",
      address: "Brihan Maharashtra College of Commerce (BMCC), 845, Shivaji Nagar, Pune - 411004, Maharashtra, India",
      phone: "+91-20-67656000",
      email: "placements@bmcc.ac.in"
    },
    {
      title: "Nilofer Agnihotri",
      role: "Professor In-charge, Training & Placement Cell",
      phone: "+91-20-67656101",
      email: "pic.placement@bmcc.ac.in"
    }
  ];
  
  const departmentContacts = [
    {
      name: "Dr. Rajesh Kuchekar",
      mobile: "9881012345",
      email: "priya.bcom@bmcc.ac.in",
      department: "B.COM"
    },
    {
      name: "Mrs. Bharati Upadhye",
      mobile: "9922543210",
      email: "rajesh.bba@bmcc.ac.in",
      department: "BBA"
    },
    {
      name: "Dr. Swati Deshmukh",
      mobile: "9844567890",
      email: "swati.mcom@bmcc.ac.in",
      department: "M.COM"
    },
    {
      name: "Dr. Amit Patil",
      mobile: "9898765432",
      email: "amit.mba@bmcc.ac.in",
      department: "MBA"
    },
    {
      name: "Dr. Meena Joshi",
      mobile: "9912345678",
      email: "meena.bca@bmcc.ac.in",
      department: "BCA"
    },
    {
      name: "Dr. Rahul Deshpande",
      mobile: "9856789012",
      email: "rahul.banking@bmcc.ac.in",
      department: "BANKING AND FINANCE"
    }
  ];
  return (
    <div className={styles.contact_container}>
      <h4 className={styles.contact_header}>Contact Us</h4>

      <div className={styles.contact_cards_row}>
        {contactCards.map((card, index) => (
          <div key={index} className={styles.contact_card}>
            <div className={styles.card_header}>
              <span className={styles.card_title}>{card.title}</span>
              <hr />
            </div>

            <div className={styles.card_content}>
              {card.address && (
                <div className={styles.contact_item}>
                  <div className={styles.icon}>
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <div className={styles.text}>{card.address}</div>
                </div>
              )}

              {card.role && (
                <div className={styles.contact_item}>
                  <div className={styles.icon}>
                    <i className="bi bi-person-fill"></i>
                  </div>
                  <div className={styles.text}>{card.role}</div>
                </div>
              )}

              <div className={styles.contact_item}>
                <div className={styles.icon}>
                  <i className="bi bi-telephone-fill"></i>
                </div>
                <div className={styles.text}>{card.phone}</div>
              </div>

              <div className={styles.contact_item}>
                <div className={styles.icon}>
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <div className={styles.text}>{card.email}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.table_container}>
        <table className={styles.department_table}>
          <thead>
            <tr>
              <th>S. No.</th>
              <th>Department Placement Committee Convener</th>
              <th>Mobile No.</th>
              <th>Email</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {departmentContacts.map((contact, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.mobile}</td>
                <td>{contact.email}</td>
                <td>{contact.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactUs;