import './../App.css';

import api from '../api';
import styled from 'styled-components';
import {React, useState} from "react";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@chakra-ui/react";

import Sidebar from './sidebar';
import Headband from "./Header";

import GetGames from './getters/GetGames';
import GetGameModes from './getters/GetGameModes';

const GameList = styled.div`
margin-top: 3vh;
display:flex;
flex-wrap: wrap;
`
const GameListed = styled.button`
text-align: center;
margin: 5px 5px;
border: solid black;
padding: 2px 2px 2px 2px;
width: 75vw;
background-color: black;
color: white;
font-family: "Helvetica";
`
const GameModeListed = styled.p`
text-align: center;
margin: 5px 5px;
border: solid black;
padding: 2px 2px 2px 2px;
width: 75vw;
background-color: white;
color: black;
font-family: "Helvetica";
`
function AddGameMode(id){

  const [newGameModeTitle, setNewGameModeTitle] = useState("");
  const [newGameModeMinP, setNewGameModeMinP] = useState(0);
  const [newGameModeMaxP, setNewGameModeMaxP] = useState(0);
  const [newGameModeTime, setNewGameModeTime] = useState(0);

  function handleAddGameMode(){
    if(newGameModeMinP!==0&&newGameModeMaxP!==0&&newGameModeTitle!==""&&newGameModeTime!==0){
      api.post("/gamemodes",{
        "name": newGameModeTitle,
        "minimum_players": parseInt(newGameModeMinP),
        "maximum_players": parseInt(newGameModeMaxP),
        "estimated_time_min": parseInt(newGameModeTime),
        "game_id": parseInt(id.input)
      }).then(console.log);
    }
    
  }

  return(
      <div>
          <Popover>
              <PopoverTrigger>
                  <Button>Add Gamemode</Button>
              </PopoverTrigger>
              <PopoverContent w='auto' padding={1}>
                
                <input placeholder="Title" onChange={event => setNewGameModeTitle(event.target.value)} />
                <input placeholder="Minimum Players" onChange={event => setNewGameModeMinP(event.target.value)} />
                <input placeholder="Maximum Players" onChange={event => setNewGameModeMaxP(event.target.value)} />
                <input placeholder="Time" onChange={event => setNewGameModeTime(event.target.value)} />
                <button onClick={()=>{handleAddGameMode()}}>Submit</button>

              </PopoverContent>
          </Popover>
      </div>
  );
}


function SearchBar (Data){
    const [query, setQuery] = useState("")
    Data = Data.input;
    var Gamemodes = GetGameModes();
    console.log(Gamemodes);
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
          }).sort(
            function(a, b){
              let x = a.name.toLowerCase();
              let y = b.name.toLowerCase();
              if (x < y) {return -1;}
              if (x > y) {return 1;}
              return 0;
            } 
          ).map((game) => (
            <Popover>
              <PopoverTrigger>
                <GameListed key={game.id} onClick={() => {}}>
                  {game.name}
                </GameListed>
              </PopoverTrigger>
              <PopoverContent w='auto' padding={1}>
              
                    {Gamemodes.filter(gamemode => {
                        if(gamemode.game.id===game.id){return gamemode};
                    }).map((gamemode) => (
                        
                        <Popover trigger='hover'>
                            <PopoverTrigger>
                                <GameModeListed>
                                    {gamemode.name}
                                </GameModeListed>
                            </PopoverTrigger>
                            <PopoverContent>
                                    <p>
                                        Max:{gamemode.maximum_players}<br></br>
                                        Min:{gamemode.minimum_players}<br></br>
                                        Time:{gamemode.estimated_time_min}
                                    </p>
                            </PopoverContent>
                        </Popover>
                            
                        
                    )

                    )}
                <AddGameMode input={game.id}/>
              </PopoverContent>
          </Popover>
          ))}
            
          </GameList>
      </div>
    )
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

function Gamemodes(){
    return(
        <div className="pApp">
            <Sidebar />
            <Headband />
            <div className='paBody'>
                <h1>Gamemodes</h1>
                <Gamess />
            </div>
        </div>
    );
}

export default Gamemodes;