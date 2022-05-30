import '../App.css';
import Sidebar from "./sidebar";
import Headband from "./Header";
import userdata from '../dummyData/test-preset.json';
import { Flex, Input, Button, Modal, useDisclosure, ModalContent, ModalHeader, ModalOverlay, Center,Box, FormControl, ModalBody, FormLabel, ModalFooter, useMediaQuery, Heading, Text, Popover, PopoverTrigger, PopoverContent} from '@chakra-ui/react';
import axios from "axios";
import { useEffect, useState } from "react";

import styled from "styled-components";
import GetPresets from './getters/GetPresets';
import GetGames from './getters/GetGames';
import api from '../api';
import GetGameModes from './getters/GetGameModes';
import GetPresetGames from './getters/GetPresetGames';

const LeLibraryList = styled.div`
display:flex;
flex-direction:row;
flex-wrap: wrap;
align:left;
@media (orientation: portrait){
  flex-direction:column;
  align-items: center;
}
`
const LeLibraryListed = styled.a`
margin: 5px 5px;
border: solid black;
border-radius: 5px;
padding: 2px 2px 2px 2px;
width: fit-content;
height: fit-content;
color: grey;
font-size: 30px;
text-align: center;
background-color: white;
display: flex;
flex-direction: column;
align-items: center;
`
const LibraryButton = styled.button`
border: 2px solid red;
border-radius: 5px;
margin-left: 10px;
margin-right: 10px;
font-size: 20px;
color: red;
`
const TagList = styled.div`
border: 1px solid black;
border-radius: 5px;
display: flex;
flex-direction: column;
width: 20vw;
padding: 2px 2px 2px 2px;
overflow-y: scroll;
overflow-x: hidden;
@media (orientation: portrait){
  width: 60vw;
}
`
const Tagged = styled.div`
background-color: rgba(255,181,30,1);
width: 100%;
height: auto;
font-size: 2vh;
border: 1px solid black;
border-radius: 5px;
padding: 2px 2px 2px 2px;
margin: 1px 1px 1px 1px;
`
const GameResearch = styled.input`
height: 3vh;
width: 9vw;
font-size: 2vh;
border: 1px solid black;
border-radius: 3px;
padding: 2px 2px 2px 2px;
margin: 1px 1px 1px 1px;
`


