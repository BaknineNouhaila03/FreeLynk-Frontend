"use client"
import { useState } from 'react';
import styles from './ProfilePage.module.css';
import PersonalInfo from './steps/PersonalInfo';
import ProfessionalInfo from './steps/ProfessionalInfo';
import AccountSecurity from './steps/AccountSecurity';

export default function ProfilePage() {
  const [activeStep, setActiveStep] = useState(1);
  const [completionRate, setCompletionRate] = useState(30);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleContinue = () => {
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
      setCompletionRate(completionRate + 35);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
      <img src='images/image.png' className={styles.logo}></img>
      </header>
      
      <main className={styles.main}>
        <div className={styles.progressSteps}>
          <div className={`${styles.step} ${activeStep >= 1 ? styles.active : ''}`} onClick={() => handleStepChange(1)}>
            <span className={styles.stepNumber}>1</span>
            <span className={styles.stepLabel}>Personal Info</span>
          </div>
          <div className={`${styles.step} ${activeStep >= 2 ? styles.active : ''}`} onClick={() => handleStepChange(2)}>
            <span className={styles.stepNumber}>2</span>
            <span className={styles.stepLabel}>Professional Info</span>
          </div>
          <div className={`${styles.step} ${activeStep >= 3 ? styles.active : ''}`} onClick={() => handleStepChange(3)}>
            <span className={styles.stepNumber}>3</span>
            <span className={styles.stepLabel}>Account Security</span>
          </div>
          
          <div className={styles.completionRate}>
            <span>Completion Rate: {completionRate}%</span>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: `${completionRate}%` }}></div>
            </div>
          </div>
        </div>

        {activeStep === 1 && <PersonalInfo />}
        {activeStep === 2 && <ProfessionalInfo />}
        {activeStep === 3 && <AccountSecurity />}
        
        <div className={styles.buttonContainer}>
          <button className={styles.continueButton} onClick={handleContinue}>
            Continue
          </button>
        </div>
      </main>
    </div>
  );
}