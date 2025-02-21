import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Handle scroll events here, e.g., triggering animations or lazy loading
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="hero-section text-center text-white d-flex align-items-center justify-content-center position-relative"
      style={{
        height: "100vh",
        background: "linear-gradient(to right, rgba(15, 32, 39, 0.8), rgba(32, 58, 67, 0.8), rgba(44, 83, 100, 0.8))",
        backgroundImage: 'url("https://images.hdqwalls.com/wallpapers/toyota-supra-mk5-er.jpg")', // Replace with actual image or video URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background 0.5s ease-in-out",
      }}
    >
      <div
        className="hero-content text-center"
        style={{
          textAlign: 'center',
          padding: '20px',
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.3s ease, opacity 0.3s ease",
          opacity: isHovered ? 0.9 : 1,
        }}
      >
        <h1 className="hero-title" style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "4rem", lineHeight: 1.2,
          marginBottom: "20px", color: '#fff', textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
        }}>
          Find Your Dream Vehicle
        </h1>
        <p className="hero-subtitle" style={{
          fontFamily: "'Roboto', sans-serif", fontSize: "1.2rem", fontWeight: 400, color: '#fff',
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', marginBottom: "20px"
        }}>
          Explore a variety of imported vehicles with ease.
        </p>
        <button
          className="cta-button mt-4"
          onClick={() => alert("Explore now")}
          style={{
            padding: "12px 30px",
            fontSize: "1.1rem",
            backgroundColor: "#F1C40F",
            color: "#333",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out, background-color 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Start Exploring
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
