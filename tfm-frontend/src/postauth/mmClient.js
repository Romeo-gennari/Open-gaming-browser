import axios from "axios";
import { Link } from "@chakra-ui/react";
import {React, useState} from "react";
import styled from 'styled-components';
import gamedata from './../dummyData/games.json';

import refinedData from './../dummyData/games.json'

const ResearchBar = styled.input`
color: black;
heigth: 400px;
`
const NoBox = styled.div`
    width = 1vw;
    background-color: white;
`

const savedgames = ['Portal','Portal2','Fallout4'];
const allgames = ['Fallout:NewVegas','Fallout3','PortalRE'];

function tester(){
    return(
        <p>Waiting for a game</p>
    )
}

function ResearchMatches(gameid){
    //axios.post("http://localhost:5050/user/Leowenex/request/"+gameid).then(res=>{console.log(res)});
    const bros = [{"id":1,"username":"Gamaha"},{"id":2,"username":"Mephiles"},{"id":3,"username":"Berne"},{"id":4,"username":"Notafly"}]
    console.log(gameid);
    console.log(bros);
    return(
        <div>
            <ul>
            {bros.map((friend)=>(<li key={friend.id}><Link href="Profile"><h1>{friend.username}</h1></Link></li>))}
            </ul>
        </div>
    )
}

function MmGamesList(research) {
    const [active, setActive] = useState(subpages[0]);
    var results = ResearchMatches(game.id)

    const refinedData = gamedata.filter((el) => { return el.text.toLowerCase().includes(research.input) })
    var results = tester();

    if (research.input === ''){
        return(
            <p></p>
        );
    }
    else {
        return(
            <div>
                <ul>
                    {refinedData.map((game)=>(<li key={game.id} ><button onClick={() => {setter(game.id,game.text);results=ResearchMatches(game.id);}}>{game.text}</button></li>))}
                </ul>
                <div>
                    {results}
                </div>
            </div>
        )
    }
}

function MmGameSelect() {

    const [inputText, setInputText] = useState(test);
    let inputHandler = (e) => {
        var lowercase = e.target.value.toLowerCase();
        setInputText(lowercase);
    };

    return (
        <div className="App">
            <header className="App-header">
                <div className='search'>
                    <ResearchBar id="outlined-basic" label="Search" onChange={inputHandler}/>
                </div>

                <MmGamesList input={inputText}/>
            </header>
            
        </div>    
  );
}

function MmClient(){
    return(
        <NoBox>
            <h3>Matchmaker</h3>
            <MmGameSelect/>
            <p>The life is transcient, and i needed something to close the div.</p>
        </NoBox>
    )
}

export default MmClient;