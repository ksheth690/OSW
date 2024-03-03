import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Home/Home'
import Eventregister from './Event/Eventregister'
import Team from './Team/Team'
import Teamadd from './Team/Team_add'
import Speakers from './Speaker/Speakers'
import Speakeradd from './Speaker/Speaker_add'
import About from './About-Contact/About'
import Contact from './About-Contact/Contact'
import Blogs from './Blog/Blogs'
import Blogadd from './Blog/Blog_add'
import Blogon from './Blog/BlogOn'
import Header from './components/Header'
import Footer from './components/Footer'
import Sign_In from './Signin-Signup/Sign_In'
import Signup from './Signin-Signup/Sign_up'
import "./index.css"
import "./style.css"
import EventConduct from './Event/EventConduct'
import GoToTop from "./components/GoToTop";
import { ThemeProvider } from "styled-components";
import Thanks from './Other/thanks'
import Thanks1 from './Other/thanks1'
import { UserContextProvider } from './context/UserContextProvider';
import Profile from './PROFILE/profile'
import Forgot_Password from "./Signin-Signup/Forgot_Password"
  


const App = () => {
  let [isadmin,setIsadmin] = useState(false);
  useEffect(() => {
    // Fetch the data from the backend
      axios
      .get('http://localhost:5000/api/auth/isadmin')
      .then((response) => {
        setIsadmin(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgb(24 24 29)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",
      bg: "rgb(249 249 255)",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: { mobile: "768px", tab: "998px" },
  };
  return (
    <ThemeProvider theme={theme}>
    <GoToTop />
    <BrowserRouter>
    <UserContextProvider>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={< Home />} />
                <Route path="/eventConduct" element={<EventConduct />} />
                <Route path="/events" element={<Eventregister isadmin={isadmin}/>} />
                <Route path="/team" element={<Team isadmin={isadmin}/>} />
                <Route path="/Teamadd" element={<Teamadd />} />
                <Route path="/speakers" element={<Speakers isadmin={isadmin}/>} />
                <Route path="/Speakeradd" element={<Speakeradd />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blogs" element={<Blogs isadmin={isadmin} />} />
                <Route path="/blogadd" element={<Blogadd />} />
                <Route path="/blogon" element={<Blogon />} />
                <Route path="/profile" element={<Profile isadmin={isadmin}/>} />
              </Routes>
              <Footer />
            </>
          }
        />
        <Route path="/signin" element={<Sign_In />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<Forgot_Password />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/thanks1" element={<Thanks1 />} />
      </Routes>
      </UserContextProvider>
    </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
