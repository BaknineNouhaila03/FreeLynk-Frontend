"use client"
import { useState } from 'react';
import styles from './ProfessionalInfo.module.css';

export default function ProfessionalInfo() {
  const [gigThumbnails, setGigThumbnails] = useState([null, null]);
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
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    setDescription(text);
    setDescriptionChars(text.length);
  };

  // Just for demonstration - in real app would fetch from API
  const experienceOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '10+'];
  const locationOptions = ['Morocco', 'United States', 'France', 'United Kingdom', 'Canada', 'Germany'];
  const languageLevels = ['Basic', 'Conversational', 'Fluent', 'Native/Bilingual'];

  const addNewLanguage = () => {
    setLanguages([...languages, { language: '', level: 'Basic' }]);
  };

  return (
    <div className={styles.professionalInfoContainer}>
      <div className={styles.formField}>
        <label className={styles.label}>Gig thumbnails*</label>
        <p className={styles.fieldHelper}>
          Add a high-quality gig thumbnail to visually showcase your service and 
          grab buyers' attention instantly.
        </p>
        <div className={styles.thumbnailContainer}>
          {gigThumbnails.map((thumbnail, index) => (
            <div
              key={index}
              className={styles.thumbnailUpload}
              onClick={() => document.getElementById(`thumbnailInput${index}`).click()}
              style={{ backgroundImage: thumbnail ? `url(${thumbnail})` : 'none' }}
            >
              {!thumbnail && (
                <div className={styles.uploadIcon}>
                  {index === 0 ? (
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
      </div>

      <div className={styles.formField}>
        <label className={styles.label}>Description*</label>
        <textarea
          className={styles.textarea}
          placeholder="Share a bit about your work experience, cool projects you've completed, and your area of expertise."
          value={description}
          onChange={handleDescriptionChange}
          maxLength={600}
        ></textarea>
        <div className={styles.charCount}>
          <span className={styles.minChars}>min. 150 characters</span>
          <span>{descriptionChars} / 600</span>
        </div>
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