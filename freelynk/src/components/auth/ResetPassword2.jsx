"use client";

import { useState } from "react";
import styles from "./signup.module.css";
import Image from "next/image";

export default function ResetPassword2() {
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
      <div className={styles.signUpModal} style={{height:"230px"}}>
        <div className={styles.modalHeader}>
          <h1 className={styles.title} style={{marginBottom:"30px"}}>Reset Your Password</h1>
          <button className={styles.closeButton} style={{marginBottom:"30px"}} >✕</button>
        </div>
        
        <div style={{textAlign:"center",width:"500px",marginLeft:"60px"}}>
            <p>An email has been sent to “email” If this email address is registered to FreeLynk.ma, you'll receive instructions on how to set a new password.</p>
            <p style={{marginTop:"40px",color:"#2d3a8c"}} ><u>Didn't get an email ?</u></p>
        </div>
      </div>
    </div>
  );
}