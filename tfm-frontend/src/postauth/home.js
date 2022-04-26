import './../App.css';
import Sidebar from "./sidebar";
import Headband from "./Header";

import styled from 'styled-components';
import {React, useState, useEffect} from "react";
import axios from 'axios';
import {Box} from "@chakra-ui/react"

const ResearchBar = styled.input`
color: black;
width: 85vw;
padding: 3px 3px 3px 3px;
margins: 3px 3px 3px 3px;
`

const FriendList = styled.div`
display:flex;
flex-direction:column;
align:left;
`
const FriendListed = styled.a`
margin: 5px 5px;
border: solid black;
padding: 2px 2px 2px 2px;
width: 85vw;
height: 75px;
color: grey;
font-size: 30px;
text-align: left;
background-color: white;
`

const Launcher = styled.div`
margin: 5px 5px;
border: solid black;
width: 85vw;
height: 20vh;
background-color: white;
justify-content: center;
align-items: center;
`

const PresetSelector = styled.div`
display: flex;
margin-left: auto;
margin-right: auto;
`

const GenericButton = styled.button`
border: 1px solid black;
`

const GreenButton = styled.button`
border: 1px solid black;
background-color: green;
color: white;
`

const YellowButton = styled.button`
border: 1px solid black;
background-color: yellow;
color: white;
`

const CoFi = styled.h1`
font-size: 30px;
padding: 3px 3px 3px 3px;
color: green;
`

function GetFriends() {
    const [data, setData] = useState("");
    
    const getData = () => {
      axios
        .get ("http://localhost:5051/friends.json")
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
    useEffect(() => {
      getData();
    }, []);
    
    return(
      data
    );
}

function SearchBar (Data){
    const [query, setQuery] = useState("")
    Data = Data.input;
    console.log(Data);
    return(
      <div>
          <input placeholder="Research" onChange={event => setQuery(event.target.value)} />
          <FriendList>
          {Data.filter(friend => {
            if (query === '') {
                return friend;
            }
            else if (friend.username.toLowerCase().includes(query.toLowerCase())) {
              return friend;
            }
          }).map((friend) => (<FriendListed key={friend.id} onClick={() => {}} >{friend.username}</FriendListed>))}
            
            </FriendList>
      </div>
    )
}

function DisplayFriends(){
    const data = GetFriends();
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

function GetPresets() {
    const [data, setData] = useState("");
    
    const getData = () => {
      axios
        .get ("http://localhost:5051/presets.json")
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
    useEffect(() => {
      getData();
    }, []);
    
    return(
      data
    );
}

function PresetLauncher(presetdata){

    presetdata = presetdata.input;
    
    const [selected, select] = useState(0);
    const [color, setColor] = useState("green");

    let body = presetdata[selected].title;
    function decSelect(){
        if(selected>0)select(selected-1);
    }
    function incSelect(){
        if(selected<presetdata.length-1)select(selected+1);
    }
    function getTitle(){
        return(presetdata[selected].title)
    }
    return(
        <Launcher>
            <style>{`.red {color: red}.green {color: green}`}</style>
            <PresetSelector>
                <GenericButton onClick={()=>{decSelect();body=presetdata[selected].title;}}>L</GenericButton>
                <button>{body}</button>
                <GenericButton onClick={()=>{incSelect();body=presetdata[selected].title;}}>R</GenericButton>
            </PresetSelector>
            <button className={color} onClick={()=>{alert("Preset "+ {getTitle} +" ignited!");setColor((color) => (color === "red" ? "green" : "red"));}}>START</button>
        </Launcher>
    );
}

function DisplayPresets(){
    const data = GetPresets();
    console.log(data);
    const displayData = () => {
    return data ? (
      <div>
        <PresetLauncher input={data}/>
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

function Home(){

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        var lowercase = e.target.value.toLowerCase();
        setInputText(lowercase);
    };

    return(
        <div className="pApp">
            <Sidebar />
            <Headband />
            <div className="paBody">
                <CoFi>Online Friends</CoFi>
                <DisplayFriends />
                <CoFi>Research match</CoFi>
                <DisplayPresets />

            </div>
        </div>
        
    );
}

export default Home;