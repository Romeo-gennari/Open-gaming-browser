import Header2 from "./header";
import Contact from "./Contact";
import About from "./About";
import { VStack, HStack, Button, Input, Center, Box } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import JSONDATA from "./MOCK_DATA.json"
import './App.css';

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
            <Input type='text' borderRadius='m' placeholder='Search' color='black' bg='white' htmlSize={40} width='auto' 
              value={content } onChange={(e) => setContent(e.target.value)}>
            </Input>
            <Button borderRadius='m' children={<SearchIcon color='gray' />} type='submit' ></Button>
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


function App() {
  return (
    <div className="App">
        <Header2 />
      <header className="App-header">
        <Home />
      </header>
        <Contact />
        <About />
    </div>
  );
}

export default App;
