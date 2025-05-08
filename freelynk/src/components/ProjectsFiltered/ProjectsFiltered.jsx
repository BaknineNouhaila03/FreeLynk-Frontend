"use client"
import { useState } from 'react';
import styles from './ProjectsFiltered.module.css';
import { BookmarkIcon,Search, Filter } from 'lucide-react';


export default function ProjectsFiltered() {
  const [searchTerm, setSearchTerm] = useState('');
  const [projectTypeFilters, setProjectTypeFilters] = useState({
    hourlyRate: false,
    fixedPrice: false
  });
  const [fixedPriceMin, setFixedPriceMin] = useState('');
  const [fixedPriceMax, setFixedPriceMax] = useState('');
  const [hourlyRateMin, setHourlyRateMin] = useState('');
  
  // Track bookmarked state for each project individually
  const [bookmarkedProjects, setBookmarkedProjects] = useState({});
  
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

  // Clear filters function
  const clearProjectTypeFilters = () => {
    setProjectTypeFilters({
      hourlyRate: false,
      fixedPrice: false
    });
  };

  const clearFixedPriceFilters = () => {
    setFixedPriceMin('');
    setFixedPriceMax('');
  };

  const clearHourlyRateFilters = () => {
    setHourlyRateMin('');
  };

  // Toggle bookmark for a specific project
  const toggleBookmark = (projectId) => {
    setBookmarkedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  // Filter projects based on search term
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return(
    <>
         
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
      
      <div className={styles.contentWrapper}>
        <div className={styles.filtersContainer}>
          <div className={styles.filtersHeader}>
          <Filter size={18} color="#555" />
          <h2 className={styles.filtersTitle}>Filters</h2>
          </div>
          
          <div className={styles.filterSection}>
            <div className={styles.filterSectionHeader}>
              <h3 className={styles.filterSectionTitle}>Project type</h3>
              <button 
                className={styles.clearButton}
                onClick={clearProjectTypeFilters}
              >
                Clear
              </button>
            </div>
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  checked={projectTypeFilters.hourlyRate}
                  onChange={() => setProjectTypeFilters({
                    ...projectTypeFilters,
                    hourlyRate: !projectTypeFilters.hourlyRate
                  })}
                />
                Hourly Rate
              </label>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  checked={projectTypeFilters.fixedPrice}
                  onChange={() => setProjectTypeFilters({
                    ...projectTypeFilters,
                    fixedPrice: !projectTypeFilters.fixedPrice
                  })}
                />
                Fixed Price
              </label>
            </div>
          </div>
          
          <div className={styles.filterSection}>
            <div className={styles.filterSectionHeader}>
              <h3 className={styles.filterSectionTitle}>Fixed price</h3>
              <button 
                className={styles.clearButton}
                onClick={clearFixedPriceFilters}
              >
                Clear
              </button>
            </div>
            <div className={styles.priceRangeInputs}>
              <div className={styles.priceInputGroup}>
                <label className={styles.priceLabel}>min</label>
                <div className={styles.currencyInputWrapper}>
                  <span className={styles.currencySymbol}>$</span>
                  <input 
                    type="text" 
                    className={styles.priceInput}
                    value={fixedPriceMin}
                    onChange={(e) => setFixedPriceMin(e.target.value)}
                  />
                  <span className={styles.currencyUnit}>USD</span>
                </div>
              </div>
              <div className={styles.priceInputGroup}>
                <label className={styles.priceLabel}>max</label>
                <div className={styles.currencyInputWrapper}>
                  <span className={styles.currencySymbol}>$</span>
                  <input 
                    type="text" 
                    className={styles.priceInput}
                    value={fixedPriceMax}
                    placeholder="1500+"
                    onChange={(e) => setFixedPriceMax(e.target.value)}
                  />
                  <span className={styles.currencyUnit}>USD</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.filterSection}>
            <div className={styles.filterSectionHeader}>
              <h3 className={styles.filterSectionTitle}>Hourly rate</h3>
              <button 
                className={styles.clearButton}
                onClick={clearHourlyRateFilters}
              >
                Clear
              </button>
            </div>
            <div className={styles.priceRangeInputs}>
              <div className={styles.priceInputGroup}>
                <label className={styles.priceLabel}>min</label>
                <div className={styles.currencyInputWrapper}>
                  <span className={styles.currencySymbol}>$</span>
                  <input 
                    type="text" 
                    className={styles.priceInput}
                    value={hourlyRateMin}
                    onChange={(e) => setHourlyRateMin(e.target.value)}
                  />
                  <span className={styles.currencyUnit}>USD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.projectsContainer}>
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
              
              <div className={styles.bookmarkContainer}>
              <button 
                className={`${styles.bookmarkButton} ${bookmarkedProjects[project.id] ? styles.bookmarked : ''}`}
                onClick={() => toggleBookmark(project.id)}
              >
                <BookmarkIcon 
                  className={`${styles.icon} ${bookmarkedProjects[project.id] ? styles.bookmarkedIcon : ''}`}
                  fill={bookmarkedProjects[project.id] ? "currentColor" : "none"} 
                />
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>

  )
}
