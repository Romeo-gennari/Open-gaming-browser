//import './App.css';
//import {Link} from "react-router-dom";

import { VStack, HStack, Button, Heading, Link, Image, Box } from '@chakra-ui/react'
import OpenGaming from './images/open_gaming_logo.png'


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

  return (
    <div className="App">
      <VStack bg='#DD6B20'>
        <HStack bg='#1A202C' w='100%' p='1' spacing='800px'>
          <Link href="/">
            <HStack>
              <Box>
                <Image bg='#1A202C' boxSize='50px' src={OpenGaming} alt='logo' />
              </Box>
              <Heading color='white' fontSize='20'>
                OPEN GAMING 
              </Heading>
            </HStack>
          </Link>
          <HStack gap='3'>
            <Link href="/">
              <Button borderRadius='m' bg='#1A202C' color='white'>
                Home
              </Button>
            </Link>
            <Link href="/Features">
              <Button borderRadius='m' bg='#1A202C' color='white'>
                Features
              </Button>
            </Link>
            <Link href="/Contact">
              <Button borderRadius='m' bg='#1A202C' color='white'>
                Contact
              </Button>
            </Link>
            <Link href="/Profile">
              <Button borderRadius='m' bg='#1A202C' color='white'>
                Account
              </Button>
            </Link>
          </HStack>
        </HStack> 
      </VStack>
    </div>
  );
}

export default Header2;

//export default Header;
