import './../App.css';

import axios from 'axios';
import styled from 'styled-components';
import {React, useState, useEffect} from "react";

import Sidebar from './sidebar';
import Headband from "./Header";

import GetGames from './getters/GetGames';

const GameList = styled.div`
margin-top: 3vh;
display:flex;
flex-wrap: wrap;
`
const GameListed = styled.a`

text-align: center;
margin: 5px 5px;
border: solid black;
padding: 2px 2px 2px 2px;
width: 300px;
height: 400px;
background-color: black;
color: white;
font-family: "Helvetica";
`

const GameImg = styled.img`
width: 280px;
height: 350px;
display: block;
margin-left: auto;
margin-right: auto;
`


let gameArray = []

function addGame(gid){
    gameArray.push(gid)
    console.log(gameArray)
return(0)
}

function SearchBar (Data){
    const [query, setQuery] = useState("")
    Data = Data.input;
    console.log(Data);
    return(
      <div>
          <input placeholder="Research" onChange={event => setQuery(event.target.value)} />
          <GameList>
          {Data.filter(game => {
            if (query === '') {
                return game;
            }
            else if (game.name.toLowerCase().includes(query.toLowerCase())) {
              return game;
            }
          }).map((game) => (<GameListed key={game.id} onClick={() => {addGame(game.id)}}>{game.name}<GameImg src={game.poster} alt="img ?"></GameImg></GameListed>))}
            
          </GameList>
      </div>
    )
}

function AddGame(id) {
    //axios.post('localhost:5050/user/games',gameArray).then(()=>(alert("Successfully added game to library"))).catch(()=>(alert("Task Failed Successfully")))
}

function Gamess(){
    const data = GetGames();
    console.log(data);
    const displayData = () => {
    return data ? (
      <div>
        <SearchBar input={data}/>
      </div>) : 
      (
      <h3>No data yet</h3>
    );
  }
  return (
    <>
      {displayData()}
    </>
  );
}

function Games(){
    return(
        <div className="pApp">
            <Sidebar />
            <Headband />
            <div className='paBody'>
                <div>
                  <button>Add Game</button>
                  <button>Add Studio</button>
                  <button>Add Publisher</button>
                </div>
                <h1>Games</h1>
                <Gamess />
            </div>
        </div>
    );
}

export default Games;