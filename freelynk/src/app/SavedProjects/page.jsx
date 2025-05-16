"use client"
import { useState } from 'react';
import styles from './SavedProjects.module.css';
import { Search } from 'lucide-react';
import NavBar from '../../components/navbar2/Navbar';
import Footer from '../../components/Footer/Footer';

export default function SavedProjects() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample project data
  const projects = [
    {
      id: 1,
      name: 'Project Name',
      budget: 100,
      currency: '$',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      skills: ['Graphic Design', 'Photoshop', 'Photo Editing', 'Photoshop Design'],
      bids: 3
    },
    {
      id: 2,
      name: 'Project Name',
      budget: 100,
      currency: '$',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      skills: ['Graphic Design', 'Photoshop', 'Photo Editing', 'Photoshop Design'],
      bids: 3
    }
  ];

  // Filter projects based on search term
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NavBar/>
    <div className={styles.container}>
      <h1 className={styles.title}>Saved Projects</h1>
      
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={20} />
        <input
          type="text"
          placeholder="Search project"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className={styles.projectsList}>
        {filteredProjects.map(project => (
          <div key={project.id} className={styles.projectCard}>
            <div className={styles.projectHeader}>
              <div className={styles.projectInfo}>
                <h2 className={styles.projectName}>{project.name}</h2>
                <div className={styles.projectBudget}>Budget: {project.currency}{project.budget}</div>
              </div>
              <div className={styles.bidCount}>
                {project.bids} bids
              </div>
            </div>
            
            <div className={styles.projectDescription}>
              <div className={styles.descriptionLabel}>Project description</div>
              <div className={styles.descriptionText}>
                {project.description.length > 150 
                  ? project.description.substring(0, 150) + '...' 
                  : project.description}
                <span className={styles.viewMore}>View More</span>
              </div>
            </div>
            
            <div className={styles.skills}>
              {project.skills.map((skill, index) => (
                <span key={index} className={styles.skillTag}>
                  {skill}
                  {index < project.skills.length - 1 && ' • '}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ backgroundColor: "#2f3c7e", marginTop: "50px" }}>
                <Footer />
      </div>
    </div>

  );
}