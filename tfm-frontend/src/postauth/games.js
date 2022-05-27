import './../App.css';

import api from '../api';
import styled from 'styled-components';
import {React, useState, useEffect} from "react";
import { Box, Popover, PopoverTrigger, PopoverContent, Button } from "@chakra-ui/react";

import Sidebar from './sidebar';
import Headband from "./Header";

import GetGames from './tgetters/GetGames';
import GetEditors from './tgetters/GetEditors';
import GetPublishers from './tgetters/GetPublishers';

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
width: 18vw;
min-width: 280px;
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

let games,editors,publishers;

function AddGame(){

  const [newGameTitle, setNewGameTitle] = useState("");
  const [newGameEditor, setNewGameEditor] = useState("");
  const [newGameEditorId, setNewGameEditorId] = useState(-1);
  const [newGamePublisher, setNewGamePublisher] = useState("");
  const [newGamePublisherId, setNewGamePublisherId] = useState(-1);
  const [newGamePoster, setNewGamePoster] = useState("");
  const [newGameRelease, setNewGameRelease] = useState("");
  const [newGameDescription, setNewGameDescription] = useState("");

  games = GetGames();
  editors = GetEditors();
  publishers = GetPublishers();

  function handleAddGame(){
    if(newGameEditorId!=-1&&newGamePublisherId!=-1&&newGameTitle!=""){
      api.post("/games",{
        name: newGameTitle,
        release_date: newGameRelease,
        image_url: newGamePoster,
        description: newGameDescription,
        editor_id: newGameEditorId,
        publisher_id: newGamePublisherId,
      }).then(console.log);
      setNewGameTitle("");
      setNewGameRelease("");
      setNewGamePoster("");
      setNewGameDescription("");
      setNewGameEditorId(-1);
      setNewGameEditor("");
      setNewGamePublisherId(-1);
      setNewGamePublisher("");
      window.location.reload(false);
    }
    
  }

  return(
      <div>
          <Popover>
              <PopoverTrigger>
                  <Button>Add Game</Button>
              </PopoverTrigger>
              <PopoverContent w='auto' padding={1}>
                <input placeholder="Title" onChange={event => setNewGameTitle(event.target.value)} />
                {games.filter(game => {
                  if (newGameTitle === '') {}
                  else if (game.name.toLowerCase().includes(newGameTitle.toLowerCase())) {return game;}
                }).map((game) => (<p key={game.id} onClick={() => {}}>{game.name}</p>))}

                <input placeholder="Studio" value={newGameEditor} onChange={event => setNewGameEditor(event.target.value)} />
                {editors.filter(game => {
                  if (newGameEditor === ''|| newGameEditorId!=-1) {}
                  else if (game.name.toLowerCase().includes(newGameEditor.toLowerCase())) {return game;}
                }).map((game) => (<p key={game.id} onClick={() => {setNewGameEditorId(game.id);setNewGameEditor(game.name)}}>{game.name}</p>))}

                <input placeholder="Publisher" value={newGamePublisher } onChange={event => {setNewGamePublisher(event.target.value);setNewGamePublisherId(-1)}} />
                {publishers.filter(game => {
                  if (newGamePublisher === '' || newGamePublisherId!=-1) {}
                  else if (game.name.toLowerCase().includes(newGamePublisher.toLowerCase())) {return game;}
                }).map((game) => (<p key={game.id} onClick={() => {setNewGamePublisherId(game.id);setNewGamePublisher(game.name)}}>{game.name}</p>))} 

                <input placeholder="Poster" onChange={event => setNewGamePoster(event.target.value)} />
                <input placeholder="YYYY/MM/DD" onChange={event => setNewGameRelease(event.target.value)} />
                <input placeholder="Description" onChange={event => setNewGameDescription(event.target.value)} />
                <button onClick={()=>{handleAddGame()}}>Submit</button>

              </PopoverContent>
          </Popover>
      </div>
  );
}

function AddEditor(){

  const [newGameEditor, setNewGameEditor] = useState("");

  editors = GetEditors();

  function handleAddEditor(){
    if(newGameEditor!=""){
      api.post("/editors",{
        name: newGameEditor
      }).then(console.log);
      setNewGameEditor("");
      window.location.reload(false);
    }
    
  }

  return(
      <div>
          <Popover>
              <PopoverTrigger>
                  <Button>Add Studio</Button>
              </PopoverTrigger>
              <PopoverContent w='auto' padding={1}>
                
                <input placeholder="Studio" onChange={event => setNewGameEditor(event.target.value)} />
                {editors.filter(game => {
                  if (newGameEditor === '') {}
                  else if (game.name.toLowerCase().includes(newGameEditor.toLowerCase())) {return game;}
                }).map((game) => (<p key={game.id} onClick={() => {}}>{game.name}</p>))}

                <button onClick={()=>{handleAddEditor()}}>Submit</button>

              </PopoverContent>
          </Popover>
      </div>
  );
}

function AddPublisher(){

  const [newGamePublisher, setNewGamePublisher] = useState("");

  publishers = GetPublishers();

  function handleAddPublisher(){
    if(newGamePublisher!=""){
      api.post("/publishers",{
        name: newGamePublisher
      }).then(console.log);
      setNewGamePublisher("");
      window.location.reload(false);
    }
    
  }

  return(
      <div>
          <Popover>
              <PopoverTrigger>
                  <Button>Add Publisher</Button>
              </PopoverTrigger>
              <PopoverContent w='auto' padding={1}>
                
                <input placeholder="Publisher" onChange={event => setNewGamePublisher(event.target.value)} />
                {publishers.filter(game => {
                  if (newGamePublisher === '') {}
                  else if (game.name.toLowerCase().includes(newGamePublisher.toLowerCase())) {return game;}
                }).map((game) => (<p key={game.id} onClick={() => {}}>{game.name}</p>))}

                <button onClick={()=>{handleAddPublisher()}}>Submit</button>

              </PopoverContent>
          </Popover>
      </div>
  );
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
          }).sort(
            function(a, b){
              let x = a.name.toLowerCase();
              let y = b.name.toLowerCase();
              if (x < y) {return -1;}
              if (x > y) {return 1;}
              return 0;
            } 
          ).map((game) => (
            <Popover trigger='hover'>
              <PopoverTrigger>
                <GameListed key={game.id} onClick={() => {}}>
                  {game.name}<GameImg src={game.image_url} alt="img ?"></GameImg>
                </GameListed>
              </PopoverTrigger>
              <PopoverContent w='auto' padding={1}>
              
                  <div style={{display:"flex"}}>
                    <p>{game.editor.name},</p>              
                    <p>{game.publisher.name},</p>
                    <p>{game.release_date.slice(0,4)},</p>
                    <p>{game.description}</p>
                  </div>

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

function Games(){
    return(
        <div className="pApp">
            <Sidebar />
            <Headband />
            <div className='paBody'>
                <div style={{display: "inline-flex"}}>
                  <AddGame />
                  <AddEditor />
                  <AddPublisher />
                </div>
                <h1>Games</h1>
                <Gamess />
            </div>
        </div>
    );
}

export default Games;