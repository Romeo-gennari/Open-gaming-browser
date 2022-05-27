import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './landing/App';
import Profile from './Profile';
import Login from './oauth/Login';
import Register from './oauth/Register';
import Download from './landing/Download';

import Home from './postauth/home';
import Friends from './postauth/friends';
import Library from './postauth/library';
import Gamemodes from './postauth/gamemodes';
import Games from './postauth/games';
import Stats from './postauth/stats';
import Calendar from './postauth/calendar';
import Settings from './postauth/settings';

import reportWebVitals from './reportWebVitals';

import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";

import { ChakraProvider } from '@chakra-ui/react'; 

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="Profile" element={<Profile />} />
          <Route exact path="Download" element={<Download />} />
          <Route exact path="Login" element={<Login />} />
          <Route exact path="Register" element={<Register />} />

          <Route exact path="Home" element={<Home />} />
          <Route exact path="Friends" element={<Friends />} />
          <Route exact path="Library" element={<Library />} />
          <Route exact path="Gamemodes" element={<Gamemodes />} />
          <Route exact path="Games" element={<Games />} />
          <Route exact path="Stats" element={<Stats />} />
          <Route exact path="Calendar" element={<Calendar />} />
          <Route exact path="Settings" element={<Settings />} />
          
        </Routes>
      </HashRouter>,
    </ChakraProvider>
  </React.StrictMode>,
  
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
