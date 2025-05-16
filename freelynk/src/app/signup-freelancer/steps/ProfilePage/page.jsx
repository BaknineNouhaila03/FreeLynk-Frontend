"use client"
import { useState, useEffect } from 'react';
import styles from './ProfilePage.module.css';
import PersonalInfo from './steps/PersInfo/PersonalInfo';
import ProfessionalInfo from './steps/ProfInfo/page';
import AccountSecurity from './steps/AccSec/page';

export default function ProfilePage() {
  const [activeStep, setActiveStep] = useState(1);
  const [completionRate, setCompletionRate] = useState(30);
  const [stepsValidation, setStepsValidation] = useState({
    step1: false,
    step2: true, // Assume these are valid by default for this example
    step3: false  // Changed to false since we now validate this step
  });

  // Update completion rate when steps validation changes
  useEffect(() => {
    calculateCompletionRate();
  }, [stepsValidation]);

  const calculateCompletionRate = () => {
    const validSteps = Object.values(stepsValidation).filter(Boolean).length;
    const totalSteps = Object.keys(stepsValidation).length;
    const newCompletionRate = Math.round((validSteps / totalSteps) * 100);
    setCompletionRate(newCompletionRate);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleContinue = () => {
    if (activeStep < 3 && isCurrentStepValid()) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleStepValidation = (step, isValid) => {
    setStepsValidation(prev => ({
      ...prev,
      [`step${step}`]: isValid
    }));
  };

  const isCurrentStepValid = () => {
    return stepsValidation[`step${activeStep}`];
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src='images/image.png' className={styles.logo} alt="Logo" />
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

        {activeStep === 1 && <PersonalInfo onValidationChange={(isValid) => handleStepValidation(1, isValid)} />}
        {activeStep === 2 && <ProfessionalInfo onValidationChange={(isValid) => handleStepValidation(2, isValid)} />}
        {activeStep === 3 && <AccountSecurity onValidationChange={(isValid) => handleStepValidation(3, isValid)} />}
        
        <div className={styles.buttonContainer}>
          <button 
            className={isCurrentStepValid() ? styles.continueButton : `${styles.continueButton} ${styles.disabledButton}`} 
            onClick={handleContinue}
            disabled={!isCurrentStepValid()}
          >
            {activeStep < 3 ? 'Continue' : 'Submit'}
          </button>
        </div>
      </main>
    </div>
  );
}