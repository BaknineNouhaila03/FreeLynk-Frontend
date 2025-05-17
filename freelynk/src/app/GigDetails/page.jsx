"use client"
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from './GigDetails.module.css';
import NavBar from '../../components/navbar2/Navbar';

export default function GigDetails() {

  const [currentSlide, setCurrentSlide] = useState(0);
  const portfolioItems = [
    {
      id: 1,
      image: "/assets/Client.jpg", 
    },
    {
      id: 2,
      image: "/assets/Client.jpg", 
    },
    {
      id: 3,
      image: "/assets/Client.jpg", 
    },
  ];

  // Navigate to previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? portfolioItems.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === portfolioItems.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className={styles.container}>
        <NavBar/>
      <Head>
        <title>Freelancer Portfolio | Workreap Theme</title>
        <meta name="description" content="Freelancer portfolio showcasing web development services" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div style={{borderRadius:"8px"}}>
        <div style={{backgroundColor:"white",color:"#2f3c7e",fontSize:"35px",padding:"30px"}}><p style={{marginLeft:"30px",fontWeight:"700"}}>I will build a freelancing wordpress website with workreap theme</p>
        </div>

        <div className={styles.profileHeader}>
          <div className={styles.profileInfo}>
            <div className={styles.avatarContainer}>
              <Image 
                src="/assets/account2.png" 
                alt="Freelancer Avatar" 
                width={80} 
                height={80}
                className={styles.avatar}
              />
            </div>
            <div className={styles.userInfo}>
              <h1 className={styles.freelancerName}>Freelancer Name</h1>
              <p className={styles.jobTitle}>Full Stack dev</p>
              <div className={styles.ratingContainer}>
                <p className={styles.ratingScore}>(5.0)</p>
                <div className={styles.stars}>
                  {'★★★★★'.split('').map((star, i) => (
                    <span key={i} className={styles.star}>{star}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button className={styles.contactButton}>
            Contact Me
          </button>
        </div>

        <div className={styles.portfolioSlider}>
          {portfolioItems.map((item, index) => (
            <div 
              key={item.id}
              className={`${styles.slide} ${
                index === currentSlide ? styles.activeSlide : styles.hiddenSlide
              }`}
            >
              <div className={styles.slideImageContainer}>
                <img style={{width:"100%",height:"100%"}} src="/assets/Client.jpg"></img>

              </div>
            </div>
          ))}
          <button 
            onClick={prevSlide}
            className={`${styles.navButton} ${styles.prevButton}`}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextSlide}
            className={`${styles.navButton} ${styles.nextButton}`}
            aria-label="Next slide"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>



        <div className={styles.aboutSection}>
          <h2 className={styles.sectionTitle}>About this gig</h2>
          <div className={styles.projectDescription}>
            <h3 className={styles.descriptionTitle}>Project description</h3>
            <p className={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore 
              magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
              commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est 
              laborum... <span className={styles.viewMore}>View More</span>
            </p>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}