import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";


const Team = () => {
  const [name, setName] = useState('');
  const [noOfMembers, setNoOfMembers] = useState(1);
  const [nameOfLeader, setNameOfLeader] = useState('');
  const [nameOfMembers, setNameOfMembers] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [teams, setTeams] = useState([]);
  
  axios.defaults.withCredentials=true;
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

  const handleSubmit=(event) =>{
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('noOfMembers', noOfMembers);
    formData.append('nameOfLeader', nameOfLeader);
    formData.append('nameOfMembers', nameOfMembers.join(','));
    formData.append('photo', photo);
    formData.append('facebook', facebook);
    formData.append('linkedin', linkedin);
    formData.append('twitter', twitter);

    axios.post('http://localhost:5000/api/teams/team', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log(response.data); 
        setTeams([...teams, response.data]);
      })
      .catch(error => {
        console.error("Error : "+ error);
        window.location.replace("http://localhost:5173/signin");
      });
  }


  const deleteTeam=(teamId)=> {
    axios
      .delete(`http://localhost:5000/api/teams/team/${teamId}`)
      .then((response) => {
        console.log(response.data);
        setTeams(teams.filter((team) => team._id !== teamId));
      })
      .catch((error) => {
        console.error('Error:', error);
        window.location.replace("http://localhost:5173/signin");
      });
  }
  

  return (
      <div>
       
       <div className="reg_head">
      <div className="common-heading ">
             <h1>Add Teams</h1>
             </div>
             </div>
             <p style={{ paddingLeft: "110px" }}>
            <NavLink to="/Team" className="conductlink btn3 btn4">
            <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
            </NavLink>{" "}
            to Teams page{" "}
          </p>
      <section className="container">
        
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="form">
              <div className="column">
                      <div className="input-box">
                            <label htmlFor="eventdate" >Team Name:</label>
                            <input
                              type="text"
                              name="eventname"
                              id="eventname"
                              placeholder="Team Name"
                              //value={eventname}
                              onChange={(event) => setName(event.target.value)}
                              required
                              />
                          </div>
                          

                    <div className="input-box">
                    <label>
                      Number of Members:
                      <input
                        type="number"
                        name="noOfMembers"
                        placeholder="Number of members"
                        value={noOfMembers}
                        onChange={(event) => setNoOfMembers(parseInt(event.target.value))}
                      />
                    </label>
                    </div>
                </div>


                <div className="column">
                  <div className="input-box">
                          <label>
                            Leader's Name:
                            <input
                              type="text"
                              name="nameOfLeader"
                              placeholder="Leader's name"
                              value={nameOfLeader}
                              onChange={(event) => setNameOfLeader(event.target.value)}
                            />
                      </label>
                    </div>

                    <div className="input-box">
                    <label>
                      Members' Names:
                      <input
                        type="text"
                        name="nameOfMembers"
                        placeholder="Members' names"
                        value={nameOfMembers}
                        onChange={(event) => setNameOfMembers(event.target.value.split(','))}
                      />

                    </label>
                    </div>
          </div>



          <div className="input-box">
              <label>
                Photo:
                <input
                  type="file"
                  name="photo"
                  id="eventposter"
                  class="custom-file-input"
                  onChange={(event) => setPhoto(event.target.files[0])}
                />
              </label>
         </div>
         <div className="input-box">
              <label>
                Social Media Links:
                <div>
                  <input
                    type="url"
                    name="facebook"
                    value={facebook}
                    placeholder="Facebook"
                    required
                    onChange={(event) => setFacebook(event.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="url"
                    name="linkedin"
                    value={linkedin}
                    placeholder="LinkedIn"
                    required
                    onChange={(event) => setLinkedin(event.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="url"
                    name="twitter"
                    value={twitter}
                    placeholder="Twitter"
                    required
                    onChange={(event) => setTwitter(event.target.value)}
                  />
                </div>
              </label>
              </div>
              <input className="btn"  type="submit" id="btn1" value="Submit" />
            </form>
          </section>
      

      <div className="about-info-div">
        <div style={{ height: "90px" }}></div>
        <h1 className="common-heading">Manage Teams :- </h1>
      </div>
      
      <div className="mainc_container" >
      <div className="cards-container c1 f11"  >

        {teams.map((team) => {
        const formattedData = team.nameOfMembers.map(item => item.charAt(0).toUpperCase() + item.slice(1));
      return(
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
                <div className="card-name">{team.name}</div>
                <div className="card-position">{team.nameOfLeader}</div>
                <div className="card-position">{formattedData.join(', ')}</div>
                <div className="social-icons">
                  <a href="#">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              
                <button className="event-btn" onClick={() => deleteTeam(team._id)}>Delete</button>
                </div>
            </div>
          </div>
        </div>
        )})}
       </div>
      </div>
    </div>
  )
}

export default Team;
