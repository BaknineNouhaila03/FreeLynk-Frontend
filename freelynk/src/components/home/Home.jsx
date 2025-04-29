"use client"

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer/Footer';
import styles from '@/components/home/Home.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  // Check window size and set mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.pageBackground}>
        <NavBar />
        <div className={styles.heroSection}>
          <h1>
            Connect with {isMobile ? '' : <br />}
            top talent {isMobile ? '' : <br />}
            for any job, {isMobile ? '' : <br />}
            instantly online.
          </h1>
          <div className={styles.buttons}>
            <button className={styles.clientButton}>I am a client</button>
            <button className={styles.freelancerButton}>I am a freelancer</button>
          </div>
        </div>
      </section>
      
      <section className={styles.about}>
        <div className={styles.aboutContent}>
          <h2>Welcome to FreeLynk — Your Go-To Platform for Top Freelance Talent</h2>
          <p>Looking for the perfect freelancer to bring your vision to life? Whether you need a creative designer, skilled developer, savvy marketer, or expert writer, we've got you covered. Our platform connects you with handpicked, highly rated freelancers from around the world — so you can hire with confidence and get the job done right.
          </p>
        </div>
      </section>
      
      <section className={styles.categories}>
        <div className={styles.categoriesContent}>
          <h1>Accomplish tasks across more than <span className={styles.orangeText}>32</span> different categories</h1>
        </div>
        <div className={styles.categoriesGrid}>
          <ul>
            <li>Website Design</li>
            <li>Mobile Apps</li>
            <li>Android Apps</li>
            <li>iPhone Apps</li>
            <li>Software Architecture</li>
            <li>Graphic Design</li>
            <li>Logo Design</li>
            <li>Public Relations</li>
          </ul>
         
          <ul>
            <li>Research Writing</li>
            <li>Article Writing</li>
            <li>Web Scraping</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>HTML 5</li>
            <li>Javascript</li>
            <li>Data Processing</li>
          </ul>
         
          <ul>
            <li>Legal</li>
            <li>Linux</li>
            <li>Manufacturing</li>
            <li>Data Entry</li>
            <li>Content Writing</li>
            <li>Marketing</li>
            <li>Excel</li>
            <li>Ghostwriting</li>
          </ul>
        </div>
      </section>
     
      <section className={styles.contact}>
        <div className={styles.contactContentGrid}>
          <div className={styles.contactColumn}>
            <div className={styles.language}>
              <img src="images/image.png" alt="Language flag" />
              <span>US (International) / English</span>
            </div>
          </div>
         
          <div className={styles.contactColumn}>
            <h3>FreeLancer</h3>
            <ul>
              <li>Categories</li>
              <li>Projects</li>
              <li>Freelancers</li>
            </ul>
          </div>
         
          <div className={styles.contactColumn}>
            <h3>About</h3>
            <ul>
              <li>About us</li>
              <li>How it works</li>
            </ul>
          </div>
         
          <div className={styles.contactColumn}>
            <h3>Terms</h3>
            <ul>
              <li>Privacy</li>
              <li>Terms and Conditions</li>
            </ul>
          </div>
        </div>
      </section>
     
      <Footer />
    </div>
  );
}