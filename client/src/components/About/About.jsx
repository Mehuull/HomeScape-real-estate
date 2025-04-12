import React from "react";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/image4.jpg";
import image5 from "../../assets/image5.jpg";
import './About.css';

const About = () => {
  return (
    <div>
      <div className="about-container1">
        <div className="about-content">
          <span>about us</span>
          <h2>Our Guarantee</h2>
          <p>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt dolorum vitae quis non, harum molestiae alias assumenda amet facilis possimus doloremque aut impedit doloribus maiores cum blanditiis. Dolor quibusdam soluta eligendi pariatur possimus, voluptatibus asperiores!
          </p>
        </div>
        <img src={image3} alt="" />
      </div>

      <div className="about-container2">
        <div className="about-content">
          <span>about us</span>
          <h2>Best Price</h2>
          <p>
           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam facere, officiis omnis accusamus earum veritatis doloribus sint voluptate labore corrupti tempore distinctio reprehenderit deleniti magnam quia, cumque quae adipisci blanditiis debitis officia vero quisquam iste? Dolorem ad impedit esse exercitationem!
          </p>
          <button className="sign-in-btn">Explore</button>
        </div>
        <img src={image4} alt="" />
      </div>

      <div className="about-container3">
        <div className="about-content">
          <span>about us</span>
          <h2>our process</h2>
         <span>step 1</span>
         <h4>choose your type</h4>
         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis dolorem possimus nam animi accusamus obcaecati mollitia totam deserunt sint dolor.</p>

         <span>step 2</span>
         <h4>Find your Property</h4>
         <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero architecto ipsum, provident eveniet maiores excepturi!</p>
        </div>
        <img src={image5} alt="" />
      </div>
    </div>
  );
};

export default About;
