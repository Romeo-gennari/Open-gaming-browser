import './../App.css';
import Sidebar from "./sidebar";
import Headband from "./Header";

import styled from 'styled-components';
import {React, useState} from "react";
import { Button, Box, Text, Flex, Spacer } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

import GetFriends from './getters/GetFriends';
import GetPresets from './getters/GetPresets';

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

const CoFi = styled.h1`
font-size: 30px;
padding: 3px 3px 3px 3px;
color: green;
`



function SearchBar (Data){
    const [query, setQuery] = useState("")
    Data = Data.input;
    console.log(Data);
    return(
      <div>
          <ResearchBar placeholder="Research" onChange={event => setQuery(event.target.value)} />
          <FriendList>
          {Data.filter(friend => {
            if (query === '') {
                return friend;
            }
            else if (friend.user2.username.toLowerCase().includes(query.toLowerCase())) {
              return friend;
            }
          }).map((friend) => (<FriendListed key={friend.user2.id} onClick={() => {}} >{friend.user2.username}</FriendListed>))}
            
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
            <style>{`.red {background-color: #FF0000}.green {background-color: #00C04B}`}</style>
            <PresetSelector>
              <Flex w='auto'>
                <Button bg='#00C04B' colorScheme='green' size='sm' onClick={()=>{decSelect();body=presetdata[selected].title;}}><ArrowBackIcon/></Button>
                <Spacer/>
                <Box borderRadius='5px' borderWidth='2px' borderColor='black'>{body}</Box>
                <Spacer/>
                <Button bg='#FF0000' colorScheme='red' size='sm' onClick={()=>{incSelect();body=presetdata[selected].title;}}><ArrowForwardIcon/></Button>
              </Flex>            
            </PresetSelector>
            <Button className={color} color='white' colorScheme={color === 'red' ? 'red' : 'green'} onClick={()=>{alert("Preset "+ {getTitle} +" ignited!");setColor((color) => (color === "red" ? "green" : "red"));}}>{color === 'red' ? <Text>END</Text> : <Text>START</Text>}</Button>
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