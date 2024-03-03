import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import AOS from 'aos'
import 'aos/dist/aos.css'

const BlogOn = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const objectString = searchParams.get('object');
    const blog = JSON.parse(decodeURIComponent(objectString));

    useEffect(() => {
      AOS.init({ duration: 600 });
    }, []);
  return (
    
    <>
     <div className="main_blogon">
     <div className="Onone" data-aos="fade-left">

</div>
        <div className="mainimg">
        <div className="blogOnimg">
        {blog.photo && (
            <div className="blogon_img" data-aos="fade-right">
              <img src={blog.photo} alt="Blog" />
            </div>
          )}
        <div className="blogon_title">
            <h1 className='common-heading'>{blog.title }  </h1>           
        </div>
        
        </div>
        </div>
        <div className="descontain">
        <div className="blogon_dis">
          {Array.isArray(blog.description) ? (
            blog.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))
          ) : (
            <p>{blog.description}</p>
          )}
        </div>
        
        </div>
     </div>
    </>
  )
}
AOS.init({
  duration:600
});
export default BlogOn
