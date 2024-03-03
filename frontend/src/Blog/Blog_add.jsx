import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";


const Blogs = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [username, setUsername] = useState('');
  const [category, setCategory] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [expanded, setExpanded] = useState(false);
  axios.defaults.withCredentials=true;


  useEffect(() => {
    // Fetch the data from the backend
    axios
      .get('http://localhost:5000/api/posts/blog')
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an instance of FormData
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('username', username);
    formData.append('category', category);
    formData.append('photo', photo);

    // Send the form data to the backend
    axios
      .post('http://localhost:5000/api/posts/blog', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
        // Add the new blog to the existing blogs
        setBlogs([...blogs, response.data]);
      })
      .catch((error) => {
        console.error('Error:', error);
        window.location.replace("http://localhost:5173/signin");
      });
  };

  const deleteBlog = (blogId) => {
    axios
      .delete(`http://localhost:5000/api/posts/blog/${blogId}`)
      .then((response) => {
        console.log(response.data);
        // Remove the deleted blog from the blogs state
        const updatedBlogs = blogs.filter((blog) => blog._id !== blogId);
        setBlogs(updatedBlogs);
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
             <h1>Upload a new blog</h1>
             </div>
             </div>
             <p style={{ paddingLeft: "110px" }}>
            <NavLink to="/blogs" className="conductlink btn3 btn4">
            <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
            </NavLink>{" "}
            to Blogs page{" "}
          </p>
       <section className="container">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="form">
      <div className="input-box">
        <label>Title:</label>
          
          <input
            type="text"
            name="title"
            placeholder='Title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        
        </div>
        <div className="input-box">
        <label>
          Photo:
          <input
            type="file"
            name="photo"
            class="custom-file-input"
            id="eventposter"
            onChange={(event) => setPhoto(event.target.files[0])}
          />
        </label>
        </div>
        <div className="input-box ">
        <label>Description</label>
          
          <textarea
            type="text"
            name="description"
            id="eventlocation"
            placeholder='Description'
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
       
        <div className="input-box">
        <label>Username:
          <input
            type="text"
            name="username"
            placeholder='Username'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        </div>
        <input class="btn" type="submit" id="btn1"/>
      </form>
      </section>
     
     
      {/* Display blogs */}
      <div className="about-info-div">
        <div style={{ height: "90px" }}></div>
        <div className="common-heading">
        <h2 className="common-heading">Manage blogs :- </h2>
        </div>
      </div>
      <div className="event-container e1 f11">
        {blogs.map((blog) =>{ 
         
          return(
          <div key={blog._id} className="event-square">
            <img src={blog.photo} alt="Blog Photo" />
            <p className="event-name">{blog.title}</p>
            <p className="event-dis d12">{blog.description}</p>
            <button className="event-btn" onClick={() => deleteBlog(blog._id)}>Delete</button>
          </div>
        )})}
      </div>

    </div>
  );
};

export default Blogs;