function AddPreset(){
  let Gamedata = GetGames();
  var Gamemodes = GetGameModes();
  const [newtitle, editnewtitle] = useState("");
  const [newlist, editnewlist] = useState([]);
  const [newgmlist,editnewgmlist] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState("");

  const putGameMode = (res,element) => {
    api.put("/presets/"+res.data.id+"/modes/"+element).then(window.location.reload(false));
  }

  const handleAddPreset = (event) => {
    api.post("/presets",{name:newtitle,type:"classic"}).then((res)=>{newgmlist.forEach(element => {putGameMode(res,element)});});
  }

  function handleRemoveGame(id){
    let temp = newlist;
    for(let i=0;i<newlist.length;i++){
      console.log(newlist[i]);
      if(newlist[i].id==id){
        temp.splice(i,1);
        console.log(temp);
        editnewlist(temp);
        return;
      }
    }

  }

  return(
    <div>
    <Center>
      <Button m='1vw' onClick={onOpen} bg='red' color='white' w='4vh' h='4vh' colorScheme='red'>+</Button>
    </Center>
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} >
          <ModalOverlay />
          <ModalContent margin='auto' alignItems='center' w='full' ml='5%' mr='5%'>
              <ModalHeader color='red'>New Preset</ModalHeader>
              <ModalBody>
                <form onSubmit={handleAddPreset}>
                  <FormControl alignSelf='center' m='auto'>
                    <FormLabel>Title:</FormLabel>
                    <Input isRequired type='text' id='title' placeholder="Preset Title" value={newtitle} onChange={({target}) => editnewtitle(target.value)} mb='5%'/>
                    <FormLabel>Preset Games:</FormLabel>
                    <Input type='text' placeholder="Research" value={query} onChange={event => setQuery(event.target.value)}/>
                    <Box borderWidth='1px' borderColor='black' borderRadius='5px' w='auto' h={['50px', '80px']} overflowY='auto'>
                      {Gamedata.filter(post => {
                        if (query == '') {}
                        else if (post.name.toLowerCase().includes(query.toLowerCase())) {
                          return post;
                        }
                        }).map((game) => (
                          <Popover>
                            <PopoverTrigger>
                              <Box className="box" key={game.id}>
                                <Box borderWidth='1px' role='button' _hover={{backgroundColor: '#D3D3D3'}}>{game.name}</Box>
                              </Box>
                            </PopoverTrigger>
                            <PopoverContent>
                            {Gamemodes.filter(gamemode => {
                                if(gamemode.game.id==game.id){return gamemode};
                            }).map((gamemode) => (
                                
                                <Popover trigger='hover'>
                                    <PopoverTrigger>
                                        <div onClick={ () => {newlist.push(game.name+":"+gamemode.name);newgmlist.push(gamemode.id);console.log(newlist);setQuery("")}}>
                                            {gamemode.name}
                                        </div>
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
                            </PopoverContent>
                          </Popover>
                          
                      ))}
                    </Box>
                    <FormLabel mt='5%'>Games Added:</FormLabel>
                    <Box borderWidth='1px' borderColor='black' borderRadius='5px' w={[175, 280, 350]} h={[50, 80, 100]} overflowY='auto'>
                      <Flex flexWrap='wrap'>
                        {newlist.map((game)=>(
                          <Button w='-moz-fit-content' maxH='30px' m='1px' borderWidth='1px' borderColor='black' borderRadius='5px' alignContent='center' textAlign='center' key={game} onClick={()=>{handleRemoveGame(game.id)}}>{game}</Button>
                        ))}
                      </Flex>
                    </Box>
                  </FormControl>
                </form>
              </ModalBody>
              <ModalFooter>
                <Center mb='3%'>
                  <Button onClick={()=>{onClose();editnewlist([]);editnewtitle("");}} bg='red' colorScheme='red' w='45%' mr='1%'>Cancel Changes</Button>
                  <Button type='submit' bg='orange' colorScheme='orange' w='45%' ml='1%' onClick={ ()=>{handleAddPreset()} }>Save Preset</Button>
                </Center>
              </ModalFooter>
          </ModalContent>
      </Modal>
      </div>
  );
}

function PresetList(presetdata){

  //Experimental way to get the gamedata  
    //const [ data, setdata] = useState(presetdata.input)
    var data = GetPresets();


    function handleDelete(id){
        api.delete("/presets/"+id).then(alert("Preset removed!"));
        window.location.reload(false);
    }

    function handleActivate(id,status){
      console.log(status);
      if(status) api.patch("/presets/"+id,{enabled:false});
      else api.patch("/presets/"+id,{enabled:true});
      window.location.reload(false);
    }

    const [isLarge] = useMediaQuery('(min-width: 560px)')
    data.forEach(element => {element.games=[]});

    return(
        <div>
            {isLarge ? 
            <LeLibraryList>
            {data.map((preset)=>(
              <Box className='library-list' m='5px' border='solid' borderColor='black' borderRadius='5px' p='1vw' w='25vw' h='fit-content' color='black'
              textAlign='center' backgroundColor='white' display='flex' flexDir='column' alignItems='center' key={preset.id}>
                  <Heading>{preset.name}</Heading>
                  <TagList className='game-list' >
                    <Text>Games: </Text>
                      {preset.modes.map((game)=>(
                          <Tagged key={game.id}>{game.game.name} : {game.name}</Tagged>
                      ))}
                  </TagList>
                  <Flex flexDir='row' justifyContent='center' m='2px' zIndex={20} w='full' >
                    <Button _hover={{borderColor: 'black', color: 'white', backgroundColor: preset.enabled?"green":"red"}} size='md' m='1%' color={preset.enabled?"green":"red"} bg='white' borderWidth='1px' borderColor={preset.enabled?"green":"red"} onClick={()=>{handleActivate(preset.id,preset.enabled);}}>{preset.enabled?"Enabled":"Disabled"}</Button>
                    <Button _hover={{borderColor: 'black', color: 'white', backgroundColor: 'black'}} size='md' m='1%' color='black' bg='white' borderWidth='1px' borderColor='black' colorScheme='gray'>Edit</Button>
                    <Button _hover={{borderColor: 'black', color: 'white', backgroundColor: 'red'}} size='md' m='1%' color='red' bg='white' borderWidth='1px' borderColor='red' onClick={()=>{handleDelete(preset.id);}}>Delete</Button>
                  </Flex>
              </Box>
            ))} 
            </LeLibraryList>
            :
            <LeLibraryList>
            {data.map((preset)=>(
              <Box className='library-list' m='5px' border='solid' borderColor='black' borderRadius='5px' p='1vw' w='65vw' h='fit-content' color='black'
              textAlign='center' backgroundColor='white' display='flex' flexDir='column' alignItems='center' key={preset.id}> 
                  <Heading>{preset.name}</Heading>
                  <TagList className='game-list' >
                    <Text>Games: </Text>
                      {preset.modes.map((game)=>(
                          <Tagged key={game.id}>{game.game.name} : {game.name}</Tagged>
                      ))}
                  </TagList>
                  <Flex flexDir='column' justifyContent='center' m='2px' zIndex={20} w='full' >
                    <Button _hover={{borderColor: 'black', color: 'white', backgroundColor: preset.enabled?"green":"red"}} size='xs' m='1%' color={preset.enabled?"green":"red"} bg='white' borderWidth='1px' borderColor={preset.enabled?"green":"red"} nClick={()=>{handleActivate(preset.id,preset.enabled);}}>{preset.enabled?"Enabled":"Disabled"}</Button>
                    <Button _hover={{borderColor: 'black', color: 'white', backgroundColor: 'black'}} size='xs' m='1%' color='black' bg='white' borderWidth='1px' borderColor='black' colorScheme='gray'>Edit</Button>
                    <Button _hover={{borderColor: 'black', color: 'white', backgroundColor: 'red'}} size='xs' m='1%' color='red' bg='white' borderWidth='1px' borderColor='red' onClick={()=>{handleDelete(preset.id);}}>Delete</Button>
                  </Flex>
              </Box>
            ))} 
            </LeLibraryList>
            }
            <AddPreset/>
        </div>
    );
}

function DisplayPresets(){
    const data = GetPresets();
    const displayData = () => {
    return data ? (
      <div>
        <PresetList input={data}/>
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

function Library(){
    return(
        <div className="pApp">
            <Sidebar />
            <Headband />
            <div className="paBody">
                <Heading textAlign='center' mb='1%'>Presets Library</Heading>
                <PresetList/>
            </div>
        </div>
    );
}

export default Library;