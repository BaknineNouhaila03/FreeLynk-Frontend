"use client"
import React, { useState } from 'react';
import './Settings.css';
import NavBar from '../Navbar/Navbar';

function Settings() {
  const [formData, setFormData] = useState({
    displayName: 'Freelancer',
    email: 'freelancer@gmail.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    theme: 'light'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleThemeToggle = () => {
    setFormData({
      ...formData,
      theme: formData.theme === 'light' ? 'dark' : 'light'
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Saving settings:', formData);
    alert('Settings saved!');
  };

  const handleDeactivate = () => {
    if (window.confirm('Are you sure you want to deactivate your account?')) {
      console.log('Account deactivated');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
      console.log('Account deleted');
    }
  };

  return (
    <div className="settings-container">
        <NavBar/>
      <form onSubmit={handleSave} style={{marginTop:"100px"}}>
        <div className="settings-layout">
          {/* Account Information Section */}
          <div className="settings-section">
            <h2 className="section-title">Account Information</h2>
            <div className='input-group-group'>
            <div className="input-group" >
              <label htmlFor="displayName">New Display Name</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">New Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="input-group">
              <label htmlFor="currentPassword">Current Password</label>
              <div className="password-input-container">
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  placeholder="Enter your current password"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                />
                <button type="button" className="toggle-password">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="#666" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="password-input-container">
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter a new password"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
                <button type="button" className="toggle-password">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="#666" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter the new password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            </div>
          </div>

          {/* Theme and Account Management Section */}
          <div className="settings-section">
            <div className="theme-section">
              <h2 className="section-title">Theme preferences</h2>
              <div className="theme-selector">
                <p>Pick what suits your vibe : Light or Dark.</p>
                <button 
                  type="button" 
                  className={`theme-toggle ${formData.theme}`}
                  onClick={handleThemeToggle}
                >
                  <span className="toggle-knob"></span>
                  <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                </button>
              </div>
            </div>

            <div className="danger-zone">
              <h2 className="section-title">Deactivate or Delete account</h2>
              <div className="account-action-card">
                <p>
                  Deactivating your account will cause your profile and listings to disappear, 
                  and you will not receive any notifications from us. This can be undone later.
                </p>
                <button 
                  type="button" 
                  className="deactivate-button" 
                  onClick={handleDeactivate}
                >
                  Deactivate my account
                </button>

                <p>
                  Would you like to delete your account? 
                  Deleting your account will remove all the content associated with it
                </p>
                <button 
                  type="button" 
                  className="delete-button" 
                  onClick={handleDelete}
                >
                  Delete my account
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button type="submit" className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
}

export default Settings;