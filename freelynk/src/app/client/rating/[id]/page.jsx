"use client" 
import React, { useState, useEffect } from 'react'; 
import { useParams, useRouter } from 'next/navigation';
import './RatingFreelancer.css'; 
import NavBar from '@/components/navbar2/Navbar'; 
import Footer from '@/components/Footer/Footer'; 
 
const RatingFreelancer = () => { 
  const params = useParams();
  const router = useRouter();
  const freelancerId = params.id;

  const [ratings, setRatings] = useState({ 
    rating: 0, 
  }); 
  const [comment, setComment] = useState(''); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log('RatingFreelancer - freelancerId from params:', freelancerId);
    console.log('RatingFreelancer - params object:', params);
    
    // Check if freelancerId exists, if not redirect back
    if (!freelancerId) {
      console.error('No freelancer ID found in URL parameters');
      alert('Invalid freelancer ID - please try again from the freelancer profile page');
      router.back();
    }
  }, [freelancerId, router, params]);
   
  const handleRatingChange = (category, value) => { 
    setRatings(prev => ({ 
      ...prev, 
      [category]: value 
    })); 
  }; 
   
  const handleCommentChange = (e) => { 
    setComment(e.target.value); 
  }; 
   
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
     
    if (comment.length < 100) { 
      alert('Comment must be at least 100 characters long.'); 
      return; 
    } 

    if (ratings.rating === 0) {
      alert('Please provide a rating.');
      return;
    }

    // Get JWT token from localStorage
    const jwtToken = localStorage.getItem('jwtToken');
    
    if (!jwtToken) {
      alert('Authentication required. Please login.');
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        rating: ratings.rating,
        comment: comment
      };

      // Replace 'YOUR_BACKEND_URL' with your actual Spring Boot backend URL
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews/freelancer/${freelancerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify(reviewData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Review submitted:', result);
        alert('Rating submitted successfully!');
        
        // Reset form
        setRatings({ rating: 0 });
        setComment('');
        
        // Redirect back to freelancer profile
        router.push(`/client/Freelancer_profile/${freelancerId}`);
      } else if (response.status === 401) {
        alert('Authentication failed. Please login again.');
        // Optionally redirect to login
      } else if (response.status === 400) {
        alert('Invalid request. Please check your input.');
      } else if (response.status === 404) {
        alert('Freelancer not found.');
      } else {
        throw new Error(`Failed to submit review: ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }; 
   
  const renderStars = (category) => { 
    return ( 
      <div className="star-container"> 
        {[1, 2, 3, 4, 5].map((star) => ( 
          <span 
            key={star} 
            className={`star ${star <= ratings[category] ? 'star-filled' : ''}`} 
            onClick={() => handleRatingChange(category, star)} 
          > 
            ★ 
          </span> 
        ))} 
      </div> 
    ); 
  }; 
   
  return ( 
    <div> 
      <NavBar/> 
    <div className="rating-container"> 
      <h1 className="rating-title">Rating The Freelancer</h1> 
       
      <form onSubmit={handleSubmit} className="rating-form"> 
        <div className="rating-row"> 
<label className="rating-label">Rate your experience</label> 
<label className="rating-label"> (1 = Poor, 5 = Excellent)</label> 
 
          {renderStars('rating')} 
        </div> 
 
         
        <div className="comment-section"> 
          <label className="comment-label">Comment</label> 
          <textarea 
            value={comment} 
            onChange={handleCommentChange} 
            className="comment-textarea" 
            placeholder="Write your comment here..." 
            minLength={100} 
            required 
          /> 
          <div className="character-count"> 
            <span>min. 100 characters</span> 
            <span>{comment.length}/750</span> 
          </div> 
        </div> 
         
        <div className="button-container"> 
          <button
            type="button"
            onClick={() => router.back()}
            className="cancel-button"
            style={{
              marginRight: '10px',
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-button" 
            disabled={comment.length < 100 || ratings.rating === 0 || isSubmitting} 
          > 
            {isSubmitting ? 'Posting...' : 'Post'}
          </button> 
        </div> 
      </form> 
    </div> 
    <div style={{ backgroundColor: "#2f3c7e", marginTop: "50px" }}> 
                <Footer /> 
    </div> 
  </div> 
 
  ); 
}; 
 
export default RatingFreelancer;