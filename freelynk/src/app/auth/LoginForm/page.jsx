"use client";

import { useState } from "react";
import styles from "./signin.module.css";
import Image from "next/image";

export default function LoginForm() {
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
        <div className={styles.modalOverlay} style={{ marginTop: "500px" }}>
            <div className={styles.signUpModal}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.title}>Sign In</h1>
                    <button className={styles.closeButton}>✕</button>
                </div>

                <p className={styles.accountText}>
                    Don't have an account: <a href="#" className={styles.signInLink}>Sign Up</a>
                </p>

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
                            <a href="#" style={{ fontSize: '12px', textDecoration: 'underline' }}>
                                Forgot Password?
                            </a>
                        </div>
                        <input
                            type="email"
                            id="email"
                            className={styles.formInput}
                            placeholder="Enter Email address"
                            value={formData.email}
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