import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import AOS from 'aos'
import 'aos/dist/aos.css'


const Team = (props) => {
  const [teams, setTeams] = useState([]);
  
  useEffect(() => {
    // Fetch the data from the backend
    
      axios
      .get('http://localhost:5000/api/teams/team')
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }, []);

  return (
    <>
      <div className="blog_container">
        <div>
          <div className="about-info-div">
            <div style={{ height: "90px" }}></div>
            <h1 className="common-heading">Our Teams</h1>
          </div>
          {props.isadmin &&  <p style={{ paddingLeft: "110px" }}>
            <NavLink to="/Teamadd" className="conductlink btn3">
              Click Here
            </NavLink>{" "}
            to Manage Teams{" "}
          </p>}
        </div>
      </div>
      
      <div className="mainc_container">
      <div className="cards-container c1" >

      {teams.map((team) =>  {
        const formattedData = team.nameOfMembers.map(item => item.charAt(0).toUpperCase() + item.slice(1));
      return (
        <div className="mainsp1" key={team._id}>
          <div className="card_container" data-aos="fade-up">
            <div className="card">
              <div className="card-image">
              <img
                  src={team.photo}
                  alt="Profile Photo"
              />
              </div>

              <div className="card-content">
                <div className="card-name">team name : {team.name}</div>
                <div className="card-position">team leader : {team.nameOfLeader}</div>
                <div className="card-position">team members : <br></br>{formattedData.join(', ')}</div>
                <div className="social-icons">
                <Link to={team.facebook}>
                    <i className="fab fa-facebook"></i>
                  </Link>
                  <Link to={team.twitter}>
                    <i className="fab fa-twitter"></i>
                  </Link>
                  <Link to={team.linkedin}>
                    <i className="fab fa-linkedin"></i>
                  </Link>
                </div>
                </div>
            </div>
          </div>
        </div>
        )})}
      </div>
      </div>
    </>
  );
};
AOS.init({
  duration:600
});

export default Team;

