"use client"
import NavBar from "../../components/navbar2/Navbar";
import { useEffect, useState } from "react";
import React from "react";

export default function ClientCard() {
  const [clientData, setClientData] = useState({
    name: "Loading...",
    email: "Loading..."
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        // Get JWT token and email from localStorage
        const jwtToken = localStorage.getItem('jwtToken');
        const userEmail = localStorage.getItem('clientEmail'); // Assuming email is stored separately
        
        if (!jwtToken) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        // Option 1: If you have the email and name in localStorage from login response
        const userName = localStorage.getItem('clientName');
        if (userName && userEmail) {
          setClientData({
            name: userName,
            email: userEmail
          });
          setLoading(false);
          return;
        }
        
        setClientData({
          name: userData.name || userData.username || "N/A",
          email: userData.email || userEmail || "N/A"
        });
        
      } catch (err) {
        console.error('Error fetching client data:', err);
        setError(err.message);
        
        // Fallback to localStorage data if API fails
        const fallbackName = localStorage.getItem('name');
        const fallbackEmail = localStorage.getItem('email');
        
        if (fallbackName || fallbackEmail) {
          setClientData({
            name: fallbackName || "N/A",
            email: fallbackEmail || "N/A"
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, []);

  if (loading) {
    return (
      <div style={{ backgroundColor: "#e6e6e6", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <NavBar/>
        <div>Loading...</div>
      </div>
    );
  }

  if (error && !clientData.name) {
    return (
      <div style={{ backgroundColor: "#e6e6e6", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <NavBar/>
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#e6e6e6", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <NavBar/>
      <div style={{ position: "absolute", width: "100%", height: "150px", backgroundColor: "#2c3574", top: "calc(50% - 75px)", zIndex: 0 }}></div>

      <div style={{
        position: "relative",
        backgroundColor: "#f3f4f3",
        borderRadius: "10px",
        width: "350px",
        height:"400px",
        padding: "30px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginTop:"55px",
        zIndex: 1
      }}>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          {/* Avatar */}
          <div style={{ marginRight: "20px" }}>
            <img src="/assets/account.png" style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
            }} alt="Profile" />
          </div>

          {/* Client Info Section */}
          <div style={{ textAlign: "left", flex: 1 , marginTop:"20px"}}>
            <h2 style={{ margin: "5px 0", color: "#666769", fontSize: "22px" }}>{clientData.name}</h2>
          </div>
        </div>

        {/* Details Section */}
        <div style={{ textAlign: "left",  paddingTop: "15px",marginTop:"40px",marginLeft:"40px" }}>
          <DetailItem label="Email" value={clientData.email} />
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div style={{ marginBottom: "30px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div>
        <span style={{ color: "#ef9b5e", fontWeight: "bold" }}>{label} : </span>
        <span style={{ color: "#333" }}>{value}</span>
      </div>
    </div>
  );
}