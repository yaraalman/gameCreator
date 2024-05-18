import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
//import Header from './view/components/Header';
import Footer from './view/components/Footer';
import HomePage from './view/components/HomePage';
import AboutUsPage from './view/components/AboutUs';
import ContactUsPage from './view/components/ContactUs';
import LoginPage from './view/components/Login';
import SignUpPage from './view/components/SignUp';
import NoPage from './view/components/NoPage';

function App() {
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
          <Route path="/aboutUsPage" element={<AboutUsPage />} />
          <Route path="/contactUsPage" element={<ContactUsPage />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/signUpPage" element={<SignUpPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;