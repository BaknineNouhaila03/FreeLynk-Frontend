"use client";

import { useState } from "react";
import styles from "./signup.module.css";
import Image from "next/image";

export default function ResetPassword() {
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
      <div className={styles.signUpModal} style={{height:"250px"}}>
        <div className={styles.modalHeader}>
          <h1 className={styles.title} style={{marginBottom:"30px"}}>Reset Your Password</h1>
          <button className={styles.closeButton} style={{marginBottom:"30px"}} >✕</button>
        </div>
        
        <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.formLabel} style={{ fontWeight: "bold" }}>Email address</label>
                        <input
                            type="email"
                            id="email"
                            className={styles.formInput}
                            placeholder="Enter Email address"
                            value={formData.email}
                            onChange={handleChange}
                            style={{marginBottom:"20px"}}
                        />
                    </div>

          
          <button type="submit" className={styles.signUpButton}>
            Next
          </button>
        </form>
      </div>
    </div>
  );
}