"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../NavBar.module.css';

import { FiSearch } from "react-icons/fi";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsChatDots } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

export default function NavBar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} style={{ backgroundColor: "#e6e6e6"}}>
            <div className={styles.logo}>
                <Link href="/">
                    <img src="/assets/FreeLynk.png" alt="Logo" />
                </Link>
            </div>
            <div className={styles.searchContainer}>
                <FiSearch className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="What service are you looking for today ?"
                    className={styles.searchInput}
                />
            </div>

            {/* ICON NAVIGATION */}
            <ul className={styles.iconNav}>
                <li><Link href="/"><AiOutlineHome size={24} /></Link></li>
                <li style={{ position: 'relative' }}>
                    <Link href="/notifications">
                        <IoMdNotificationsOutline size={24} />
                        <span className={styles.notificationDot}></span>
                    </Link>
                </li>
                <li><Link href="/messages"><BsChatDots size={22} /></Link></li>
                <li><Link href="/saved"><BsBookmarkFill size={20} /></Link></li>
                <li><Link href="/profile"><FaUser size={20} /></Link></li>
            </ul>

            {/* Optional mobile menu toggle if you want */}
        </nav>
    );
}
