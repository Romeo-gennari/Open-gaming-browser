import './../App.css';
import Sidebar from "./sidebar";
import Headband from "./Header";

import styled from 'styled-components';
import {React, useState} from "react";
import {  Modal, ModalOverlay, ModalBody, ModalHeader, ModalFooter, ModalContent, Button, Box, Text, Center, Image, Heading, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerContent, DrawerCloseButton, useDisclosure } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import GetFriends from './getters/GetFriends';
import GetPresets from './getters/GetPresets';

import api from '../api';

import logo from '../images/Logo_final.png';
import reverse_logo from '../images/revert_Logo_final.png';
import { FiKey } from 'react-icons/fi';

import { useNavigate } from "react-router-dom";

const ResearchBar = styled.input`
border-width: 1px;
border-radius: 5px;
padding: 3px 3px 3px 3px;
margin: 3px 3px 3px 3px;
`

const FriendList = styled.div`
display:flex;
flex-direction:column;
align:left;
`
const FriendListed = styled.a`
border: solid black;
border-radius: 5px;
padding: 3px 3px 3px 3px;
margin: 3px 3px 3px 3px;
color: grey;
display: flex;
text-align: left;
background-color: white;
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
      <Button bg='#1A202C' colorScheme='orange' onClick={onOpen} position='absolute' right='1vw'>Friends List</Button>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
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
    //const [activePreset,setActivePreset] = useState({name:"emptylist?"});
    let activePreset = presetdata[selected];

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
    

    const [activeInterval, setActiveInterval] = useState(0);
    const [matchFound, setMatchFound] = useState(false);
    const [matches, setMatches] = useState([]);

    const getData = () => {
      if(searchin===true && matchFound===false){
        let matches = [];
        api.get ("/friends/presets")
        .then((response) => {
          response.data.forEach(preset => {
            preset.modes.forEach(exgamemode => {
              presetdata[selected].modes.forEach(locgamemode => {
                if(preset.enabled&&exgamemode.id==locgamemode.id){
                  console.log("MATCH FOUND");
                  matches.push({
                    username:preset.user.username,
                    userid:preset.user.id,
                    gamename:exgamemode.game.name,
                    gameid:exgamemode.game.id,
                    gamemodename:exgamemode.name,
                    gamemodeid:exgamemode.id
                  });

                }
              })
            })
        });
        if(matches.length>0){
          setMatchFound(true);
          console.log(matches);
          setMatches(matches);
          setSearchin(false);
          clearInterval(activeInterval);
        }
        })
        .catch((error) => {
          console.log(error);
        });

      }//END OF THE IF NOTFOUND CONDITION
        
    };

    const handleSearch = () => {
      setActiveInterval(setInterval(() => {
        if(searchin===true && matchFound===false){
          getData();
          nextPresetAnimation();
        }
        else{
          window.location.reload(false);
        }
      }, 5000));
    }
    
    const [ isLoading, setIsLoading ] = useState(false); 

    function prevPresetButton() {
      if(selected>0){body=presetdata[selected-1].name;activePreset=presetdata[selected-1];select(selected-1);prevPresetAnimation();};
      console.log(activePreset);
      console.log('hello prev');
    }
    function prevPresetAnimation() {
      var element = document.getElementById("spin");
      element.classList.toggle("home-logo-reverse-spin");
      setIsLoading(current => !current);
      setTimeout(
        function(){
          element.classList.remove("home-logo-reverse-spin");
          setIsLoading(current => !current);
        }, 600);
      console.log('spin prev');
    }

    function nextPresetButton() {
      if(selected<presetdata.length-1){body=presetdata[selected+1].name;activePreset=presetdata[selected+1];select(selected+1);nextPresetAnimation();};
      console.log(activePreset);
      console.log('hello next');
    }
    function nextPresetAnimation() {
      var element = document.getElementById("spin");
      element.classList.toggle("home-logo-spin");
      setIsLoading(current => !current);
      setTimeout(
        function(){
          element.classList.remove("home-logo-spin");
          setIsLoading(current => !current);
        }, 600);
      console.log('spin next');
    }

    
    let navigate = useNavigate();
    const HandleAcceptGame =() => {
      //What do I do ?
      navigate('/Friends');
    }

    return(
            <Center h='90vh'>
              <Button className='previous-button' mr='12vw' isDisabled={color === 'red' ? true : false || isLoading === true ? true : false || selected === 0 ? true : false } bg='#00C04B' colorScheme='green' size='md' zIndex={1} onClick={() => {prevPresetButton();}}><ArrowBackIcon/></Button>
              <Box borderRadius='5px' borderWidth='2px' w={['17vh', '20vw']} borderColor='black' zIndex={1} position='absolute' textAlign='center'><Heading fontSize={['lg', '2xl']}>{body}</Heading></Box>
              <Button className='match-button' isDisabled={ isLoading === true ? true : false } mt={['20vh', '12vw']} color='white' zIndex={1} colorScheme={color === 'red' ? 'red' : 'green'} size='lg' onClick={() => {searchin==true?setSearchin(false):setSearchin(true);clearInterval(activeInterval);console.log(searchin);handleSearch(presetdata[selected]);setColor((color) => (color === "red" ? "green" : "red"));}}>{color === 'red' ? <Text>Cancel</Text> : <Text>Launch</Text>}</Button>
              <Image className='home-logo' id="spin" h={['95vw', '95vh']} src={color === 'red' ? reverse_logo : logo} position='absolute' zIndex={0} />
              <Button className='next-button' ml='12vw' isDisabled={color === 'red' ? true : false || isLoading === true ? true : false || selected === presetdata.length-1 ? true : false } bg='#FF0000' colorScheme='red' size='md' zIndex={1} onClick={() => {nextPresetButton();}}><ArrowForwardIcon/></Button>
              <div className="mmClient" >
                <Modal isOpen={matchFound}>
                    <ModalOverlay/>
                    <ModalContent alignItems='center' margin='auto' textAlign='center' w='auto' maxW='800px'>
                        <ModalHeader justifyContent='center'><Heading color='red' fontSize={{ base: '20px', md:'24px', lg:'32px'}}>You have found a Match!</Heading></ModalHeader>
                        <ModalBody justifyContent='center'>
                           {matches.map((match)=>{
                             return(<Box>Matched <b>{match.username}</b> on gamemode <b>{match.gamemodename}</b> from game <b style={{color: 'red'}}>{match.gamename}</b> </Box>)
                           })}
                        </ModalBody>
                        <ModalFooter>
                            <Center>
                                <Button mr='2%' bg='green' color='white' colorScheme='green' onClick={()=>{setMatches([]);HandleAcceptGame()}}>Accept</Button>
                                <Button ml='2%' bg='red' color='white' colorScheme='red' onClick={()=>{setMatches([]);window.location.reload(false)}}>Decline</Button>
                            </Center>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
              </div>
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
            <Heading position='absolute'>Start Launching !</Heading>
            <DisplayFriends />
            <DisplayPresets />
          </div>
      </div>
  );
}

export default Home;