"use client";

import { useState } from "react";
import styles from "./signin.module.css";
import ResetPassword from "../ResetPassword/ResetPassword"; // Import the ResetPassword component

export default function LoginForm({ onClose }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false); // New state for reset password modal

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

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setShowResetPassword(true);
    };

    const handleResetPasswordClose = () => {
        setShowResetPassword(false);
    };

    // If showing reset password, return that component instead
    if (showResetPassword) {
        return <ResetPassword onClose={handleResetPasswordClose} />;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.signUpModal}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.title}>Sign In</h1>
                    <button className={styles.closeButton} onClick={onClose}>✕</button>
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
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label htmlFor="password" className={styles.formLabel} style={{ fontWeight: "bold" }}>
                                Password
                            </label>
                            <a href="#" style={{ fontSize: '12px', textDecoration: 'underline' }} onClick={handleForgotPassword}>
                                Forgot Password?
                            </a>
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className={styles.formInput}
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
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
                        Sign In
                    </button>

                    <div className={styles.divider}>
                        <span className={styles.dividerLine}></span>
                        <span className={styles.dividerText}>or</span>
                        <span className={styles.dividerLine}></span>
                    </div>

                    <button type="button" className={styles.googleButton}>
                        <img src="assets/image.png" style={{ height: "18px", width: "18px" }} />
                        Continue with google
                    </button>
                </form>
            </div>
        </div>
    );
}