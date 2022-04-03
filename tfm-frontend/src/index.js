import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './landing/App';
import Profile from './Profile';
import Login from './Login';
import Register from './Register';
import Download from './landing/Download';

import Home from './postauth/home';
import Friends from './postauth/friends';
import Library from './postauth/library';
import Games from './postauth/games';
import Stats from './postauth/stats';
import Calendar from './postauth/calendar';
import Settings from './postauth/settings';

import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ChakraProvider } from '@chakra-ui/react'; 

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Download" element={<Download />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />

          <Route path="Home" element={<Home />} />
          <Route path="Friends" element={<Friends />} />
          <Route path="Library" element={<Library />} />
          <Route path="Games" element={<Games />} />
          <Route path="Stats" element={<Stats />} />
          <Route path="Calendar" element={<Calendar />} />
          <Route path="Settings" element={<Settings />} />
          
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
