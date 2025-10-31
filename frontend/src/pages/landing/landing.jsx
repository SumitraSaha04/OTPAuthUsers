
import { useNavigate } from "react-router-dom";
import { FaAirbnb, FaGlobeAsia, FaStar, FaMapMarkedAlt } from "react-icons/fa";
import "./landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
     
      <nav className="landing-navbar">
        <div className="navbar-left">
          <FaAirbnb className="logo-icon" />
          <h1 className="logo-text">Wanderlust</h1>
        </div>

        <ul className="navbar-links">
          <li><a href="#features">Features</a></li>
          
          <li><a href="#reviews">Reviews</a></li>
        </ul>

        <button className="primary-btn" onClick={() => navigate("/login")}>
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>
            Explore the World with <span>Wanderlust</span>
          </h2>
          <p>
            Discover unique destinations, book personalized stays, and make memories that last a lifetime — all in one platform.
          </p>
          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/home")}
            >
              Start Exploring
            </button>
            <button
              className="secondary-btn"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="Travel"
          />
        </div>
      </section>

     
      <section id="features" className="features-section">
        <h3>Why Choose Wanderlust?</h3>
        <div className="feature-cards">
          <FeatureCard
            icon={<FaGlobeAsia />}
            title="Global Reach"
            desc="Book trips and stays across 100+ destinations worldwide effortlessly."
          />
          <FeatureCard
            icon={<FaMapMarkedAlt />}
            title="Smart Recommendations"
            desc="Personalized travel suggestions tailored just for you."
          />
          <FeatureCard
            icon={<FaStar />}
            title="Verified Experiences"
            desc="Every listing is verified for safety, comfort, and quality."
          />
        </div>
      </section>

    
      <section id="reviews" className="reviews-section">
        <h3>What Travelers Say</h3>
        <div className="review-cards">
          <ReviewCard
            img="https://randomuser.me/api/portraits/women/21.jpg"
            name="Saanvi Patel"
            quote="Wanderlust made trip planning so easy! The UI is beautiful and intuitive."
          />
          <ReviewCard
            img="https://randomuser.me/api/portraits/men/34.jpg"
            name="Rohit Sharma"
            quote="Hands down the best booking experience I've had!"
          />
          <ReviewCard
            img="https://randomuser.me/api/portraits/women/68.jpg"
            name="Emily Zhang"
            quote="Found hidden gems I never knew existed — highly recommend it!"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        © {new Date().getFullYear()} Wanderlust — All Rights Reserved.
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <h4>{title}</h4>
    <p>{desc}</p>
  </div>
);

const ReviewCard = ({ img, name, quote }) => (
  <div className="review-card">
    <img src={img} alt={name} />
    <p>"{quote}"</p>
    <h5>{name}</h5>
  </div>
);

export default Landing;
