import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './landing/App';
import Profile from './Profile';
import Login from './Login';
import Register from './Register';
import Download from './landing/Download';

import Home from './postauth/Home';
import Friends from './postauth/Friends';
import Library from './postauth/Library';
import Games from './postauth/Games';
import Stats from './postauth/Stats';
import Calendar from './postauth/Calendar';
import Settings from './postauth/Settings';

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


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
