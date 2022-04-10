import Header2 from "./header";
import Features from "./Features";
import Benefits from "./Benefits";
import Contact from "./Contact";
import Community from "./Community";
import About from "./About";
import { VStack, HStack, Button, Input, Center, Box, Image, Heading, Flex, Text, Square } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import JSONDATA from "./MOCK_DATA.json";
import home_image from '../images/home_image.webp'
import './../App.css';

/*
function Home(){

  function handleSubmit(e){
    e.preventDefault();
    console.log(content);
  }
  const [content, setContent] = useState('');
  return (
    <div className='App'>
      <Box boxSize='3'/>
      <Center>
        <form onSubmit={handleSubmit}>  
          <HStack spacing='0'>
            <Input position='back' type='text' borderRadius='m' placeholder='Search' color='black' bg='white' htmlSize={40} width='auto' 
              value={content} onChange={(e) => setContent(e.target.value)}>
            </Input>
            <Button position='background' borderRadius='m' children={<SearchIcon color='gray' />} type='submit' ></Button>
          </HStack>
        </form>
      </Center>
      <Box boxSize='3'/>
      <VStack>
        <Center>
          <VStack spacing='1'>
            {JSONDATA.filter((value)=> 
            {
              if (content === "") {
                return (<Box bg='#1A202C' color='white'>{value.name}</Box>)
              } else if (value.name.toLowerCase().includes(content.toLowerCase())){
                return <Box bg='#1A202C' color='white'>{value.name}</Box>
              }
            }).map((value, key) => 
            {
              return (
                <Box bg='#1A202C' color='white'>{value.name}</Box>
              );
            })}
          </VStack>
        </Center> 
      </VStack>
    </div>
  );
}
*/

function Home(){
  return(
    <div className='App'>
      <Center>
        <VStack>
          <HStack mt='170px'>
            <VStack>
              <Flex flexDir='column' alignItems='start'>
                <Heading mb='40px' color='white' size='4xl'>MATCH</Heading>
                <Heading color='white' size='4xl' mr='40px'>MATCHER</Heading>
              </Flex>
            </VStack>
            <Image height='180px' src={home_image} alt='home_image'/>
          </HStack>
          <Flex alignItems='start'>
            <Text color='white' size='3xl' mr='520px' mt='10px'>Match your friends to find a Match</Text>
          </Flex>
        </VStack>
      </Center>
    </div>
  )
}

function App() {
  return (
    <div className="App">
        
      <header className="App-header">
        <Header2 />
      </header>
        <Home />
        <Features/>
        <Benefits/>
        <Contact />
        <Community />
        <About />
    </div>
  );
}

export default App;