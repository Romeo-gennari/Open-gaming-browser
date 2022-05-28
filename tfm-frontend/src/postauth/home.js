import './../App.css';
import Sidebar from "./sidebar";
import Headband from "./Header";

import styled from 'styled-components';
import {React, useState} from "react";
import { Button, Box, Text, Center, Image, Heading, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import GetFriends from './getters/GetFriends';
import GetPresets from './getters/GetPresets';

import api from '../api';

import logo from '../images/Logo_final.png';
import reverse_logo from '../images/revert_Logo_final.png';
import { FiKey } from 'react-icons/fi';

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
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button bg='#1A202C' colorScheme='orange' onClick={onOpen} position='absolute' right='10px'>Friends List</Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} >
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Friends List</DrawerHeader>
          <DrawerBody>
            {displayData()}
          </DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}




function PresetLauncher(presetdata){

    presetdata = presetdata.input;
    
    const [selected, select] = useState(0);
    const [color, setColor] = useState("green");
    const [searchin,setSearchin] = useState(true);
    const [activePreset,setActivePreset] = useState(0)

    let body;
    if(presetdata.length>0){
      body = presetdata[selected].name;
      //setActivePreset(presetdata[selected]);
      //console.log("Active:");
      //console.log(presetdata[selected]);
    }
    else{
      body = "Empty List";
    }
    
    function decSelect(){
        if(selected>0)select(selected-1);
        setActivePreset(presetdata[selected]);
        console.log(activePreset);
    }
    function incSelect(){
        if(selected<presetdata.length-1)select(selected+1);
        setActivePreset(presetdata[selected]);
        console.log(activePreset);
    }

    const [activeInterval, setActiveInterval] = useState(0);

    const handleSearch = (preset) => {
      setActiveInterval(setInterval(() => {
        console.log(searchin);
        getData();
        if(searchin==false){clearInterval(activeInterval)}
      }, 10000));
    }

    const [data, setData] = useState([]);
    
    const getData = () => {
      api.get ("/friends/presets")
        .then((response) => {
          console.log(response.data);
          setData(response.data);
          response.forEach(preset => {
            console.log(preset);
            preset.modes.forEach(exgamemode => {
              presetdata[selected].modes.forEach(locgamemode => {
                console.log("Loopin Hard");
                console.log(exgamemode);
                console.log(locgamemode);
                if(exgamemode.id==locgamemode.id){
                  alert("MATCH FOUND!!!!!!");
                  console.log(exgamemode);
                  console.log(locgamemode);
                  console.log("MATCH FOUND");
                }
              })
            })
        });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const [ isLoading, setIsLoading ] = useState(false); 

    function prevPresetButton() {
      decSelect();body=presetdata[selected].title;
      console.log('hello prev');
    }
    function prevPresetAnimation() {
      var element = document.getElementById("spin");
      element.classList.toggle("home-logo-reverse-spin");
      setIsLoading(current => !current);
      setTimeout(
        function(){
          element.classList.remove("home-logo-reverse-spin");
          element.classList.toggle("home-logo");
          setIsLoading(current => !current);
        }, 600);
      console.log('spin prev');
    }

    function nextPresetButton() {
      incSelect();body=presetdata[selected].title;
      console.log('hello next');
    }
    function nextPresetAnimation() {
      var element = document.getElementById("spin");
      element.classList.toggle("home-logo-spin");
      setIsLoading(current => !current);
      setTimeout(
        function(){
          element.classList.remove("home-logo-spin");
          element.classList.toggle("home-logo");
          setIsLoading(current => !current);
        }, 600);
      console.log('spin next');
    }

    return(
            <Center h='90vh'>
              <Button className='previous-button' mr='12vw' isDisabled={color === 'red' ? true : false || isLoading === true ? true : false } bg='#00C04B' colorScheme='green' size='md' zIndex={1} onClick={() => {prevPresetButton(); prevPresetAnimation();}}><ArrowBackIcon/></Button>
              <Box borderRadius='5px' borderWidth='2px' w={['17vh', '20vw']} borderColor='black' zIndex={1} position='absolute' textAlign='center'><Heading fontSize={['lg', '2xl']}>{activePreset.name}</Heading></Box>
              <Button className='match-button' isDisabled={ isLoading === true ? true : false } mt={['20vh', '12vw']} color='white' zIndex={1} colorScheme={color === 'red' ? 'red' : 'green'} size='lg' onClick={() => {searchin==true?setSearchin(false):setSearchin(true);clearInterval(activeInterval);console.log(searchin);handleSearch(presetdata[selected]);setColor((color) => (color === "red" ? "green" : "red"));}}>{color === 'red' ? <Text>Cancel</Text> : <Text>Launch</Text>}</Button>
              <Image className='home-logo' id="spin" h={['95vw', '95vh']} src={color === 'red' ? reverse_logo : logo} position='absolute' zIndex={0} />
              <Button className='next-button' ml='12vw' isDisabled={color === 'red' ? true : false || isLoading === true ? true : false } bg='#FF0000' colorScheme='red' size='md' zIndex={1} onClick={() => {nextPresetButton(); nextPresetAnimation();}}><ArrowForwardIcon/></Button>
            </Center>
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
            <DisplayFriends />
            <DisplayPresets />
          </div>
      </div>
      
  );
}
/*
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
}*/

export default Home;