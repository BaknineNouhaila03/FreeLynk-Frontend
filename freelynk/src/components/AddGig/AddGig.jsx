"use client"
import React, { useState } from 'react';
import './AddGig.css';
import NavBar from '../navbar2/Navbar';

export default function AddGig() {
  const [formData, setFormData] = useState({
    gigName: '',
    gigDescription: '',
    photos: []
  });

  const [descriptionLength, setDescriptionLength] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'gigDescription') {
      setDescriptionLength(value.length);
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddPhoto = () => {
    // In a real implementation, this would open a file dialog
    console.log('Add photo clicked');
    // For demonstration, add a placeholder photo
    if (formData.photos.length < 5) {
      setFormData({
        ...formData,
        photos: [...formData.photos, 'placeholder']
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting gig:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="add-gig-container">
      <NavBar />
      <div className="add-gig-content" style={{marginTop:"150px"}}>
        <h1>Add a Gig</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="gigName">Gig name</label>
            <input
              type="text"
              id="gigName"
              name="gigName"
              value={formData.gigName}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="gigDescription">About this gig</label>
            <textarea
              id="gigDescription"
              name="gigDescription"
              value={formData.gigDescription}
              onChange={handleInputChange}
              maxLength={700}
              rows={8}
              required
            />
            <div className="character-count">
              {descriptionLength}/700
            </div>
          </div>
          
          <div className="form-group">
            <label>Add Photos</label>
            <div className="photo-upload-area">
              <div className="photo-placeholder camera-placeholder" onClick={handleAddPhoto}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15.2C13.7673 15.2 15.2 13.7673 15.2 12C15.2 10.2327 13.7673 8.8 12 8.8C10.2327 8.8 8.8 10.2327 8.8 12C8.8 13.7673 10.2327 15.2 12 15.2Z" fill="white"/>
                  <path d="M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z" fill="white"/>
                </svg>
              </div>
              <div className="photo-placeholder plus-placeholder" onClick={handleAddPhoto}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="white"/>
                </svg>
              </div>
              {/* Display added photos here */}
              {formData.photos.slice(2).map((photo, index) => (
                <div key={index} className="photo-placeholder">
                  {/* Photo preview would go here */}
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

