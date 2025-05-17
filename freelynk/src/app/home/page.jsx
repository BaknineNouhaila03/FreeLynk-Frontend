"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer/Footer';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './Home.module.css';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showFreelancerLoginModal, setShowFreelancerLoginModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClientButtonClick = () => {
    setShowLoginModal(true);
  };

  const handleFreelancerButtonClick = () => {
    setShowFreelancerLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleCloseFreelancerModal = () => {
    setShowFreelancerLoginModal(false);
  };

  // Handle scroll locking when modal is open
  useEffect(() => {
    if (showLoginModal || showFreelancerLoginModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showLoginModal, showFreelancerLoginModal]);

  return (
    <div className={styles.container}>
      {/* Client Login Modal */}
      {showLoginModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <LoginForm onClose={handleCloseModal} userType="client" />
          </div>
        </div>
      )}
      
      {/* Freelancer Login Modal */}
      {showFreelancerLoginModal && (
        <div className={styles.modalOverlay} onClick={handleCloseFreelancerModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <LoginForm onClose={handleCloseFreelancerModal} userType="freelancer" />
          </div>
        </div>
      )}
      
      <section id="home" className={styles.pageBackground}>
        <NavBar />
        <div className={styles.heroSection}>
          <h1>
            Connect with {isMobile ? '' : <br />}
            top talent {isMobile ? '' : <br />}
            for any job, {isMobile ? '' : <br />}
            instantly online.
          </h1>
          <div className={styles.buttons}>
            <button 
              className={styles.clientButton} 
              onClick={handleClientButtonClick}
              aria-label="I am a client"
            >
              I am a client
            </button>
            <button 
              className={styles.freelancerButton} 
              onClick={handleFreelancerButtonClick}
              aria-label="I am a freelancer"
            >
              I am a freelancer
            </button>
          </div>
        </div>
      </section>
      
      <section id="about" className={styles.about}>
        <div className={styles.aboutContent}>
          <h2>Welcome to FreeLynk — Your Go-To Platform for Top Freelance Talent</h2>
          <p>Looking for the perfect freelancer to bring your vision to life? Whether you need a creative designer, skilled developer, savvy marketer, or expert writer, we've got you covered. Our platform connects you with handpicked, highly rated freelancers from around the world — so you can hire with confidence and get the job done right.
          </p>
        </div>
      </section>
      
      <section id="categories" className={styles.categories}>
        <div className={styles.categoriesContent}>
          <h2>Accomplish tasks across more than <span className={styles.orangeText}>32</span> different categories</h2>
        </div>
        <div className={styles.categoriesGrid}>
          <div className={styles.categoryColumn}>
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
          </div>
         
          <div className={styles.categoryColumn}>
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
          </div>
         
          <div className={styles.categoryColumn}>
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
        </div>
      </section>
     
      <section id="contact" className={styles.contact}>
        <div className={styles.contactContentGrid}>
          <div className={styles.contactColumn}>
            <div className={styles.language}>
              <img src="/images/globe.png" alt="Language icon" />
              <span>US (International) / English</span>
            </div>
          </div>
         
          <div className={styles.contactColumn}>
            <h3>FreeLancer</h3>
            <ul>
              <li><a href="#categories">Categories</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#freelancers">Freelancers</a></li>
            </ul>
          </div>
         
          <div className={styles.contactColumn}>
            <h3>About</h3>
            <ul>
              <li><a href="#about">About us</a></li>
              <li><a href="#how-it-works">How it works</a></li>
            </ul>
          </div>
         
          <div className={styles.contactColumn}>
            <h3>Terms</h3>
            <ul>
              <li><a href="/privacy">Privacy</a></li>
              <li>
                <Link href="/TC">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  );
}