import Sidebar from "./sidebar";
import Headband from "./Header";
import userdata from '../dummyData/test-preset.json';
import { Flex, Input, Button, Modal, useDisclosure, ModalContent, ModalHeader, ModalOverlay, Center,Box, FormControl, ModalBody, FormLabel, ModalFooter } from '@chakra-ui/react';
import axios from "axios";
import { useEffect, useState } from "react";

import styled from "styled-components";

const LeLibraryList = styled.div`
display:flex;
flex-direction:column;
align:left;
`
const LeLibraryListed = styled.a`
margin: 5px 5px;
border: solid black;
border-radius: 5px;
padding: 2px 2px 2px 2px;
width: 85vw;
height: 15vh;
color: grey;
font-size: 30px;
text-align: left;
background-color: white;
display: flex;
`
const LibraryButton = styled.button`
border: 2px solid red;
border-radius: 5px;
margin-left: 10px;
margin-right: 10px;
font-size: 20px;
color: red;
`
const PHeader = styled.div`
background-color: grey;
height: 4vh;
font-size: 3vh;
margin-bottom: 15px;
`
const TagList = styled.div`
border: 1px solid black;
border-radius: 5px;
display: flex;
flex-wrap: wrap;
width: 40vw;
margin-left: auto;
`
const TagListS = styled.div`
border: 1px solid black;
border-radius: 3px;
display: flex;
flex-wrap: wrap;
width: 30vw;
margin-left: auto;
`
const Tagged = styled.div`
height: 3vh;
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


function LibraryList(){
    return(
        <div>
            <LeLibraryList>
               {userdata[0].games.map((game)=>(
               <LeLibraryListed key={game.id} onClick={() => {}} >
                    <div>
                        {game.title}
                        <div><LibraryButton>Specify Time</LibraryButton><LibraryButton>Remove Game</LibraryButton></div>
                    </div>
                    <div>
                    </div>
               </LeLibraryListed>))} 
            </LeLibraryList>
        </div>
        
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

function PresetList(presetdata){

  //Experimental way to get the gamedata  
  
  const [gamedata, setGameData] = useState([]);
      
    const getData = () => {
      axios
        .get ("http://localhost:5051/games.json")
        .then((response) => {
          console.log(response.data);
          setGameData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
    useEffect(() => {
      getData();
    }, []);



    //const [ data, setdata] = useState(presetdata.input)
    var data = presetdata.input
    console.log(data);
    const [ deleted, dodelete ] = useState("");

    const [newtitle, editnewtitle] = useState("");
    const [newlist, editnewlist] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [query, setQuery] = useState("")

    function handleDelete(){
        data=(data.filter((preset)=>{if(preset.title!=deleted)return(preset)}));
        console.log(data);
        axios.post("http://localhost:5051/presets.json",data).then(alert("Preset removed!"));
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

    const handleAddPreset = (event) => {
      event.preventDefault();
      data.push({"id":data[data.length-1].id+1,"title":newtitle,"default":0,"games":newlist})
      console.log(data);
      editnewlist([])
      editnewtitle("")
      axios.post("http://localhost:5051/presets.json",data).then(alert("Preset added!"));
    }

    return(
        <div>
            <PHeader>
              <Center>
              <Button onClick={onOpen} borderRadius='none' bg='red' color='white' width='40%' h='4vh' colorScheme='red'>AddPreset</Button>
              </Center>
            </PHeader>
            <LeLibraryList>
                {data.map((preset)=>(
                <LeLibraryListed key={preset.id} onClick={() => {}} >
                    <div>
                        <h1>{preset.title}</h1>
                        <Flex flexDir='row'><Button m='1%' color='red' bg='white' borderWidth='1px' borderColor='red' colorScheme='gray'>Edit</Button><Button m='1%' color='red' bg='white' borderWidth='1px' borderColor='red' colorScheme='gray' onClick={()=>{dodelete(preset.title);handleDelete();}}>Delete</Button></Flex>
                    </div>
                    <TagList>
                        {preset.games.map((game)=>(
                            <Tagged key={game.id}>{game.name}</Tagged>
                        ))}
                    </TagList> 
                </LeLibraryListed>))} 
            </LeLibraryList>
            <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} >
                <ModalOverlay />
                <ModalContent margin='auto' alignItems='center' w='full' >
                    <ModalHeader color='red'>New Preset</ModalHeader>
                    <ModalBody>
                      <form onSubmit={handleAddPreset}>
                        <FormControl alignSelf='center' m='auto'>
                          <FormLabel>Title:</FormLabel>
                          <Input isRequired type='text' id='title' placeholder="Preset Title" value={newtitle} onChange={({target}) => editnewtitle(target.value)} mb='5%'/>
                          <FormLabel>Preset Games:</FormLabel>
                          <Input type='text' placeholder="Research" onChange={event => setQuery(event.target.value)}/>
                          <Box borderWidth='1px' borderColor='black' borderRadius='5px' w='auto' h={['50px', '80px']} overflowY='auto'>
                            {gamedata.filter(post => {
                              if (query == '') {}
                              else if (post.name.toLowerCase().includes(query.toLowerCase())) {
                                return post;
                              }
                              }).map((game) => (
                                <Box className="box" key={game.id}>
                                  <Box borderWidth='1px' role='button' _hover={{backgroundColor: '#D3D3D3'}} onClick={()=>{newlist.push(game);setQuery("")}}>{game.name}</Box>
                                </Box>
                            ))}
                          </Box>
                          <FormLabel mt='5%'>Games Added:</FormLabel>
                          <Box borderWidth='1px' borderColor='black' borderRadius='5px' w={[175, 280, 350]} h={[50, 80, 100]} overflowY='auto'>
                            <Flex flexWrap='wrap'>
                              {newlist.map((game)=>(
                                <Button w='-moz-fit-content' maxH='30px' m='1px' borderWidth='1px' borderColor='black' borderRadius='5px' alignContent='center' textAlign='center' key={game.id} onClick={()=>{handleRemoveGame(game.id)}}>{game.name}</Button>
                              ))}
                            </Flex>
                          </Box>
                        </FormControl>
                      </form>
                    </ModalBody>
                    <ModalFooter>
                      <Center mb='3%'>
                        <Button onClick={()=>{onClose();editnewlist([]);editnewtitle("");}} bg='red' colorScheme='red' w='45%' mr='1%'>Cancel Changes</Button>
                        <Button type='submit' bg='orange' colorScheme='orange' w='45%' ml='1%'>Save Preset</Button>
                      </Center>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        
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
                <h1>Library</h1>
                <DisplayPresets/>
            </div>
        </div>
    );
}

export default Library;