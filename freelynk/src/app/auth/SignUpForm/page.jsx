"use client";

import { useState } from "react";
import styles from "./signup.module.css";
import Image from "next/image";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.modalOverlay} style={{marginTop:"500px"}}>
      <div className={styles.signUpModal}>
        <div className={styles.modalHeader}>
          <h1 className={styles.title}>Sign Up</h1>
          <button className={styles.closeButton}>✕</button>
        </div>
        
        <p className={styles.accountText}>
          Already have an account: <a href="#" className={styles.signInLink}>Sign In</a>
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="firstName" className={styles.formLabel} style={{fontWeight:"bold"}}>First Name</label>
              <input
                type="text"
                id="firstName"
                className={styles.formInput}
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleChange}
                style={{marginBottom:"1px"}}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="lastName" className={styles.formLabel} style={{fontWeight:"bold"}}>Last Name</label>
              <input
                type="text"
                id="lastName"
                className={styles.formInput}
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel} style={{fontWeight:"bold"}}>Email address</label>
            <input
              type="email"
              id="email"
              className={styles.formInput}
              placeholder="Enter Email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel} style={{fontWeight:"bold"}}>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={styles.formInput}
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.formLabel} style={{fontWeight:"bold"}}>Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                className={styles.formInput}
                placeholder="Repeat Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={togglePasswordVisibility}
              className={styles.checkbox}
            />
            <label htmlFor="showPassword" className={styles.checkboxLabel} style={{fontWeight:"bold"}}>Show password</label>
          </div>
          
          <button type="submit" className={styles.signUpButton}>
            Sign Up
          </button>
          
          <div className={styles.divider}>
            <span className={styles.dividerLine}></span>
            <span className={styles.dividerText}>or</span>
            <span className={styles.dividerLine}></span>
          </div>
          
          <button type="button" className={styles.googleButton}>
            <img src="assets/image.png" style={{height:"18px",width:"18px"}}/>
            Continue with google
          </button>
          
          <p className={styles.termsText}>
            By Signing Up you accept our <a href="#" className={styles.termsLink}>Privacy Policy and Terms of Services</a>
          </p>
        </form>
      </div>
    </div>
  );
}