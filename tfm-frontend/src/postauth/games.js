import './../App.css';

import api from '../api';
import styled from 'styled-components';
import {React, useState, useEffect} from "react";
import { Popover, PopoverTrigger, PopoverContent, Button, PopoverArrow, Input, Center, Heading, Text, Box, useMediaQuery, VStack, Tooltip, Image, AspectRatio } from "@chakra-ui/react";

import Sidebar from './sidebar';
import Headband from "./Header";

import GetGames from './getters/GetGames';
import GetEditors from './getters/GetEditors';
import GetPublishers from './getters/GetPublishers';

const GameList = styled.div`
margin-top: 3vh;
display:flex;
flex-wrap: wrap;
align-content: flex-start;
`

const GameImg = styled.img`
width: 13.3vw;
height: 16.625vw;
display: block;
margin-left: auto;
margin-right: auto; 
@media (orientation: portrait) {
  width: 40vh;
  height: 42vh;
}
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
                  <Button m='1vw' bg='#1A202C' color='white' colorScheme='orange'>Add Game</Button>
              </PopoverTrigger>
              <PopoverContent w='auto' padding={1} bg='#93D3FB'>

                <Input h='5vh' mt='2px' placeholder="Title" bg='white' onChange={event => setNewGameTitle(event.target.value)} />
                {games.filter(game => {
                  if (newGameTitle === '') {}
                  else if (game.name.toLowerCase().includes(newGameTitle.toLowerCase())) {return game;}
                }).map((game) => (<p key={game.id} onClick={() => {}}>{game.name}</p>))}

                <Input h='5vh' mt='2px' placeholder="Studio" bg='white' value={newGameEditor} onChange={event => setNewGameEditor(event.target.value)} />
                {editors.filter(game => {
                  if (newGameEditor === ''|| newGameEditorId!=-1) {}
                  else if (game.name.toLowerCase().includes(newGameEditor.toLowerCase())) {return game;}
                }).map((game) => (<p key={game.id} onClick={() => {setNewGameEditorId(game.id);setNewGameEditor(game.name)}}>{game.name}</p>))}

                <Input h='5vh' mt='2px' placeholder="Publisher" bg='white' value={newGamePublisher } onChange={event => {setNewGamePublisher(event.target.value);setNewGamePublisherId(-1)}} />
                {publishers.filter(game => {
                  if (newGamePublisher === '' || newGamePublisherId!=-1) {}
                  else if (game.name.toLowerCase().includes(newGamePublisher.toLowerCase())) {return game;}
                }).map((game) => (<p key={game.id} onClick={() => {setNewGamePublisherId(game.id);setNewGamePublisher(game.name)}}>{game.name}</p>))} 

                <Input h='5vh' mt='2px' placeholder="Poster" bg='white' onChange={event => setNewGamePoster(event.target.value)} />
                <Input h='5vh' mt='2px' placeholder="YYYY/MM/DD" bg='white' onChange={event => setNewGameRelease(event.target.value)} />
                <Input h='5vh' mt='2px' placeholder="Description" bg='white' onChange={event => setNewGameDescription(event.target.value)} />
                <Button h='4vh' mt='2px' onClick={()=>{handleAddGame()}}>Submit</Button>

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
                  <Button m='1vw' bg='#1A202C' color='white' colorScheme='orange'>Add Studio</Button>
              </PopoverTrigger>
              <PopoverContent w='auto' padding={1} bg='#93D3FB'>
                <Input h='5vh' mt='2px' placeholder="Studio" bg='white' onChange={event => setNewGameEditor(event.target.value)} />
                {editors.filter(game => {
                  if (newGameEditor === '') {}
                  else if (game.name.toLowerCase().includes(newGameEditor.toLowerCase())) {return game;}
                }).map((game) => (<p key={game.id} onClick={() => {}}>{game.name}</p>))}

                <Button h='4vh' mt='2px' onClick={()=>{handleAddEditor()}}>Submit</Button>

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
                  <Button m='1vw' bg='#1A202C' color='white' colorScheme='orange'>Add Publisher</Button>
              </PopoverTrigger>
              <PopoverContent w='auto' padding={1} bg='#93D3FB'>
                <Input h='5vh' mt='2px' placeholder="Publisher" bg='white' onChange={event => setNewGamePublisher(event.target.value)}/>
                {publishers.filter(game => {
                  if (newGamePublisher === '') {}
                  else if (game.name.toLowerCase().includes(newGamePublisher.toLowerCase())) {return game;}
                }).map((game) => (<p key={game.id} onClick={() => {}}>{game.name}</p>))}

                <Button h='4vh' mt='2px' onClick={()=>{handleAddPublisher()}}>Submit</Button>

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
          <Center>
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
            <Popover trigger='hover' openDelay='700' >
              <PopoverTrigger>
                <Box m='1vh' borderRadius='10px' key={game.id} onClick={() => {}} >
                  <Box w={['40vw', '13.3vw']} p='1px' bg='white' borderTopRadius='10px' textAlign='center' overflow='hidden' maxWidth={['40vh', '13.3vw']}>
                    <Text noOfLines={1} fontSize={['12px', '20px']} fontFamily='Helvetica' >{game.name}</Text>
                  </Box>
                  <AspectRatio ratio={3/4} >
                    <Image borderBottomRadius='10px' w={['40vw', '13.3vw']} src={game.image_url} alt="img ?"></Image>
                  </AspectRatio>
                </Box> 
              </PopoverTrigger>
              <PopoverContent w={['20vh' ,'20vw']} padding={1} >
                  <PopoverArrow />
                  <Text fontSize={['10px', '18px']}>Name: {game.name}</Text>
                  <Text fontSize={['10px', '18px']}>Editor: {game.editor.name}</Text>
                  <Text fontSize={['10px', '18px']}>Publisher: {game.publisher.name}</Text>
                  <Text fontSize={['10px', '18px']}>Realease Date: {game.release_date.slice(0,4)}</Text>
                  <Text fontSize={['10px', '18px']}>Description: {game.description}</Text> 
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

    const [isLarge] = useMediaQuery('(min-width: 1020px)');

    return(
        <div className="pApp">
            <Sidebar />
            <Headband />
            <div className='paBody'>
                <Heading textAlign='center' mb='1vw'>Games</Heading>
                {isLarge ? 
                <Box>
                  <Center>
                    <Box bg='#1A202C' color='white' borderRadius='none' pl='2px' pr='2px' pb='2px' w='fit-content'>
                      <Tooltip bg='#1A202C' label='You need to add a Studio and a Publisher before adding a game.'>
                        <Text fontSize='sm'>Struggling ? Hover me ;)</Text>
                      </Tooltip>
                    </Box>
                  </Center>
                  <Center>
                    <AddGame />
                    <AddEditor />
                    <AddPublisher />
                  </Center>
                </Box>
                :
                <VStack m='1vh' spacing='-1'>
                  <Box bg='#1A202C' color='white' borderRadius='none' pl='2px' pr='2px' pb='2px' w='fit-content' mb='1vh'>
                    <Tooltip bg='#1A202C' label='You need to add a Studio and a Publisher before adding a game.'>
                      <Text fontSize='sm'>Tip: You need to add a Studio and a Publisher before adding a game.</Text>
                    </Tooltip>
                  </Box>
                  <AddGame />
                  <AddEditor />
                  <AddPublisher />
                </VStack>
                }
                <Gamess />
            </div>
        </div>
    );
}

export default Games;