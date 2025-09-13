import React from 'react';
import styles from './index.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Contact Us</h3>
          <p>Brihan Maharashtra College of Commerce (BMCC)</p>
          <p>845, Shivaji Nagar, Pune - 411004</p>
          <p>Phone: +91-020-67656000</p>
          <p>Email: principal@bmcc.ac.in</p>
        </div>

        <div className={styles.footerSection}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/home">About Us</a></li>
            <li><a href="/recruitment_process">Recruitment Process</a></li>
            <li><a href="/our_recruiters">Placements</a></li>
            <li><a href="/contact_us">Contact</a></li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Connect With Us</h3>
          <div className={styles.socialLinks}>
            <a href="https://www.facebook.com/BMCCautonomous?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.youtube.com/@dessbmcc1926" target="_blank" rel="noopener noreferrer">Youtube</a>
            <a href="https://www.instagram.com/bmcc.autonomous_official24/?next=%2F" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} BMCC Pune. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;