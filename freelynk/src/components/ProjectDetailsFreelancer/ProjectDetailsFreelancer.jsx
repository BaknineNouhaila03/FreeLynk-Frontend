"use client"
import { useState } from 'react';
import styles from './ProjectDetailsFreelancer.module.css';
import Image from 'next/image';
import { BookmarkIcon, MapPinIcon, CalendarIcon, X } from 'lucide-react';
import NavBar from '../navbar2/Navbar';
import Footer from '../Footer/Footer';

export default function ProjectDetailsFreelancer() {
  const [activeTab, setActiveTab] = useState('details');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [bidForm, setBidForm] = useState({
    offer: '',
    deliveryTime: '',
    motivation: ''
  });
  
  // Dummy data for the project
  const projectData = {
    projectName: 'Project Name',
    budget: { min: 250.00, max: 750.00, currency: 'USD' },
    biddingEndsIn: { days: 2, hours: 23 },
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    keyOfferings: [
      'Lorem ipsum dolor sit amet',
      'Consectetur adipiscing elit. Sed do eiusmod tempor incididunt',
      'Labore et dolore magna aliqua. Ut enim ad minim veniam',
      'Suis nostrud exercitation ullamco laboris nisi ut aliquip'
    ],
    skillsRequired: ['Website Design', 'Lead Generation'],
    projectId: '39324550',
    clientInfo: {
      location: 'Budapest',
      country: 'Hungary',
      memberSince: 'Mar 29, 2025',
      rating: 0.0,
      reviews: 0
    },
    proposals: [
      {
        name: 'Freelancer Name',
        title: 'Full Stack dev',
        rating: 5.0,
        price: 50.00,
        currency: 'USD',
        deliveryTime: '7 days',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        name: 'Freelancer Name',
        title: 'Full Stack dev',
        rating: 5.0,
        price: 50.00,
        currency: 'USD',
        deliveryTime: '7 days',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBidForm({
      ...bidForm,
      [name]: value
    });
  };

  const handleSubmitBid = (e) => {
    e.preventDefault();
    console.log('Bid submitted:', bidForm);
    // Here you would typically send the bid data to your API
    setIsBidModalOpen(false);
    // Reset form
    setBidForm({
      offer: '',
      deliveryTime: '',
      motivation: ''
    });
  };

  return (
    <div>
      <NavBar/>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.projectName}>{projectData.projectName}</h1>
          <div className={styles.actions}>
            <div className={styles.bids}>
              <span>Bids</span>
              <span className={styles.bidCount}>12</span>
            </div>
            <button 
              className={`${styles.bookmarkButton} ${isBookmarked ? styles.bookmarked : ''}`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <BookmarkIcon className={`${styles.icon} ${isBookmarked ? styles.bookmarkedIcon : ''}`} fill={isBookmarked ? "currentColor" : "none"} />
            </button>
            <button 
              className={styles.bidButton}
              onClick={() => setIsBidModalOpen(true)}
            >
              Make a bid
            </button>
          </div>
        </div>

        <div className={styles.tabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'details' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'proposals' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('proposals')}
          >
            Proposals
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === 'details' ? (
            <div className={styles.detailsContainer}>
              <div className={styles.mainDetails}>
                <div className={styles.projectDetailsSection}>
                  <h2 className={styles.sectionTitle}>Project Details</h2>
                  
                  <div className={styles.budgetAndDeadline}>
                    <div className={styles.budget}>
                      ${projectData.budget.min.toFixed(2)} - {projectData.budget.max.toFixed(2)} {projectData.budget.currency}
                    </div>
                    <div className={styles.deadline}>
                      <span className={styles.deadlineIcon}>⏱</span>
                      BIDDING ENDS IN {projectData.biddingEndsIn.days} DAYS, {projectData.biddingEndsIn.hours} HOURS
                    </div>
                  </div>
                  
                  <p className={styles.description}>
                    {projectData.description}
                  </p>
                  
                  <div className={styles.keyOfferings}>
                    <h3>Key Offerings:</h3>
                    <ul>
                      {projectData.keyOfferings.map((offering, index) => (
                        <li key={index}>{offering}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={styles.skillsRequired}>
                    <h3>Skills Required</h3>
                    <div className={styles.skillTags}>
                      {projectData.skillsRequired.map((skill, index) => (
                        <span key={index} className={styles.skillTag}>{skill}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className={styles.projectId}>
                    Project ID: {projectData.projectId}
                  </div>
                </div>
              </div>
              
              <div className={styles.clientInfo}>
                <h2 className={styles.clientTitle}>About the client</h2>
                <div className={styles.clientLocation}>
                  <MapPinIcon className={styles.infoIcon} size={16} />
                  <span>{projectData.clientInfo.location}</span>
                </div>
                <div className={styles.clientCountry}>
                  <span className={styles.flagIcon}>🇭🇺</span>
                  <span>{projectData.clientInfo.country}</span>
                </div>
                <div className={styles.starRating}>
                  <div className={styles.stars}>
                    {'★'.repeat(Math.floor(projectData.clientInfo.rating))}
                    {'☆'.repeat(5 - Math.floor(projectData.clientInfo.rating))}
                  </div>
                  <span>{projectData.clientInfo.rating.toFixed(1)}</span>
                  <span className={styles.reviewCount}>({projectData.clientInfo.reviews})</span>
                </div>
                <div className={styles.clientMemberSince}>
                  <CalendarIcon className={styles.infoIcon} size={16} />
                  <span>Member since {projectData.clientInfo.memberSince}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.proposalsContainer}>
              {projectData.proposals.map((proposal, index) => (
                <div key={index} className={styles.proposalCard}>
                  <div className={styles.freelancerInfo}>
                    <div className={styles.avatarContainer}>
                      <div className={styles.avatar}></div>
                    </div>
                    <div className={styles.freelancerDetails}>
                      <h3 className={styles.freelancerName}>{proposal.name}</h3>
                      <div className={styles.freelancerTitle}>
                        {proposal.title}
                        <span className={styles.rating}>({proposal.rating})</span>
                        <span className={styles.stars}>★★★★★</span>
                      </div>
                    </div>
                    <div className={styles.proposalPrice}>
                      <div className={styles.price}>${proposal.price.toFixed(2)} {proposal.currency}</div>
                      <div className={styles.deliveryTime}>in {proposal.deliveryTime}</div>
                    </div>
                  </div>
                  <div className={styles.proposalDescription}>
                    {proposal.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bid Modal */}
      {isBidModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.bidModal}>
            <div className={styles.modalHeader}>
              <h2>Submit Your Bid</h2>
              <button 
                className={styles.closeModalButton}
                onClick={() => setIsBidModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSubmitBid} className={styles.bidForm}>
              <div className={styles.formGroup}>
                <label>Enter your offer</label>
                <input
                  type="text"
                  name="offer"
                  placeholder="Example : 700USD"
                  value={bidForm.offer}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Enter the estimated delivery time</label>
                <input
                  type="text"
                  name="deliveryTime"
                  placeholder="Example : 5 days"
                  value={bidForm.deliveryTime}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Enter your motivation</label>
                <textarea
                  name="motivation"
                  value={bidForm.motivation}
                  onChange={handleInputChange}
                  className={styles.textareaInput}
                  required
                />
                <div className={styles.characterCount}>
                  {bidForm.motivation.length}/200
                </div>
              </div>
              
              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      <div style={{ backgroundColor: "#2f3c7e", marginTop: "50px" }}>
        <Footer />
      </div>
    </div>
  );
}