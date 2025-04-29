// components/NavBar.js
import Link from 'next/link';
import styles from './NavBar.module.css';

export default function NavBar() {
    return (
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <img src="/images/logo.png" alt="Logo" />
          </div>
      
          <ul className={styles.navLinks}>
            <li><Link href="/">About</Link></li>
            <li><Link href="/about">Categories</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
      );
}
