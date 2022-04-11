//import './App.css';
//import {Link} from "react-router-dom";

import { VStack, HStack, Button, Heading, Link, Image, Box, Flex, Spacer } from '@chakra-ui/react'
import OpenGaming from '../images/open_gaming_logo.png'


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

  const scrollTop = () => window.scrollTo({top:0, behavior:"smooth"});
  const scrollFeatures = () => window.scrollTo({top:720, behavior:"smooth"});
  const scrollContact = () => window.scrollTo({top:1540, behavior:"smooth"});

  return (
    
    <div className="App-header"> 
      <VStack bg='#DD6B20'>
        <Box bg='#1A202C' p='1' width='100%'>
          <Flex>
            <Link href="/" marginLeft='2' marginRight='2'>
              <HStack>
                <Image bg='#1A202C' boxSize='50px' src={OpenGaming} alt='logo'/>
                <Heading color='white' fontSize='20'>
                  OPEN GAMING 
                </Heading>
              </HStack>
            </Link>
            <Spacer/>
            <HStack gap='1'>
              <Button borderRadius='m' bg='#1A202C' color='white' onClick={scrollTop}>
                Home
              </Button>
              <Button borderRadius='m' bg='#1A202C' color='white' onClick={scrollFeatures}>
                Features
              </Button>
              <Button borderRadius='m' bg='#1A202C' color='white' onClick={scrollContact}>
                Contact
              </Button>
              <Link href="/Login">
                <Button borderRadius='m' bg='#1A202C' color='white'>
                  Log In
                </Button>
              </Link>
            </HStack>
          </Flex>
        </Box> 
      </VStack>
    </div>
  );
}

export default Header2;

//export default Header;
