import HeroSection from "../components/HeroSection";
import { Link } from "react-router-dom";
import { FaCar, FaArrowRight } from "react-icons/fa"; // Use icons for modern look

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Welcome Section */}
      <div className="container mt-5 text-center">
        <h2 className="display-4 font-weight-bold">Welcome to Vehicle Import System</h2>
        <p className="lead text-muted mb-4">
          Browse and manage imported vehicles seamlessly with our user-friendly platform. Explore a wide variety of vehicles, track your orders, and make informed decisions.
        </p>
        <Link to="/vehicles" className="btn btn-primary btn-lg mt-4">
          Explore Vehicles <FaArrowRight className="ms-2" />
        </Link>
      </div>

      {/* Featured Vehicles Section */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Featured Vehicles</h2>
        <div className="row">
          {/* Example Featured Vehicle Cards */}
          {[1, 2, 3].map((_, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card shadow-sm border-light rounded">
                <img
                  src={`https://images.hdqwalls.com/wallpapers/bthumb/manhart-supra-gr-450-jk.jpg`} // Example image
                  className="card-img-top"
                  alt={`Vehicle ${index + 1}`}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">Vehicle {index + 1}</h5>
                  <p className="card-text text-muted">Model XYZ, Year 2025</p>
                  <Link to="/vehicles" className="btn btn-outline-primary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-light py-5">
        <div className="container text-center">
          <h2 className="display-4 font-weight-bold mb-4">Why Choose Us?</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="mb-4">
                <FaCar size={50} className="text-primary mb-3" />
                <h4>Wide Vehicle Selection</h4>
                <p className="text-muted">
                  Choose from a variety of imported vehicles with the best prices and quality.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-4">
                <FaArrowRight size={50} className="text-primary mb-3" />
                <h4>Seamless Process</h4>
                <p className="text-muted">
                  Our platform offers a smooth, user-friendly experience for browsing, purchasing, and tracking vehicles.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="mb-4">
                <FaCar size={50} className="text-primary mb-3" />
                <h4>24/7 Support</h4>
                <p className="text-muted">
                  Our customer support is available around the clock to assist you at any stage of your vehicle journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
