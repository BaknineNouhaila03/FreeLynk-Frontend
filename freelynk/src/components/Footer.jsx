// components/footer.js
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
          <div className={styles.logo}>
            <img src="/images/logo.png" alt="Logo" />
          </div>
      
          
        </footer>
      );
}
