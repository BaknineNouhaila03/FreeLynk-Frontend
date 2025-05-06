"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from '../NavBar.module.css';
import { LogOut, Settings, User, s } from "lucide-react";
import { FiSearch } from "react-icons/fi";
import { IoMdVolumeMute } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsChatDots } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

export default function NavBar() {
    const [scrolled, setScrolled] = useState(false);
    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const notifRef = useRef();
    const profileRef = useRef();

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotificationDropdown(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} style={{ backgroundColor: "#e6e6e6" }}>
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
            <ul className={styles.iconNav}>
                <li><Link href="/"><AiOutlineHome size={24} /></Link></li>

                <li style={{ position: 'relative' }} ref={notifRef}>
                    <button onClick={() => setShowNotificationDropdown(prev => !prev)} className={styles.iconButton}>
                        <IoMdNotificationsOutline size={24} style={{color:"#535354"}}/>
                        <span className={styles.notificationDot}></span>
                    </button>
                    {showNotificationDropdown && (
                        <div className={styles.dropdownMenu}>
                            <div className={styles.dropdownContent}>
                                <p style={{ color: "grey" }}>Notifications</p>
                            </div>

                            <div className={styles.dropdownFooter}>
                                <IoMdVolumeMute style={{ marginRight: '8px' }} />
                                <span style={{ color: "grey" }}>Mute notifications</span>
                            </div>
                        </div>
                    )}
                </li>

                <li><Link href="/messages"><BsChatDots size={22} /></Link></li>
                <li><Link href="/saved"><BsBookmarkFill size={20} /></Link></li>

                <li style={{ position: 'relative' }} ref={profileRef}>
                    <button onClick={() => setShowProfileDropdown(prev => !prev)} className={styles.iconButton}>
                        <FaUser size={20} color='#535354'/>
                    </button>
                    {showProfileDropdown && (
                       <div className={styles.dropdownMenuProfile} style={{ width: "140px", padding: "10px" ,marginTop:"10px"}}>
  
                       {/* Profile Link */}
                       <div style={{ 
                         display: "flex", 
                         justifyContent: "space-between", 
                         alignItems: "center", 
                         marginBottom: "10px", 
                         borderBottom: "0.5px  #535354", 
                         paddingBottom: "6px" 
                       }}>
                         <Link href="/profile" style={{ fontSize: "16px", color: "#535354", textDecoration: "none" }}>
                           Profile
                         </Link>
                         <User size={20} color="#535354" />
                       </div>
                     
                       {/* Settings Link */}
                       <div style={{ 
                         display: "flex", 
                         justifyContent: "space-between", 
                         alignItems: "center", 
                         marginBottom: "10px" ,
                         paddingBottom: "6px" 

                       }}>
                         <Link href="/settings" style={{ fontSize: "16px", color: "#535354", textDecoration: "none" }}>
                           Settings
                         </Link>
                         <Settings size={20} color="#535354" />
                       </div>
                     
                       {/* Logout Button */}
                       <div style={{ 
                         display: "flex", 
                         justifyContent: "space-between", 
                         alignItems: "center" 
                       }}>
                         <button 
                           onClick={() => alert("Logout")} 
                           style={{ 
                             fontSize: "16px", 
                             border: "none", 
                             background: "transparent", 
                             color: "#535354", 
                             cursor: "pointer", 
                             padding: "0" 
                           }}
                         >
                           Logout
                         </button>
                         <LogOut size={20} color="#535354" />
                       </div>
                     </div>
                     
                    )}
                </li>
            </ul>
        </nav>
    );
}
