import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";


const Speakers = () => {
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [photo, setPhoto] = useState('');
  const [role, setRole] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [speakers, setSpeakers] = useState([]);
  axios.defaults.withCredentials=true;

  useEffect(() => {
    // Fetch the data from the backend
    axios
      .get('http://localhost:5000/api/speakers/speaker')
      .then((response) => {
        setSpeakers(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an instance of FormData
    const formData = new FormData();
    formData.append('name', name);
    formData.append('profession', profession);
    formData.append('role', role);
    formData.append('facebook', facebook);
    formData.append('linkedin', linkedin);
    formData.append('twitter', twitter);
    formData.append('photo', photo);
    // Send the form data to the backend
    axios
      .post('http://localhost:5000/api/speakers/speaker', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
        // Add the new blog to the existing blogs
        setSpeakers([...speakers, response.data]);
      })
      .catch((error) => {
        console.error('Error:', error);
        window.location.replace("http://localhost:5173/signin");
      });
  };

  const deleteSpeaker = (speakerId) => {
    axios
      .delete(`http://localhost:5000/api/speakers/speaker/${speakerId}`)
      .then((response) => {
        console.log(response.data);
        // Remove the deleted blog from the speakers state
        const updatedSpeakers = speakers.filter((speaker) => speaker._id !== speakerId);
        setSpeakers(updatedSpeakers);
      })
      .catch((error) => {
        console.error('Error:', error);
        window.location.replace("http://localhost:5173/signin");
      });
  };

  return (
    <div>
           <div className="reg_head">
      <div className="common-heading ">
             <h1>Add new speakers</h1>
             </div>
             </div>
             <p style={{ paddingLeft: "110px" }}>
            <NavLink to="/speakers" className="conductlink btn3 btn4">
            <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
            </NavLink>{" "}
            to Speaker page{" "}
          </p>
    <section className="container">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="form">
      <div  className="column">
            <div className="input-box">
                  <label>Name:  </label>
                    <input
                      type="text"
                      name="name"
                      placeholder='Name'
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
            </div>

              <div className="input-box">
                    <label>Professional Details: </label>
                      <textarea
                        type="text"
                        name="profession"
                        id="eventlocation"
                        placeholder='Professional Details'
                        value={profession}
                        onChange={(event) => setProfession(event.target.value)}
                      />
                </div>

        </div>


      <div  className="column">
        <div className="input-box">
              <label>Photo:</label>
                <input
                  type="file"
                  name="photo"
                  id="eventposter"
                  class="custom-file-input"
                  onChange={(event) => setPhoto(event.target.files[0])}
                />
        </div>


        <div className="input-box">
            <label>Role:</label>
              <input
                type="text"
                name="role"
                placeholder='Role'
                value={role}
                onChange={(event) => setRole(event.target.value)}
              />
         </div>
      </div>


        <div className="input-box">
        <label>
        Social Media Links :-
        <div>
              <input
                type="url"
                name="facebook"
                id=""
                value={facebook}
                placeholder="Facebook"
                required
                onChange={(event) => setFacebook(event.target.value)}
              />
            </div>
        </label>
        
            <div>
              <input
                type="url"
                name="linkedin"
                id=""
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
                id=""
                value={twitter}
                placeholder="Twitter"
                required
                onChange={(event) => setTwitter(event.target.value)}
              />
            </div>
            </div>
        <input class="btn" type="submit" id="btn1"/>
      </form>
      </section>
      
  
      <div className="about-info-div">
        <div style={{ height: "90px" }}></div>
        <h1 className="common-heading">Manage Speakers :- </h1>
      </div>
      <div className="mainc_container">
      <div className="cards-container c1 f11"  >

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
                <button className="event-btn" onClick={() => deleteSpeaker(speaker._id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default Speakers;
