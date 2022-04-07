import './../App.css';
import gamedata from '../dummyData/games.json';

import styled from 'styled-components';
import {React, useState} from "react";

import Sidebar from './sidebar';
import Headband from "./Header";

const ResearchBar = styled.input`
color: black;
`

const GameList = styled.div`
display:flex;
align:left;
`
const GameListed = styled.a`
margin: 5px 5px;
border: solid black;
padding: 2px 2px 2px 2px;
width: 400px;
height: 200px;
`

let gameArray = []

function addGame(gid){
    gameArray.push(gid)
    console.log(gameArray)
return(0)
}

function GamesLister(research) {

    const refinedData = gamedata.filter((el) => { return el.text.toLowerCase().includes(research.input) })
        
    if (research.input === ''){
        return(
            <GameList>
               {gamedata.map((game)=>(<GameListed key={game.id} onClick={() => {addGame(game.id)}} >{game.text}</GameListed>))} 
            </GameList>
        );
    }
    else {
        return(
            <GameList>
               {refinedData.map((game)=>(<GameListed key={game.id} onClick={() => {addGame(game.id)}}>{game.text}</GameListed>))} 
            </GameList>
        )
    }
}

function Games(){

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        var lowercase = e.target.value.toLowerCase();
        setInputText(lowercase);
    };

    return(
        <div className="pApp">
            <div>
                <Sidebar />
                <Headband />
                <h1>Games</h1>
                <div className='search'>
                    <ResearchBar id="outlined-basic" label="Search" onChange={inputHandler}/>
                </div>
                <GamesLister input={inputText}/>
            </div>
        </div>
    );
}

export default Games;