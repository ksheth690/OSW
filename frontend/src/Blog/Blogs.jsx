import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../context/UserContextProvider';
const Blogs = (props) => {
  const [blogs, setBlogs] = useState([]);
  
    // Fetch the data from the backend
    
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
  return (
    <>
      <div className="blog_container">
      <div>
      <div className="about-info-div">
        <div style={{ height: "90px" }}></div>
        <div className='common-heading'>
        <h1>Latest Blogs</h1>
        </div>
      </div>
      {props.isadmin && <p style={{ paddingLeft: "110px" }}>
          If you want to Upload a new Blog,{" "}
          <NavLink to="/blogadd" >
            <div className="conductlink btn3">Click Here</div>
          </NavLink>
        </p>}</div>
        
      </div>
      {/* Display blogs */}
      <div className="blog-container e1">
        {blogs.map((blog) =>{
        return(
          <NavLink  key={blog._id}
            to={`/blogon?object=${encodeURIComponent(JSON.stringify(blog))}`}>
          <div className="blog-square">
              {blog.photo && (
                <img src={blog.photo} alt="Blog Photo" />
              )}
              <p className="blog-name e11 d13">{blog.title}</p>
              <p className="blog-dis d12 d13">
                {blog.description.split("\n")}
              </p>
            </div>
          </NavLink>
        )})}
      </div>
    </>
  );
};

export default Blogs;
