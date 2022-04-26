import './../App.css';
import Sidebar from "./sidebar";
import Headband from "./Header";
import userdata from '../dummyData/test.json';
import presetdata from '../dummyData/test-preset.json'

import MmClient from "./mmClient";

import styled from 'styled-components';
import {React, useState} from "react";
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

function FriendsLister(research) {

    const refinedData = userdata[0].friends.filter((el) => { return el.username.toLowerCase().includes(research.input) })
        
    if (research.input === ''){
        return(
            <FriendList>
               {userdata[0].friends.map((game)=>(<FriendListed key={game.id} onClick={() => {}} >{game.username}</FriendListed>))} 
            </FriendList>
        );
    }
    else {
        return(
            <FriendList>
               {refinedData.map((game)=>(<FriendListed key={game.id} onClick={() => {}}>{game.username}</FriendListed>))} 
            </FriendList>
        )
    }
}

function PresetLauncher(){
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
                <div className='search'>
                    <ResearchBar id="outlined-basic" label="Search"  placeholder='Search' onChange={inputHandler}/>
                </div>
                <CoFi>Online Friends</CoFi>
                <FriendsLister input={inputText}/>
                <CoFi>Research match</CoFi>
                <PresetLauncher />

            </div>
        </div>
        
    );
}

export default Home;