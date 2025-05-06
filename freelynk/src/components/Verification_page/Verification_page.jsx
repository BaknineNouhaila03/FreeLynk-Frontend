"use client"
import React, { useState } from "react";
import NavBar from "../Navbar/Navbar";

export default function VerificationPage() {
  const [backImage, setBackImage] = useState(null);
  const [frontImage, setFrontImage] = useState(null);

  const handleBackImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setBackImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleFrontImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFrontImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div style={{ backgroundColor: "#e6e6e6", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <NavBar />
      <div style={{ position: "absolute", width: "100%", height: "150px", backgroundColor: "#2c3574", top: "calc(50% - 75px)", zIndex: 0 }}></div>

      <div style={{
        position: "relative",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        width: "550px",
        padding: "40px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        zIndex: 1,
        textAlign: "center"
      }}>
        <h1 style={{ 
          fontSize: "28px", 
          fontWeight: "bold", 
          marginBottom: "10px", 
          textAlign: "left" 
        }}>
          <span style={{ color: "#2c3574" }}>Get</span>
          <span style={{ color: "#6b7280" }}> verified</span>
        </h1>
        
        <p style={{ 
          textAlign: "left", 
          color: "#6b7280", 
          marginBottom: "30px",
          fontSize: "16px"
        }}>
          Upload your <span style={{ color: "#ef9b5e" }}>identity</span> card scans
        </p>

        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          marginBottom: "30px"
        }}>
          {/* Back ID Upload */}
          <div>
            <label htmlFor="back-id-upload" style={{
              display: "block",
              width: "220px",
              height: "150px",
              backgroundColor: "#4b4f54",
              borderRadius: "5px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px"
            }}>
              {backImage ? (
                <img src={backImage} alt="Back ID" style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "5px" }} />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 16 16">
                  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
                  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                </svg>
              )}
              <input
                type="file"
                id="back-id-upload"
                accept="image/*"
                onChange={handleBackImageChange}
                style={{ display: "none" }}
              />
            </label>
            <div style={{ color: "#6b7280", fontSize: "14px" }}>Back label</div>
          </div>

          {/* Front ID Upload */}
          <div>
            <label htmlFor="front-id-upload" style={{
              display: "block",
              width: "220px",
              height: "150px",
              backgroundColor: "#4b4f54",
              borderRadius: "5px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "10px"
            }}>
              {frontImage ? (
                <img src={frontImage} alt="Front ID" style={{ maxWidth: "100%", maxHeight: "100%", borderRadius: "5px" }} />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 16 16">
                  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
                  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                </svg>
              )}
              <input
                type="file"
                id="front-id-upload"
                accept="image/*"
                onChange={handleFrontImageChange}
                style={{ display: "none" }}
              />
            </label>
            <div style={{ color: "#6b7280", fontSize: "14px" }}>Front label</div>
          </div>
        </div>

        <button style={{
          backgroundColor: "#2c3574",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "16px"
        }}>
          Get Verified
        </button>
      </div>
    </div>
  );
}