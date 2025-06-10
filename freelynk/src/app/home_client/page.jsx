"use client";
import { useState, useEffect } from "react";
import NavBar from "../../components/navbar2/Navbar";
import Footer from "../../components/Footer/Footer";
import { FiPlus, FiFolder, FiGlobe } from "react-icons/fi";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { FiBookmark } from "react-icons/fi";
import { BsBookmarkFill } from "react-icons/bs";


export default function Home_client() {
    const [clientName, setClientName] = useState("Client");
    const [freelancers, setFreelancers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clientId, setClientId] = useState(null);

    useEffect(() => {
        const storedName = localStorage.getItem("clientName");
        if (storedName) {
            setClientName(storedName);
        }
    }, []);

    // Get client ID on component mount
    useEffect(() => {
        const getClientId = async () => {
            try {
                const clientEmail = localStorage.getItem('clientEmail');
                if (clientEmail) {
                    const response = await fetch(`http://localhost:8081/api/clients/email/${clientEmail}`);
                    if (response.ok) {
                        const client = await response.json();
                        setClientId(client.id);
                    }
                }
            } catch (error) {
                console.error('Error getting client ID:', error);
            }
        };

        getClientId();
    }, []);

    useEffect(() => {
        const fetchFreelancers = async () => {
            try {
                const response = await fetch('http://localhost:8081/api/freelancers');
                if (!response.ok) {
                    throw new Error('Failed to fetch freelancers');
                }
                const data = await response.json();

                // If we have a client ID, check which freelancers are bookmarked
                if (clientId) {
                    const bookmarkedResponse = await fetch(`http://localhost:8081/api/savedFreelancers/check?clientId=${clientId}`);
                    if (bookmarkedResponse.ok) {
                        const bookmarkedIds = await bookmarkedResponse.json();
                        const freelancersWithBookmarks = data.map(freelancer => ({
                            ...freelancer,
                            isBookmarked: bookmarkedIds.includes(freelancer.id)
                        }));
                        setFreelancers(freelancersWithBookmarks);
                    } else {
                        // If bookmark check fails, just set freelancers without bookmark status
                        setFreelancers(data.map(freelancer => ({ ...freelancer, isBookmarked: false })));
                    }
                } else {
                    setFreelancers(data.map(freelancer => ({ ...freelancer, isBookmarked: false })));
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFreelancers();
    }, [clientId]); // Re-fetch when clientId is available

    const handleBookmarkToggle = async (freelancerId, isCurrentlyBookmarked) => {
        if (!clientId) {
            console.error('Client ID not available');
            return;
        }

        try {
            if (isCurrentlyBookmarked) {
                const response = await fetch(`http://localhost:8081/api/savedFreelancers/remove?clientId=${clientId}&freelancerId=${freelancerId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }                });

                if (!response.ok) {
                    throw new Error('Failed to remove freelancer');
                }
            } else {
                const response = await fetch(`http://localhost:8081/api/savedFreelancers/save?clientId=${clientId}&freelancerId=${freelancerId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to save freelancer');
                }
            }

            // Update local state
            setFreelancers(prevFreelancers =>
                prevFreelancers.map(freelancer =>
                    freelancer.id === freelancerId
                        ? { ...freelancer, isBookmarked: !isCurrentlyBookmarked }
                        : freelancer
                )
            );
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    const categories = [
        {
            image: "/assets/web-development.png",
            title: "Web and App development",
            description: "Build custom websites, web apps, and mobile solutions tailored to your needs.",
        },
        {
            image: "/assets/design.png",
            title: "Graphic & UI/UX design",
            description: "Create eye-catching visuals and user-friendly designs that elevate your brand.",
        },
        {
            image: "/assets/translation.png",
            title: "Writing and translation",
            description: "Get professional content, from blog posts to accurate translations and edits.",
        },
        {
            image: "/assets/digital-marketing.png",
            title: "Digital Marketing",
            description: "Boost your online presence with targeted strategies and optimized campaigns.",
        },
        {
            image: "/assets/video-editing.png",
            title: "Video & Animation Services",
            description: "Engage your audience with creative videos, animations, and editing services.",
        },
        {
            image: "/assets/digital-assistant.png",
            title: "Business & Virtual Assistance",
            description: "Streamline your operations with expert support in admin, research, and more.",
        },
    ];

    return (
        <div className="font-inter" style={{ backgroundColor: "#e6e6e6", minHeight: "100vh" }}>
            <NavBar />
            <HeaderSection clientName={clientName} />
            <div className="container" style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
                <ActionButtons />
                <Section
                    title="Recommended for you"
                    freelancers={freelancers}
                    onBookmarkToggle={handleBookmarkToggle}
                />
                <CategorySection categories={categories} />
            </div>
            <div style={{ backgroundColor: "#2f3c7e", marginTop: "50px" }}>
                <Footer />
            </div>
        </div>
    );
}

const HeaderSection = ({ clientName }) => {
    console.log("HeaderSection received clientName:", JSON.stringify(clientName));

    return (
        <div style={{ backgroundColor: "#2f3c7e", color: "white", padding: "60px 20px", marginTop: "70px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <h1 style={{ fontSize: "32px", fontWeight: "bold", textShadow: "1px 1px 1px white" }}>
                    WELCOME, {clientName}!
                </h1>
                <br></br>
                <p>Ready to find the perfect freelancer for your next big idea? Let's make it happen.</p>
            </div>
        </div>
    );
};

const ActionButtons = () => {
    const router = useRouter();
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const buttons = [
        { icon: <FiPlus />, label: "Add a new project", path: "/AddProject" },
        { icon: <FiGlobe />, label: "My Projects", path: "/MyProjects" }
    ];

    const isSmallScreen = windowWidth < 640;

    return (
        <div style={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            gap: "16px",
            marginTop: "20px",
            padding: "0 16px",
            width: "100%"
        }}>
            {buttons.map((btn, index) => (
                <button
                    key={index}
                    onClick={() => router.push(btn.path)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        backgroundColor: "#f2a469",
                        color: "white",
                        borderRadius: "12px",
                        padding: "12px 16px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        border: "none",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                        width: isSmallScreen ? "100%" : "auto",
                        flex: isSmallScreen ? "none" : "1"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#e89355"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#f2a469"}
                >
                    <span style={{ display: "flex", alignItems: "center" }}>{btn.icon}</span>
                    <span>{btn.label}</span>
                </button>
            ))}
        </div>
    );
};

const Section = ({ title, freelancers, onBookmarkToggle }) => (
    <div style={{ marginTop: "40px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "20px", color: "#4a4a4a" }}>{title}</h2>
        <div style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
            paddingBottom: "10px",
            scrollBehavior: "smooth",
            msOverflowStyle: "none",
            scrollbarWidth: "none"
        }}>
            {freelancers.map(freelancer => (
                <FreelancerCard
                    key={freelancer.id}
                    freelancer={freelancer}
                    onBookmarkToggle={onBookmarkToggle}
                />
            ))}
        </div>
    </div>
);

const FreelancerCard = ({ freelancer, onBookmarkToggle }) => {
    const handleBookmarkClick = async () => {
        if (onBookmarkToggle) {
            await onBookmarkToggle(freelancer.id, freelancer.isBookmarked);
        }
    };

    return (
        <div style={{
            minWidth: "300px",
            maxWidth: "300px",
            flex: "0 0 240px",
            backgroundColor: "white",
            borderRadius: "3px",
            overflow: "hidden"
        }}>
            <div style={{ height: "150px", position: "relative" }}>
                <img
                    src={freelancer.imageUrl || "/assets/Client.jpg"}
                    alt="freelancer"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }}
                />
                <button
                    onClick={handleBookmarkClick}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "transparent",
                        border: "none",
                        borderRadius: "50%",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                    }}
                >
                    {freelancer.isBookmarked ? (
                        <BsBookmarkFill style={{ fontSize: "18px", color: "black" }} />
                    ) : (
                        <FiBookmark style={{ fontSize: "18px", color: "#666" }} />
                    )}
                </button>
            </div>
            <div style={{ padding: "0px 16px 10px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
                    <img
                        src={freelancer.avatarUrl || "/assets/profile_image.jpg"}
                        alt="avatar"
                        style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            marginRight: "8px"
                        }}
                    />
                    {/* Updated Link to include freelancer ID */}
                    <Link href={`/Freelancer_profile/${freelancer.id}`} passHref>
                        <div style={{
                            fontSize: "12px",
                            fontWeight: "600",
                            letterSpacing: "0.5px",
                            color: "#555",
                            cursor: "pointer",
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}>
                            {freelancer.firstName}&nbsp;{freelancer.lastName}
                        </div>
                    </Link>
                </div>

                <div style={{
                    fontSize: "10px",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    color: "#555",
                    marginTop: "10px",
                    marginBottom: "10px"
                }}>
                    {freelancer.occupation}
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{
                        fontSize: "14px",
                        color: "#777",
                        display: "flex",
                        alignItems: "center"
                    }}>
                        ★ {freelancer.rating}
                    </span>
                </div>
                <p style={{
                    fontSize: "12px",
                    color: "#666",
                    marginBottom: "6px",
                    lineHeight: "1.4"
                }}>
                    {freelancer.description}
                </p>
            </div>
        </div>
    );
};

const CategorySection = ({ categories }) => (
    <div style={{ marginTop: "50px" }}>
        <h2 style={{ fontSize: "22px", marginBottom: "20px", color: "#4a4a4a" }}>Choose a category</h2>
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "15px"
        }}>
            {categories.map((cat, idx) => (
                <CategoryCard key={idx} {...cat} />
            ))}
        </div>
    </div>
);

const CategoryCard = ({ image, title, description }) => {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    // Map category titles to URL-friendly slugs
    const getCategorySlug = (title) => {
        const categoryMap = {
            "Web and App development": "web-development",
            "Graphic & UI/UX design": "graphic-design",
            "Writing and translation": "writing-translation",
            "Digital Marketing": "digital-marketing",
            "Video & Animation Services": "video-animation",
            "Business & Virtual Assistance": "business-assistance"
        };

        return categoryMap[title] || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    };

    const handleCategoryClick = () => {
        const categorySlug = getCategorySlug(title);
        router.push(`/Freelancer_category/${categorySlug}`);
    };

    return (
        <div
            style={{
                backgroundColor: isHovered ? "#2f3c7e" : "#d4d4d4",
                color: isHovered ? "white" : "#535354",
                padding: "24px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.3s ease"
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCategoryClick}
        >
            {image && <img src={image} alt={title} style={{ width: "60px", height: "60px", marginBottom: "16px" }} />}
            <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>{title}</h3>
            <p style={{ fontSize: "14px", lineHeight: "1.5" }}>{description}</p>
        </div>
    );
};