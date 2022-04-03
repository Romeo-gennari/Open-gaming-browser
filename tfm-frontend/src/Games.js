import './App.css';
import gamedata from './dummyData/games.json';

import styled from 'styled-components';

import {React, useState} from "react";
import { createPortal } from 'react-dom';

const GameCluster = styled.div`
display: flex;
flex-wrap: wrap;
align-content: center;
justify-content: center;
`
const Game = styled.button`
  background-color: blue;
  font-size: 20px;
  width: 200px;
  heigth: 70px;
  padding: 60px 10px;
  cursor: pointer;
  flex-grow: 0;
  `

const ResearchBar = styled.input`
color: black;
`

let gameList = []

function addGame(gid){
    gameList.push(gid)
    console.log(gameList)
return(0)
}

function GamesList(research) {

    const refinedData = gamedata.filter((el) => { return el.text.toLowerCase().includes(research.input) })
        
    if (research.input === ''){
        return(
            <div>Type in the games you want to know about.</div>
        );
    }
    else {
        return(
            <ul>
               {refinedData.map((game)=>(<li key={game.id} ><button onClick={() => {addGame(game.id)}}>{game.text}</button></li>))} 
            </ul>
        )
    }
}

function Games() {

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        var lowercase = e.target.value.toLowerCase();
        setInputText(lowercase);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Games</h1>
                <div className='search'>
                    <ResearchBar id="outlined-basic" label="Search" onChange={inputHandler}/>
                </div>

                <GamesList input={inputText}/>
            </header>
            
        </div>    
  );
}

export default Games;