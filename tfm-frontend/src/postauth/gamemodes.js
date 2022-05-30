import './../App.css';

import api from '../api';
import styled from 'styled-components';
import {React, useState} from "react";
import { VStack, Popover, PopoverTrigger, PopoverContent, Button, Heading, Text, Center, Input, useMediaQuery, Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, PopoverArrow } from "@chakra-ui/react";

import Sidebar from './sidebar';
import Headband from "./Header";

import GetGames from './tgetters/GetGames';
import GetGameModes from './tgetters/GetGameModes';

const GameList = styled.div`
margin-top: 3vh;
display:flex;
flex-wrap: wrap;
justify-content: center;
margin-bottom: 3vh;
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
      window.location.reload(false);
    }
    
  }

  const [isLarge] = useMediaQuery('(min-width: 520px)');

  return(
      <div>
          <Popover>
              <PopoverTrigger>
                {isLarge ?
                  <Button bg='#1A202C' mt='12px' color='white' _hover={{background: 'black', color: 'orange' }}>Add Gamemode</Button>
                  :
                  <Button size='sm' bg='#1A202C' mt='12px' color='white' _hover={{background: 'black', color: 'orange' }}>Add Gamemode</Button>
                }
              </PopoverTrigger>
              <PopoverContent w='auto' padding='2' bg='#1A202C'>
                <PopoverArrow/>
                <Input w={['50vw', '30vw']} bg='white' mb='1px' color='black' placeholder="Title" onChange={event => setNewGameModeTitle(event.target.value)} />
                <Input w={['50vw', '30vw']} bg='white' mb='1px' color='black' placeholder="Minimum Players" onChange={event => setNewGameModeMinP(event.target.value)} />
                <Input w={['50vw', '30vw']} bg='white' mb='1px' color='black' placeholder="Maximum Players" onChange={event => setNewGameModeMaxP(event.target.value)} />
                <Input w={['50vw', '30vw']} bg='white' mb='1px' color='black' placeholder="Time" onChange={event => setNewGameModeTime(event.target.value)} />
                <Button bg='white' color='gray' _hover={{color: 'white', backgroundColor: '#23395D'}} onClick={()=>{handleAddGameMode()}}>Submit</Button>
              </PopoverContent>
          </Popover>
      </div>
  );
}


function SearchBar (Data){
    const [query, setQuery] = useState("")
    const [isLarge] = useMediaQuery('(min-width: 520px)');
    Data = Data.input;
    var Gamemodes = GetGameModes();
    console.log(Gamemodes);
    return(
      <div>
          <Center m='10px'>
            <Input w={['40vh', '40vw']} h={['4vh', '3vw']} borderRadius='7px' size='76px' placeholder="Research" bg='white' onChange={event => setQuery(event.target.value)} />
          </Center>
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
            <Accordion allowMultiple bg='#1A202C'>
              <AccordionItem w={['65vw', '80vw']} _hover={{backgroundColor: 'black'}}>
                <h2>
                  <AccordionButton>
                    <Box fontSize={['10px', '20px']} flex='1' color='white' _hover={{color: 'orange'}} textAlign='center'>
                      {game.name}
                    </Box>
                    <AccordionIcon color='orange'/>
                  </AccordionButton>
                </h2>
                <AccordionPanel display='flex' justifyContent='center' alignItems='center' bg='#23395D'>
                  <VStack>
                    {Gamemodes.filter(gamemode => {
                        if(gamemode.game.id===game.id){return gamemode};
                    }).map((gamemode) => (
                      <Popover trigger='hover'>
                          <PopoverTrigger>
                            <Box textAlign='center' margin='5px' border='solid black' p='2px' w={['45vw', '75vw']} bg='white' color='black'>{gamemode.name}</Box>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverArrow/>
                              <Text>
                                  Max:{gamemode.maximum_players}<br/>
                                  Min:{gamemode.minimum_players}<br/>
                                  Time:{gamemode.estimated_time_min}
                              </Text>
                          </PopoverContent>
                      </Popover>
                      )
                      )}
                    <AddGameMode input={game.id}/>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

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
                <Center><Heading mb='2vh'>Gamemodes</Heading></Center>
                <Gamess />
            </div>
        </div>
    );
}
/*
function SearchBar (Data){
    const [query, setQuery] = useState("")
    Data = Data.input;
    var Gamemodes = GetGameModes();
    console.log(Gamemodes);
    return(
      <div>
          <Center m='10px'>
            <Input w={['40vh', '40vw']} h={['4vh', '3vw']} borderRadius='7px' size='76px' placeholder="Research" bg='white' onChange={event => setQuery(event.target.value)} />
          </Center>
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
            <Accordion allowMultiple bg='#1A202C' >
              <AccordionItem w={['50vw', '80vw']}>
                  <AccordionButton>
                    <Text flex='1' color='orange' textAlign='center'>
                      {game.name}
                    </Text>
                    <AccordionIcon color='orange'/>
                  </AccordionButton>
                <AccordionPanel display='flex' justifyContent='center' alignItems='center'>
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
                </AccordionPanel>
              </AccordionItem>
            </Accordion>

          ))}
            
          </GameList>
      </div>
    )
}*/

export default Gamemodes;