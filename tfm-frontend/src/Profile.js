import './App.css';

import Header2 from './header';

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5050/',
})

function getProfile(id=1) {
  api.get('games').then(res => {console.log(res.data)})
}

function postProfile() {
  api.post('/', {
    "id":4,
		"username":"Notafly",
		"email":"elliot.maisl@orange.fr"
  })
  .then(function (response) {
    console.log(response);
  })
}


function Profile() {

  getProfile();

  return (
    <div className="App">
        <Header2 />
        <header className="App-header">
            <h1>Profile</h1>
            <p>I have great plans to start using Axios and Backend communications around there.</p>
        </header>
        
    </div>
    
  );
}

export default Profile;