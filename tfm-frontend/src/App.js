import Header2 from "./header";

import logo from './logo.svg';
import './App.css';

function Home(){
  return (
    <div>
      
      <h1>Home</h1>
      <p>Yes, this is totally the home page</p>
      <img src={logo} className="App-logo" alt="logo" />
      <p>Coucou</p>
      
    </div>
  );
}


function App() {
  return (
    <div className="App">
        <Header2 />
      <header className="App-header">
        <Home />
      </header>
    </div>
  );
}

export default App;
