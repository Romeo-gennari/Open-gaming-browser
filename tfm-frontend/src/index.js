import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './landing/App';
import About from './landing/About';
import Profile from './Profile';
import Contact from './landing/Contact';
import Features from './landing/Features';
import Login from './Login';
import Register from './Register';
import Download from './landing/Download';

import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ChakraProvider } from '@chakra-ui/react'; 

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="About" element={<About />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="Features" element={<Features />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="Download" element={<Download />} />

          
        </Routes>
      </BrowserRouter>,
    </ChakraProvider>
  </React.StrictMode>,
  
  document.getElementById('root')
);

/*
ReactDOM.render(
  <React.StrictMode>
    
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="About" element={<About />} />
        <Route path="Profile" element={<Profile />} />
      </Routes>
    
    </BrowserRouter>,

  </React.StrictMode>,
  document.getElementById('root')
);
*/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
