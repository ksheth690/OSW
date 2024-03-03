import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import AOS from 'aos'
import 'aos/dist/aos.css'

const Speakers = (props) => {
  const [speakers, setSpeakers] = useState([]);
  
  useEffect(() => {
    // Fetch the data from the backend
   
      axios
      .get("http://localhost:5000/api/speakers/speaker")
      .then((response) => {
        setSpeakers(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  }, []);

  return (
    <>
      <div className="blog_container">
        <div>
          <div className="about-info-div">
            <div style={{ height: "90px" }}></div>
            <h1 className="common-heading">Our Speakers</h1>
          </div>
          {props.isadmin && <p style={{ paddingLeft: "110px" }}>
            <NavLink to="/Speakeradd" className="conductlink btn3">
              Click Here
            </NavLink>{" "}
            to Manage Speakers{" "}
          </p>}
        </div>
      </div>
      
      <div className="mainc_container">
      <div className="cards-container c1">

        {speakers.map((speaker) => (
        <div className="mainsp1" key={speaker._id}>
          <div className="card_container" data-aos="fade-up">
            <div className="card">
              <div className="card-image">
                <img
                  src={speaker.photo}
                  alt="Profile Photo"
                />
              </div>
              <div className="card-content">
                <div className="card-name">{speaker.name}</div>
                <div className="card-position">{speaker.role}</div>
                <div className="social-icons">
                  <Link to={speaker.facebook}>
                    <i className="fab fa-facebook"></i>
                  </Link>
                  <Link to={speaker.twitter}>
                    <i className="fab fa-twitter"></i>
                  </Link>
                  <Link to={speaker.linkedin}>
                    <i className="fab fa-linkedin"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
      </div>
    </>
  );
};
AOS.init({
  duration:600
});

export default Speakers;

