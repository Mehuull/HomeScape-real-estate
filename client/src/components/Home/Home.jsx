import React from "react";
import { useSelector } from "react-redux";
import "./Home.css";
import {Link} from 'react-router-dom'
import image1 from "../../assets/image1.jpg"; 
import image2 from "../../assets/image2.jpg";
import Properties from "../Properties/Properties";

const Home = () => {
  const user = useSelector((state) => state.user);
  const features = [
    {
      icon: "🛠️", 
      title: "Service Premises",
      description: "Our complex has office space and convenience stores on the ground floor.",
    },
    {
      icon: "🔒",
      title: "Safety and Security",
      description:
        "Reliable round-the-clock surveillance by a security system using modern technologies.",
    },
    {
      icon: "🌿",
      title: "Environmental Solutions",
      description:
        "We care about the environment, using LED lighting and charging stations for electric vehicles.",
    },
    {
      icon: "💼",
      title: "Ease of Management",
      description:
        "You just buy an apartment, and a professional hotel operator will handle the rest for you.",
    },
    {
      icon: "💵",
      title: "Guaranteed Income",
      description:
        "Guaranteed monthly income is prescribed in advance in the contract.",
    },
    {
      icon: "📍",
      title: "Great Location",
      description:
        "A pledge of secure rental for your apartment with happy clients.",
    },
  ];
  return (
    <div className="hero-section">
      {/* Hero Section 1 */}
      <div className="hero-sub">
        <div className="hero-content">
          <h2>Connecting You to the <span>Home</span> You Love</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
            iure voluptatem debitis rem facilis quis!
          </p>
          <Link to="/properties" className="sign-in-btn">Explore All</Link>
          {!user ? (<Link to="/signin" className="btn">Create Property</Link>):(
            <Link to="/createListing" className="btn">Create Property</Link>
          )}
          

        </div>
        <img src={image1} alt="Modern Office Design"  className="image1"/>
      </div>

      {/* Hero Section 2 */}
      <div className="hero-sub">
        <img src={image2} alt="Office Interior" className="image2" />
        <div className="hero-content">
          <p>
            Ipsum dolor sit amet consectetur adipisicing elit. Nam numquam
            delectus voluptatibus magnam fugiat praesentium.
          </p>
        </div>
      </div>


      <h3>OUR ADVANTAGES</h3>
      <div className="features-container">
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <div className="feature-icon">{feature.icon}</div>
          <h3 className="feature-title">{feature.title}</h3>
          <p className="feature-description">{feature.description}</p>
        </div>
      ))}
    </div>


    <div className="featured-property">
    <Properties />
    </div>
    </div>


      
  );
};

export default Home;
