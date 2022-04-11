import './../App.css';
import gamedata from '../dummyData/games.json';

import axios from 'axios';
import styled from 'styled-components';
import {React, useState} from "react";

import Sidebar from './sidebar';
import Headband from "./Header";

const ResearchBar = styled.input`
color: black;
`

const GameList = styled.div`
display:flex;
flex-wrap: wrap;
align:left;
`
const GameListed = styled.a`
margin: 5px 5px;
border: solid black;
padding: 2px 2px 2px 2px;
width: 300px;
height: 400px;
`

const GameImg = styled.img`
width: 280px;
height: 350px;
`

//let gameArray = await axios.get('localhost:5050/user/games')
let gameArray = []

function addGame(gid){
    gameArray.push(gid)
    console.log(gameArray)
return(0)
}

function AddGame(id) {
    axios.post('localhost:5050/user/games',gameArray).then(()=>(alert("Successfully added game to library"))).catch(()=>(alert("Task Failed Successfully")))
}

function GamesLister(research) {

    const refinedData = gamedata.filter((el) => { return el.text.toLowerCase().includes(research.input) })
    if (research.input === ''){
        return(
            <GameList>
               {gamedata.map((game)=>(<GameListed key={game.id} onClick={() => {addGame(game.id);AddGame(game.id);}} >{game.text}<GameImg src={game.poster} alt="img ?"></GameImg></GameListed>))} 
            </GameList>
        );
    }
    else {
        return(
            <GameList>
               {refinedData.map((game)=>(<GameListed key={game.id} onClick={() => {addGame(game.id)}}>{game.text}<GameImg src={game.poster} alt="img ?"></GameImg></GameListed>))} 
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
            <Sidebar />
            <Headband />
            <div className='paBody'>
                <h1>Games</h1>
                <div className='search'>
                    <ResearchBar id="outlined-basic" label="Search" onChange={inputHandler}/>
                    <GamesLister input={inputText} />
                </div>
            </div>
        </div>
    );
}

export default Games;