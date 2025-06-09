"use client"
import { useState, useEffect } from 'react';
import styles from './SavedFreelancers.module.css';
import { Search, Trash2 } from 'lucide-react';
import NavBar from '../../components/navbar2/Navbar';
import Footer from '../../components/Footer/Footer';

export default function SavedFreelancers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const getClientEmail = () => {
    return localStorage.getItem('clientEmail');
  };

  const getClientId = async () => {
    try {
      const clientEmail = getClientEmail();
      if (!clientEmail) {
        throw new Error('Client email not found');
      }

      const response = await fetch(`http://localhost:8081/api/clients/email/${clientEmail}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch client details');
      }
      
      const client = await response.json();
      return client.id; 
    } catch (error) {
      console.error('Error getting client ID:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchSavedFreelancers();
  }, []);

  const fetchSavedFreelancers = async () => {
    try {
      setLoading(true);
      const clientId = await getClientId(); 
      
      const response = await fetch(`http://localhost:8081/api/saved-freelancers/client/${clientId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch saved freelancers');
      }
      
      const data = await response.json();
      setFreelancers(data);
      setError(null);
    } catch (err) {
      setError('Failed to load saved freelancers');
      console.error('Error fetching saved freelancers:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFreelancer = async (freelancerId) => {
    try {
      const clientId = await getClientId(); 
      
      const response = await fetch(`http://localhost:8081/api/saved-freelancers/remove?clientId=${clientId}&freelancerId=${freelancerId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove freelancer');
      }
      
      setFreelancers(prev => prev.filter(f => f.freelancerId !== freelancerId));
    } catch (err) {
      console.error('Error removing freelancer:', err);
      alert('Failed to remove freelancer');
    }
  };

  const filteredFreelancers = freelancers.filter(freelancer => 
    freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    freelancer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    freelancer.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    while (stars.length < 5) {
      stars.push('☆');
    }
    
    return stars.join('');
  };

  if (loading) {
    return (
      <div>
        <NavBar/>
        <div className={styles.container}>
          <div className={styles.loading}>Loading saved freelancers...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBar/>
        <div className={styles.container}>
          <div className={styles.error}>{error}</div>
          <button onClick={fetchSavedFreelancers} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar/>
      <div className={styles.container}>
        <h1 className={styles.title}>Saved Freelancers</h1>
        
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Search freelancer"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredFreelancers.length === 0 ? (
          <div className={styles.noResults}>
            {searchTerm ? 'No freelancers found matching your search.' : 'No saved freelancers yet.'}
          </div>
        ) : (
          <div className={styles.freelancersContainer}>
            {filteredFreelancers.map((freelancer) => (
              <div key={freelancer.freelancerId} className={styles.freelancerCard}>
                <div className={styles.freelancerInfo}>
                  <div className={styles.avatarContainer}>
                    <div className={styles.avatar}>
                      {freelancer.profileImage ? (
                        <img src={freelancer.profileImage} alt={freelancer.name} />
                      ) : (
                        <div className={styles.avatarPlaceholder}>
                          {freelancer.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.freelancerDetails}>
                    <h3 className={styles.freelancerName}>{freelancer.name}</h3>
                    <div className={styles.freelancerTitle}>
                      {freelancer.title}
                      <span className={styles.rating}>({freelancer.rating})</span>
                      <span className={styles.stars}>{renderStars(freelancer.rating)}</span>
                    </div>
                    <div className={styles.priceInfo}>
                      ${freelancer.price} {freelancer.currency} • {freelancer.deliveryTime}
                    </div>
                  </div>
                  <div className={styles.freelancerActions}>
                    <button 
                      onClick={() => removeFreelancer(freelancer.freelancerId)}
                      className={styles.removeButton}
                      title="Remove from saved"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className={styles.freelancerDescription}>
                  {freelancer.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ backgroundColor: "#2f3c7e", marginTop: "50px" }}>
        <Footer />
      </div>
    </div>
  );
}