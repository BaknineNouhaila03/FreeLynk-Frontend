"use client"
import Footer from "../../components/Footer/Footer";

import { useState, useEffect } from "react";
import NavBar from "../../components/navbar2/Navbar";

export default function FreelancerProfile() {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const freelancers = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        name: "Freelancer Name",
        rating: 5.0,
        reviews: 209,
        description: "Brief description about the freelancer",
        price: 35,
        category: "WEBSITE"
    }));
    const reviewStats = {
        total: 281,
        breakdown: [
            { stars: 5, count: 262 },
            { stars: 4, count: 15 },
            { stars: 3, count: 1 },
            { stars: 2, count: 0 },
            { stars: 1, count: 3 }
        ],
        ratings: [
            { category: "Seller communication level", score: 4.9 },
            { category: "Quality of delivery", score: 4.9 },
            { category: "Value of delivery", score: 4.9 }
        ]
    };

    const reviews = [
        {
            id: 1,
            name: "Client Name",
            stars: 5,
            date: "2 months ago",
            review: "I could not find what was my website's problem. He did some research and found problems. After that, he found a solution to a challenging issue",
            price: "US$50-US$100",
            duration: "5 days",
            service: "Webflow"
        },
        {
            id: 2,
            name: "Client Name",
            stars: 5,
            date: "2 months ago",
            review: "I could not find what was my website's problem. He did some research and found problems. After that, he found a solution to a challenging issue",
            price: "US$50-US$100",
            duration: "5 days",
            service: "Webflow"
        }
    ];

    useEffect(() => {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 768);
      };
  
      checkScreenSize(); // Run on mount
  
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Star component for consistent rendering
    const StarIcon = ({ filled }) => {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={filled ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: filled ? "#FFBF00" : "#d1d5db" }}
            >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
        );
    };

    useEffect(() => {
        // Function to update dimensions on resize
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
        };

        // Initial call
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <NavBar />
            <div style={{
                width: "100%",
                maxWidth: "1400px",
                margin: isMobile ? "100px auto 0" : "140px auto 0",
                padding: isMobile ? "20px 15px" : isTablet ? "30px 20px" : "37px 30px",
                backgroundColor: "rgb(230, 230, 230)",
                borderRadius: "10px",
                boxSizing: "border-box"
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    flexWrap: isTablet ? "wrap" : "nowrap",
                    gap: isMobile ? "20px" : "0",
                    backgroundColor: "rgb(243, 244, 243)",
                    padding: "20px",
                    borderRadius: "8px"
                }}>
                    {/* Left side - Profile info */}
                    <div style={{
                        display: "flex",
                        width: isMobile ? "100%" : isTablet ? "100%" : "45%",
                        marginBottom: isMobile || isTablet ? "20px" : "0"
                    }}>
                        <div style={{ marginRight: "20px" }}>
                            <img src="/assets/account2.png" style={{
                                width: isMobile ? "100px" : "125px",
                                height: isMobile ? "90px" : "110px",
                                borderRadius: "50%",
                            }} alt="Profile" />
                        </div>

                        <div style={{
                            textAlign: "left",
                            flex: 1,
                            marginTop: "5px"
                        }}>
                            <h2 style={{
                                margin: "2px 0",
                                color: "#666769",
                                fontSize: isMobile ? "18px" : "20px"
                            }}>Freelancer Name</h2>
                            <p style={{
                                marginRight: "8px",
                                color: "#878990",
                                fontSize: "12px",
                                display: "inline-block"
                            }}>Full Stack Developer</p>
                            <div style={{
                                fontWeight: "bold",
                                color: "#666769",
                                marginBottom: "12px",
                                display: "inline-block"
                            }}>
                                (3.0) <span style={{ color: "#f0c420" }}>★★★☆☆</span>
                            </div>
                            <br />
                            <div style={{
                                display: "flex",
                                gap: "10px",
                                flexWrap: "wrap"
                            }}>
                                <button style={{
                                    backgroundColor: "rgb(47, 60, 126, 0.83)",
                                    color: "white",
                                    padding: "8px 16px",
                                    borderRadius: "8px",
                                    border: "none",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    width: isMobile ? "100%" : "110px"
                                }}>
                                    Contact
                                </button>
                                <button style={{
                                    backgroundColor: "rgb(47, 60, 126, 0.83)",
                                    color: "white",
                                    padding: "8px 16px",
                                    borderRadius: "8px",
                                    border: "none",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    width: isMobile ? "100%" : "110px"
                                }}>
                                    Projects
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Vertical Line - Hidden on mobile */}
                    {!isMobile && (
                        <div style={{
                            width: "1px",
                            backgroundColor: "#ccc",
                            height: isMobile ? "1px" : isTablet ? "2px" : "110px",
                            marginRight: isTablet ? "0" : "30px",
                            display: isMobile ? "none" : isTablet ? "none" : "block"
                        }}></div>
                    )}

                    {/* Horizontal Line - Only on mobile and tablet */}
                    {(isMobile || isTablet) && (
                        <div style={{
                            width: "100%",
                            height: "1px",
                            backgroundColor: "#ccc",
                            margin: "10px 0"
                        }}></div>
                    )}

                    {/* Right side - Additional info */}
                    <div style={{
                        marginTop: isMobile ? "0" : isTablet ? "0" : "20px",
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        gap: isMobile ? "20px" : isTablet ? "50px" : "150px",
                        width: isMobile ? "100%" : isTablet ? "100%" : "auto",
                        flex: isMobile ? "1" : isTablet ? "1" : "1"
                    }}>
                        <div>
                            <p style={{
                                color: "#f2a469",
                                fontWeight: "600"
                            }}>Location:<span style={{
                                color: "black",
                                fontWeight: "400",
                                marginLeft: "10px"
                            }}>Morocco</span></p>
                            <p style={{
                                color: "#f2a469",
                                fontWeight: "600",
                                marginTop: isMobile ? "15px" : "30px"
                            }}>Experience:<span style={{
                                color: "black",
                                fontWeight: "400",
                                marginLeft: "10px"
                            }}>5 years</span></p>
                        </div>
                        <div>
                            <p style={{
                                color: "#f2a469",
                                fontWeight: "600",
                                marginBottom: isMobile ? "15px" : "30px"
                            }}>Languages:<span style={{
                                color: "black",
                                fontWeight: "400",
                                marginLeft: "10px"
                            }}>English</span></p>

                            {/* Social Media Icons */}
                            
                        </div>
                    </div>
                </div>
                <div>
                    <div style={{
                        display: "flex",
                        backgroundColor: "#e6e6e6",
                        fontFamily: "Arial, sans-serif",
                        flexWrap: "wrap",
                        gap: "20px",
                        marginTop: "30px",
                        width: "100%",
                        maxWidth: "1400px",
                        marginTop: "30px"
                    }}>
                        {/* Left Sidebar */}
                        
                        {/* Main Content Area */}
                        <div style={{
                            backgroundColor: "#f3f4f3",
                            borderRadius: "8px",
                            padding: "25px",
                            flex: "1",
                            minWidth: "300px",
                            maxWidth: "1400px",
                        }}>
                            {/* About Me Section */}
                            <div style={{ marginBottom: "30px" }}>
                                <h2 style={{
                                    color: "#3c4396",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginBottom: "15px"
                                }}>About me</h2>

                                <p style={{
                                    color: "#333",
                                    lineHeight: "1.6",
                                    fontSize: "15px",
                                    textAlign: "justify"
                                }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                                    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                                    mollit anim id est laborum.
                                </p>
                            </div>

                            <hr style={{
                                border: "none",
                                height: "1px",
                                backgroundColor: "#e0e0e0",
                                margin: "20px 0"
                            }} />

                            {/* Skills Section */}
                            <div>
                                <h2 style={{
                                    color: "#3c4396",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginBottom: "20px"
                                }}>Skills</h2>

                                <div style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "10px"
                                }}>
                                    {Array(10).fill("Web designer").map((skill, index) => (
                                        <div key={index} style={{
                                            border: "1px solid #e0e0e0",
                                            borderRadius: "20px",
                                            padding: "8px 20px",
                                            color: "#444",
                                            fontSize: "14px"
                                        }}>
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <hr style={{
                                border: "none",
                                height: "1px",
                                backgroundColor: "#e0e0e0",
                                margin: "20px 0"
                            }} />
                            <div>
                                <h2 style={{
                                    color: "#3c4396",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginBottom: "15px"
                                }}>My Gigs</h2>
                                <Section freelancers={freelancers} />
                            </div>
                            <hr style={{
                                border: "none",
                                height: "1px",
                                backgroundColor: "#e0e0e0",
                                margin: "20px 0"
                            }} />

                            <h2 style={{
                                fontSize: "22px",
                                fontWeight: "bold",
                                color: "#3c4396",
                                marginBottom: "4px",
                            }}>Reviews</h2>
                            <p style={{
                                fontSize: "14px",
                                color: "#718096",
                                marginBottom: "16px"
                            }}>{reviewStats.total} Reviews</p>
                            {/* Rating Breakdown */}
                            <div style={{
                                display: "flex",
                                flexDirection: isMobile ? "column" : "row",
                                gap: "40px",
                                marginBottom: "32px",
                            }}>
                                <div style={{
                                    width: window.innerWidth < 768 ? "100%" : "50%", height: "150px"
                                }}>
                                    {reviewStats.breakdown.map((item) => (
                                        <div key={item.stars} style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginBottom: "8px"
                                        }}>
                                            <span style={{
                                                width: "64px",
                                                fontSize: "14px",
                                                color: "#4a5568"
                                            }}>{item.stars} Stars</span>

                                            <div style={{
                                                flex: 1,
                                                marginLeft: "8px",
                                                marginRight: "8px"
                                            }}>
                                                <div style={{
                                                    backgroundColor: "#e2e8f0",
                                                    height: "8px",
                                                    borderRadius: "4px",
                                                    width: "100%",
                                                    position: "relative"
                                                }}>
                                                    <div style={{
                                                        backgroundColor: "#4a5568",
                                                        height: "8px",
                                                        borderRadius: "4px",
                                                        width: `${(item.count / reviewStats.total) * 100}%`
                                                    }}></div>
                                                </div>
                                            </div>

                                            <span style={{
                                                fontSize: "14px",
                                                color: "#718096",
                                                width: "40px"
                                            }}>({item.count})</span>
                                        </div>
                                    ))}
                                </div>

                                <div style={{
                                    width: window.innerWidth < 768 ? "100%" : "50%",
                                    marginTop: window.innerWidth < 768 ? "24px" : "0"
                                }}>
                                    <div style={{
                                        marginBottom: "12px",
                                        fontSize: "14px",
                                        color: "#4a5568"
                                    }}>Rating Breakdown</div>

                                    {reviewStats.ratings.map((rating, index) => (
                                        <div key={index} style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: "8px"
                                        }}>
                                            <span style={{
                                                fontSize: "14px",
                                                color: "#718096"
                                            }}>{rating.category}</span>

                                            <div style={{
                                                display: "flex",
                                                alignItems: "center"
                                            }}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    style={{ color: "black" }}
                                                >
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                </svg>
                                                <span style={{
                                                    marginLeft: "4px",
                                                    fontSize: "14px",
                                                    color: "#4a5568"
                                                }}>{rating.score}</span>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                            <div style={{
                                backgroundColor: "#f3f4f3",
                                padding: "24px",
                                borderRadius: "8px",
                                maxWidth: "800px",
                                fontFamily: "Arial, sans-serif"
                            }}>



                                <div style={{
                                    borderTop: "1px solid #e2e8f0",
                                    margin: "24px 0"
                                }}></div>

                                {/* Individual Reviews */}
                                {reviews.map((review) => (
                                    <div key={review.id} style={{
                                        marginBottom: "32px"
                                    }}>
                                        <div style={{
                                            display: "flex",
                                            alignItems: "flex-start"
                                        }}>
                                            <div style={{
                                                backgroundColor: "#d1d5db",
                                                width: "40px",
                                                height: "40px",
                                                borderRadius: "50%",
                                                marginRight: "12px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    style={{ color: "#4a5568" }}
                                                >
                                                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>

                                            <div>
                                                <div style={{
                                                    fontWeight: "500",
                                                    color: "#2d3748"
                                                }}>{review.name}</div>

                                                <div style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    marginTop: "4px"
                                                }}>
                                                    <div style={{
                                                        display: "flex",
                                                        color: "black"
                                                    }}>
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg
                                                                key={i}
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="14"
                                                                height="14"
                                                                viewBox="0 0 24 24"
                                                                fill="currentColor"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                                            </svg>
                                                        ))}
                                                    </div>
                                                    <span style={{
                                                        marginLeft: "8px",
                                                        fontSize: "12px",
                                                        color: "#718096"
                                                    }}>{review.date}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p style={{
                                            fontSize: "14px",
                                            color: "#4a5568",
                                            marginTop: "12px",
                                            marginBottom: "30px"
                                        }}>{review.review}</p>

                                        <div style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            alignItems: "center",
                                            marginTop: "16px"
                                        }}>
                                            <div style={{
                                                marginRight: "24px",
                                                marginBottom: "8px"
                                            }}>
                                                <div style={{
                                                    fontSize: "12px",
                                                    color: "#718096"
                                                }}>Price</div>
                                                <div style={{
                                                    fontSize: "14px",
                                                    fontWeight: "500"
                                                }}>{review.price}</div>
                                            </div>

                                            <div style={{
                                                marginRight: "24px",
                                                marginBottom: "8px"
                                            }}>
                                                <div style={{
                                                    fontSize: "12px",
                                                    color: "#718096"
                                                }}>Duration</div>
                                                <div style={{
                                                    fontSize: "14px",
                                                    fontWeight: "500"
                                                }}>{review.duration}</div>
                                            </div>

                                            <div style={{
                                                display: "flex",
                                                alignItems: "center",
                                                backgroundColor: "white",
                                                padding: "8px",
                                                borderRadius: "5px"
                                            }}>
                                                <div><img src="/assets/Client.jpg" style={{ width: "30px", height: "20px", marginRight: "10px" }}></img></div>
                                                <span style={{
                                                    fontSize: "10px",
                                                    color: "#b2b2b2"
                                                }}>{review.service}</span>
                                            </div>
                                        </div>

                                        <div style={{
                                            borderTop: "1px solid #e2e8f0",
                                            margin: "24px 0"
                                        }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>

            </div>

            <div style={{ backgroundColor: "#2f3c7e", marginTop: "50px" }}>
                <Footer />
            </div>

        </div>
    );
}
const FreelancerCard = ({ freelancer }) => (
    <div style={{
        minWidth: "240px",
    }}>
        <div style={{ height: "140px", position: "relative" }}>
            <img src="/assets/Client.jpg" alt="freelancer" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            </div>
            <p style={{ fontSize: "14px", color: "#666", marginBottom: "6px" }}>{freelancer.description}</p>
            <p style={{ fontSize: "14px", color: "#444", fontWeight: "500" }}>From ${freelancer.price}</p>
        </div>
    </div>
);
const Section = ({ title, freelancers }) => (
    <div style={{ marginTop: "40px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "20px", color: "#4a4a4a" }}>{title}</h2>
        <div style={{
            display: "flex",
            overflowX: "auto",
            gap: "16px",
            paddingBottom: "10px",
            scrollBehavior: "smooth",
            msOverflowStyle: "none", // IE
            scrollbarWidth: "none"
        }}>
            {freelancers.map(freelancer => (
                <FreelancerCard key={freelancer.id} freelancer={freelancer} />
            ))}
        </div>
    </div>
);