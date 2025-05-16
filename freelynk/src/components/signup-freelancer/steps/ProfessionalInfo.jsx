"use client"
import { useState, useEffect } from 'react';
import styles from './ProfessionalInfo.module.css';

export default function ProfessionalInfo({ onValidationChange }) {
  const [occupation, setOccupation] = useState('Graphics & Design');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Beginner');
  
  const [education, setEducation] = useState([]);
  const [newEducation, setNewEducation] = useState({
    country: '',
    university: '',
    title: '',
    major: '',
    year: ''
  });

  const [certifications, setCertifications] = useState([]);
  const [newCertification, setNewCertification] = useState({
    certificate: '',
    provider: '',
    year: ''
  });

  // Sample options for dropdowns
  const occupationOptions = [
    'Graphics & Design',
    'Web Development',
    'Digital Marketing',
    'Writing & Translation',
    'Video & Animation',
    'Music & Audio',
    'Programming & Tech',
    'Business',
    'Data'
  ];

  const skillLevelOptions = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const titleOptions = ['Bachelor', 'Master', 'PhD', 'Associate', 'Certificate'];
  const yearOptions = Array.from({ length: 50 }, (_, i) => (new Date()).getFullYear() - i);

  // Check if mandatory fields are filled and update parent component
  useEffect(() => {
    const isValid = occupation && skills.length > 0;
    if (onValidationChange) {
      onValidationChange(isValid);
    }
  }, [occupation, skills, onValidationChange]);

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, { skill: newSkill, level: newSkillLevel }]);
      setNewSkill('');
      setNewSkillLevel('Beginner');
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const addEducation = () => {
    if (newEducation.university && newEducation.major) {
      setEducation([...education, newEducation]);
      setNewEducation({
        country: '',
        university: '',
        title: '',
        major: '',
        year: ''
      });
    }
  };

  const addCertification = () => {
    if (newCertification.certificate && newCertification.provider) {
      setCertifications([...certifications, newCertification]);
      setNewCertification({
        certificate: '',
        provider: '',
        year: ''
      });
    }
  };

  return (
    <div className={styles.professionalInfoContainer}>
      <h2 className={styles.sectionTitle}>Professional Info</h2>
      <p className={styles.sectionDescription}>
        This is your time to shine. Let potential buyers know what you do 
        best and how you gained your skills, certifications and 
        experience.
      </p>
      <p className={styles.mandatoryNote}>* Mandatory fields</p>

      {/* Occupation Section */}
      <div className={styles.formField}>
        <label className={styles.label}>Your Occupation*</label>
        <div className={styles.selectContainer}>
          <select
            className={styles.select}
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          >
            {occupationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className={styles.selectArrow}></div>
        </div>
      </div>

      {/* Skills Section */}
      <div className={styles.formField}>
        <label className={styles.label}>Skills*</label>
        {skills.length === 0 && (
          <p className={styles.validationError}>Please add at least one skill</p>
        )}
        
        <div className={styles.skillTableHeader}>
          <div>Skill</div>
          <div>Level</div>
          <div></div>
        </div>

        {skills.map((skill, index) => (
          <div key={index} className={styles.skillRow}>
            <div>{skill.skill}</div>
            <div>{skill.level}</div>
            <div className={styles.editCol}>
              <button 
                className={styles.editButton}
                onClick={() => removeSkill(index)}
                title="Remove skill"
              >
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
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"></path>
                  <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          </div>
        ))}

        <div className={styles.addSkillRow}>
          <input
            type="text"
            className={styles.input}
            placeholder="Add a skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <div className={styles.selectContainer}>
            <select
              className={styles.select}
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(e.target.value)}
            >
              {skillLevelOptions.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            <div className={styles.selectArrow}></div>
          </div>
          <button className={styles.addButton} onClick={addSkill}>
            Add
          </button>
        </div>
      </div>

      {/* Education Section */}
      <div className={styles.sectionDivider}></div>
      <div className={styles.formField}>
        <h3 className={styles.subSectionTitle}>Education</h3>
        
        {education.map((edu, index) => (
          <div key={index} className={styles.educationItem}>
            <div className={styles.eduHeader}>
              <span className={styles.eduDegree}>{edu.title} in {edu.major}</span>
              <span className={styles.eduYear}>{edu.year}</span>
            </div>
            <div className={styles.eduUniversity}>{edu.university}, {edu.country}</div>
          </div>
        ))}

        <div className={styles.addEducationForm}>
          <div className={styles.twoColumnGrid}>
            <div className={styles.selectContainer}>
              <select
                className={styles.select}
                value={newEducation.country}
                onChange={(e) => setNewEducation({...newEducation, country: e.target.value})}
              >
                <option value="" disabled>Country of College/University</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Morocco">Morocco</option>
                {/* Add more countries as needed */}
              </select>
              <div className={styles.selectArrow}></div>
            </div>
            
            <input
              type="text"
              className={styles.input}
              placeholder="College/University Name"
              value={newEducation.university}
              onChange={(e) => setNewEducation({...newEducation, university: e.target.value})}
            />
          </div>

          <div className={styles.threeColumnGrid}>
            <div className={styles.selectContainer}>
              <select
                className={styles.select}
                value={newEducation.title}
                onChange={(e) => setNewEducation({...newEducation, title: e.target.value})}
              >
                <option value="" disabled>Title</option>
                {titleOptions.map((title) => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </select>
              <div className={styles.selectArrow}></div>
            </div>
            
            <input
              type="text"
              className={styles.input}
              placeholder="Major"
              value={newEducation.major}
              onChange={(e) => setNewEducation({...newEducation, major: e.target.value})}
            />
            
            <div className={styles.selectContainer}>
              <select
                className={styles.select}
                value={newEducation.year}
                onChange={(e) => setNewEducation({...newEducation, year: e.target.value})}
              >
                <option value="" disabled>Year</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <div className={styles.selectArrow}></div>
            </div>
          </div>
          
          <button className={styles.grayAddButton} onClick={addEducation}>
            Add
          </button>
        </div>
      </div>

      {/* Certification Section */}
      <div className={styles.sectionDivider}></div>
      <div className={styles.formField}>
        <h3 className={styles.subSectionTitle}>Certification</h3>
        <p className={styles.fieldHelper}>
          Include any certificates or awards that are relevant to the services you're offering.
        </p>
        
        {certifications.map((cert, index) => (
          <div key={index} className={styles.certItem}>
            <div className={styles.certTitle}>{cert.certificate}</div>
            <div className={styles.certDetails}>
              {cert.provider} • {cert.year}
            </div>
          </div>
        ))}

        <div className={styles.addCertForm}>
          <div className={styles.twoColumnGrid}>
            <input
              type="text"
              className={styles.input}
              placeholder="Certificate or Award"
              value={newCertification.certificate}
              onChange={(e) => setNewCertification({...newCertification, certificate: e.target.value})}
            />
            
            <input
              type="text"
              className={styles.input}
              placeholder="Certified From (e.g. Adobe)"
              value={newCertification.provider}
              onChange={(e) => setNewCertification({...newCertification, provider: e.target.value})}
            />
          </div>

          <div className={styles.certYearButtonRow}>
            <div className={styles.selectContainer} style={{ width: '150px' }}>
              <select
                className={styles.select}
                value={newCertification.year}
                onChange={(e) => setNewCertification({...newCertification, year: e.target.value})}
              >
                <option value="" disabled>Year</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <div className={styles.selectArrow}></div>
            </div>
            
            <button className={styles.grayAddButton} onClick={addCertification}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}