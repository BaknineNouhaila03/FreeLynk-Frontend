"use client"
import BrowseProjects from "../BrowseProjects/page";
import NavBar from "../../components/navbar2/Navbar";
import { useState } from "react";
import styles from '../BrowseProjects/BrowseProjects.module.css';
import ProjectsFiltered from "../ProjectsFiltered/ProjectsFiltered";
export default function Home_Freelancer() {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    return (

        <div>
            <NavBar />
            <HeaderSection />
            <div className={styles.container2}>
            <ProjectsFiltered/>
            </div>

        </div>
    )
}
const HeaderSection = () => (
    <div style={{ backgroundColor: "#2f3c7e", color: "white", padding: "60px 20px", marginTop: "70px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", textShadow: "1px 1px 1px white" }}>WELCOME, MR. X!</h1>
            <p style={{ fontSize: "16px", marginTop: "10px" }}>
            Ready to turn your skills into success? Let’s connect you with clients who need your talent.
            </p>
        </div>
    </div>
);

