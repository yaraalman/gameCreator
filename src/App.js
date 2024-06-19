//import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
//import Header from './view/components/Header';
import Footer from './view/components/Footer';
import HomePage from './view/components/HomePage';
import AboutUsPage from './view/components/AboutUs';
import ContactUsPage from './view/components/ContactUs';
import LoginPage from './view/components/Login';
import SignUpPage from './view/components/SignUp';
import NoPage from './view/components/NoPage';
import CreatorPage from './view/components/Creator';

function App() {
  /*
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/menus")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
 
  
 /* const location = useLocation();
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    setShowHeader(location.pathname !== '/');
  }, [location.pathname]);
   {showHeader && }
*/
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/aboutUsPage" element={<AboutUsPage />} />
          <Route path="/contactUsPage" element={<ContactUsPage />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/signUpPage" element={<SignUpPage />} />
          <Route path="/creatorPage" element={< CreatorPage/>} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;