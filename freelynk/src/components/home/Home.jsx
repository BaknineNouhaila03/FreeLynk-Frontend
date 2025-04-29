import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer/Footer';
import styles from '@/components/home/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.pageBackground}>
        <NavBar />
        <div className={styles.heroSection}>
          <h1>
            Connect with <br />
            top talent <br />
            for any job, <br />
            instantly online.
          </h1>

          <div className={styles.buttons}>
            <button className={styles.clientButton}>I am a client</button>
            <button className={styles.freelancerButton}>I am a freelancer</button>
          </div>
        </div>
      </div>

      <div className={styles.about}>
        <div className={styles.aboutContent}>
          <h2>Welcome to FreeLynk — Your Go-To Platform for Top Freelance Talent</h2>
          <p>Looking for the perfect freelancer to bring your vision to life? Whether you need a creative designer, skilled developer, savvy marketer, or expert writer, we've got you covered. Our platform connects you with handpicked, highly rated freelancers from around the world — so you can hire with confidence and get the job done right.
          </p>
        </div>
      </div>

      <div className={styles.categories}>
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
      </div>
      
      <div className={styles.contact}>
        <div className={styles.contactContentGrid}>
          <ul className={styles.language}>
            <img src="images/image.png" alt="" />
            <li>US (International) / English</li>
          </ul>
          
          <ul>
            <b>FreeLancer</b>
            <li>Categories</li>
            <li>Projects</li>
            <li>Freelancers</li>
          </ul>
          
          <ul>
            <b>About</b>
            <li>About us</li>
            <li>How it works</li>
          </ul>
          
          <ul>
            <b>Terms</b>
            <li>Privacy</li>
            <li>Terms and Conditions</li>
          </ul>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}