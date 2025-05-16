"use client"
import { useState, useEffect } from 'react';
import styles from './PersonalInfo.module.css';

export default function PersonalInfo({ onValidationChange }) {
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [validation, setValidation] = useState({
    firstName: false,
    lastName: false,
    displayName: false,
    profileImage: false,
    gigThumbnails: false,
    description: false
  });

  const handleProfileImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
        validateField('profileImage', e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Initialize with array of 10 null values for up to 10 thumbnails
  const [gigThumbnails, setGigThumbnails] = useState(Array(10).fill(null));
  const [description, setDescription] = useState('');
  const [descriptionChars, setDescriptionChars] = useState(0);
  const [yearsExperience, setYearsExperience] = useState(1);
  const [location, setLocation] = useState('Morocco');
  const [languages, setLanguages] = useState([
    { language: 'English', level: 'Native/Bilingual' }
  ]);

  const handleGigThumbnailChange = (index, e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newThumbnails = [...gigThumbnails];
        newThumbnails[index] = e.target.result;
        setGigThumbnails(newThumbnails);
        validateField('gigThumbnails', newThumbnails);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Calculate how many thumbnails to show in UI
  // Show all filled thumbnails plus one empty thumbnail (for adding new)
  // but never more than the maximum of 10
  const getVisibleThumbnailsCount = () => {
    const filledCount = gigThumbnails.filter(t => t !== null).length;
    // Show all filled plus one empty slot (for adding new), but max 10 total
    return Math.min(filledCount + 1, 10);
  };

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    setDescription(text);
    setDescriptionChars(text.length);
    validateField('description', text);
  };

  // Just for demonstration - in real app would fetch from API
  const experienceOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+'];
  const locationOptions = ['Morocco', 'United States', 'France', 'United Kingdom', 'Canada', 'Germany'];
  const languageLevels = ['Basic', 'Conversational', 'Fluent', 'Native/Bilingual'];

  const addNewLanguage = () => {
    setLanguages([...languages, { language: '', level: 'Basic' }]);
  };

  const validateField = (field, value) => {
    let isValid = false;
    
    switch(field) {
      case 'firstName':
        isValid = value.trim() !== '';
        break;
      case 'lastName':
        isValid = value.trim() !== '';
        break;
      case 'displayName':
        isValid = value.trim() !== '';
        break;
      case 'profileImage':
        isValid = value !== null;
        break;
      case 'gigThumbnails':
        isValid = value.some(thumbnail => thumbnail !== null);
        break;
      case 'description':
        isValid = value.length >= 150;
        break;
      default:
        isValid = false;
    }

    setValidation(prev => ({
      ...prev,
      [field]: isValid
    }));
  };

  // Check all validations and notify parent component
  useEffect(() => {
    const isFormValid = Object.values(validation).every(v => v === true);
    if (onValidationChange) {
      onValidationChange(isFormValid);
    }
  }, [validation, onValidationChange]);

  // Initial validation for fields with default values
  useEffect(() => {
    validateField('firstName', firstName);
    validateField('lastName', lastName);
    validateField('displayName', displayName);
    validateField('profileImage', profileImage);
    validateField('gigThumbnails', gigThumbnails);
    validateField('description', description);
  }, []);

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
            className={`${styles.input} ${!validation.firstName && firstName !== '' ? styles.inputError : ''}`} 
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              validateField('firstName', e.target.value);
            }}
          />
          <input 
            type="text" 
            placeholder="Last Name" 
            className={`${styles.input} ${!validation.lastName && lastName !== '' ? styles.inputError : ''}`} 
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              validateField('lastName', e.target.value);
            }}
          />
        </div>
        {(!validation.firstName || !validation.lastName) && (firstName !== '' || lastName !== '') && (
          <p className={styles.errorText}>First and last name are required</p>
        )}
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
          className={`${styles.input} ${!validation.displayName && displayName !== '' ? styles.inputError : ''}`} 
          value={displayName}
          onChange={(e) => {
            setDisplayName(e.target.value);
            validateField('displayName', e.target.value);
          }}
        />
        {!validation.displayName && displayName !== '' && (
          <p className={styles.errorText}>Display name is required</p>
        )}
      </div>

      <div className={styles.formField}>
        <label className={styles.label}>Profile Picture*</label>
        <p className={styles.fieldHelper}>
          Add a profile picture of yourself so customers will know exactly who 
          they'll be working with.
        </p>
        <div className={styles.profileImageContainer}>
          <div
            className={`${styles.profileImageUpload} ${!validation.profileImage && styles.imageError}`}
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
        {!validation.profileImage && (
          <p className={styles.errorText}>Profile picture is required</p>
        )}
      </div>
      
      <div className={styles.formField}>
        <label className={styles.label}>Gig thumbnails*</label>
        <p className={styles.fieldHelper}>
          Add a high-quality gig thumbnail to visually showcase your service and 
          grab buyers' attention instantly.
        </p>
        <div className={styles.thumbnailsWrapper}>
          <div className={styles.thumbnailContainer}>
            {gigThumbnails.slice(0, getVisibleThumbnailsCount()).map((thumbnail, index) => (
              <div
                key={index}
                className={`${styles.thumbnailUpload} ${!validation.gigThumbnails && index === 0 ? styles.imageError : ''}`}
                onClick={() => document.getElementById(`thumbnailInput${index}`).click()}
                style={{ backgroundImage: thumbnail ? `url(${thumbnail})` : 'none' }}
              >
                {!thumbnail && (
                  <div className={styles.uploadIcon}>
                    {index === 0 && gigThumbnails.every(t => t === null) ? (
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
                    ) : (
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
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    )}
                  </div>
                )}
                <input
                  id={`thumbnailInput${index}`}
                  type="file"
                  accept="image/*"
                  className={styles.hiddenInput}
                  onChange={(e) => handleGigThumbnailChange(index, e)}
                />
              </div>
            ))}
          </div>
          {!validation.gigThumbnails && (
            <p className={styles.errorText}>At least one thumbnail is required</p>
          )}
          {gigThumbnails.filter(t => t !== null).length >= 10 && (
            <p className={styles.thumbnailLimit}>Maximum of 10 thumbnails reached</p>
          )}
        </div>
      </div>

      <div className={styles.formField}>
        <label className={styles.label}>Description*</label>
        <textarea
          className={`${styles.textarea} ${!validation.description && description !== '' ? styles.inputError : ''}`}
          placeholder="Share a bit about your work experience, cool projects you've completed, and your area of expertise."
          value={description}
          onChange={handleDescriptionChange}
          maxLength={600}
        ></textarea>
        <div className={styles.charCount}>
          <span className={`${styles.minChars} ${descriptionChars < 150 ? styles.errorText : ''}`}>
            min. 150 characters
          </span>
          <span>{descriptionChars} / 600</span>
        </div>
        {!validation.description && description !== '' && (
          <p className={styles.errorText}>Description must be at least 150 characters</p>
        )}
      </div>

      <div className={styles.twoColumnGrid}>
        <div className={styles.formField}>
          <label className={styles.label}>Years of Experience*</label>
          <div className={styles.selectContainer}>
            <select
              className={styles.select}
              value={yearsExperience}
              onChange={(e) => setYearsExperience(e.target.value)}
            >
              {experienceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className={styles.selectArrow}></div>
          </div>
        </div>

        <div className={styles.formField}>
          <label className={styles.label}>Location*</label>
          <div className={styles.selectContainer}>
            <select
              className={styles.select}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {locationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className={styles.selectArrow}></div>
          </div>
        </div>
      </div>

      <div className={styles.formField}>
        <label className={styles.label}>Languages*</label>
        <p className={styles.fieldHelper}>
          Select which languages you can communicate in and your proficiency level.
        </p>

        <div className={styles.languageTableHeader}>
          <div>Language</div>
          <div>Level</div>
          <div></div>
        </div>

        {languages.map((lang, index) => (
          <div key={index} className={styles.languageRow}>
            <div className={styles.languageCol}>
              <input
                type="text"
                className={styles.input}
                value={lang.language}
                onChange={(e) => {
                  const newLanguages = [...languages];
                  newLanguages[index].language = e.target.value;
                  setLanguages(newLanguages);
                }}
                placeholder="Language"
              />
            </div>
            <div className={styles.levelCol}>
              <div className={styles.selectContainer}>
                <select
                  className={styles.select}
                  value={lang.level}
                  onChange={(e) => {
                    const newLanguages = [...languages];
                    newLanguages[index].level = e.target.value;
                    setLanguages(newLanguages);
                  }}
                >
                  {languageLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                <div className={styles.selectArrow}></div>
              </div>
            </div>
            <div className={styles.editCol}>
              <button className={styles.editButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}

        <button className={styles.addButton} onClick={addNewLanguage}>
          Add New
        </button>
      </div>
    </div>
  );
}