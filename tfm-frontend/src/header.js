//import './App.css';
//import {Link} from "react-router-dom";

import { HStack, Button, Input, Text, Center, Link } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useState } from 'react'

/*
function Header() {
  return (
    <div>
      <header className="Band-header">
      <h1>TFM<Link to="/">Home</Link><Link to="/About">About</Link><Link to="/Profile">Profile</Link></h1>
      </header>
    </div>
    
  );
}
*/
 
function Header2() {

  function handleSubmit(e){
    e.preventDefault();
    console.log(content);
  }

  const [content, setContent] = useState('');

  return (
    <div className="App">
        <HStack bg='black' w='100%' p='5' spacing='300'>
          <Text color='orange'>
            OPEN GAMING LOGO
          </Text>
          <form onSubmit={handleSubmit}>
            <Center>
              <Input type='text' borderRadius='m' placeholder='Search' bg='white' htmlSize={40} width='auto' 
              value={content } onChange={(e) => setContent(e.target.value)}>
              </Input>
              <Button borderRadius='m' children={<SearchIcon color='gray' />} type='submit' ></Button>
            </Center> 
          </form>        
          <Center gap='3'>
            <Link href="/">
              <Button borderRadius='m' colorScheme='orange' color='white'>
                Home
              </Button>
            </Link>
            <Link href="/About">
              <Button borderRadius='m' colorScheme='orange' color='white'>
                About us
              </Button>
            </Link>
            <Link href="/Profile">
              <Button borderRadius='m' colorScheme='orange' color='white'>
                Account
              </Button>
            </Link>
          </Center>
        </HStack>
    </div>
  );
}

export default Header2;

//export default Header;
