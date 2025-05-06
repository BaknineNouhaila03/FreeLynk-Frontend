"use client"
import { useState } from 'react';
import styles from './PersonalInfo.module.css';

export default function PersonalInfo() {
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className={styles.personalInfoContainer}>
      <h2 className={styles.sectionTitle}>Personal Info</h2>
      <p className={styles.sectionDescription}>
        Tell us a bit about yourself. This information will appear on your 
        public profile, so that potential buyers can get to know you better.
      </p>
      <p className={styles.mandatoryNote}>* Mandatory fields</p>

      <div className={styles.formField}>
        <label className={styles.label}>
          Full Name* <span className={styles.privateTag}>Private</span>
        </label>
        <p className={styles.fieldHelper}>Ex. John Smith</p>
        <div className={styles.nameInputs}>
          <input 
            type="text" 
            placeholder="First Name" 
            className={styles.input} 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Last Name" 
            className={styles.input} 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.formField}>
        <label className={styles.label}>Display Name*</label>
        <p className={styles.fieldHelper}>
          Use your real name or a professional display name so buyers can 
          recognize and trust who they're hiring.
        </p>
        <input 
          type="text" 
          placeholder="Type your display name" 
          className={styles.input} 
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </div>

      <div className={styles.formField}>
        <label className={styles.label}>Profile Picture*</label>
        <p className={styles.fieldHelper}>
          Add a profile picture of yourself so customers will know exactly who 
          they'll be working with.
        </p>
        <div className={styles.profileImageContainer}>
          <div
            className={styles.profileImageUpload}
            onClick={() => document.getElementById('profileImageInput').click()}
            style={{ backgroundImage: profileImage ? `url(${profileImage})` : 'none' }}
          >
            {!profileImage && (
              <div className={styles.uploadIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
            )}
          </div>
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={handleProfileImageChange}
          />
        </div>
      </div>
    </div>
  );
}