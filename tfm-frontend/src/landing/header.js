//import './App.css';
//import {Link} from "react-router-dom";

import { HStack, Button, Heading, Link, LinkBox, LinkOverlay, Image, Flex, Spacer } from '@chakra-ui/react'
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
          <Flex flexDir='row' bg='#1A202C' padding='1' w='full' paddingRight='1%'>
            <Link href="/" marginLeft='2' marginRight='2' size='10px'>
              <HStack>
                <Image bg='#1A202C' boxSize={[21, 30, 41, 50, 61]} src={OpenGaming} alt='logo'/>
                <Heading color='white' fontSize={{xs:'10px', sm:'30px', md:'50px', lg:'70px'}}>
                  OPEN GAMING 
                </Heading>
              </HStack>
            </Link>
            <Spacer/>
            <HStack gap='2'>
              <Button colorScheme='orange' size={{xs:'10px', sm:'30px', md:'50px', lg:'70px'}} borderRadius='m' bg='#1A202C' color='white' onClick={scrollTop}>
                Home
              </Button>
              <Button colorScheme='orange' size={{xs:'10px', sm:'30px', md:'50px', lg:'70px'}} borderRadius='m' bg='#1A202C' color='white' onClick={scrollFeatures}>
                Features
              </Button>
              <Button colorScheme='orange' size={{xs:'10px', sm:'30px', md:'50px', lg:'70px'}} borderRadius='m' bg='#1A202C' color='white' onClick={scrollContact}>
                Contact
              </Button>
              <Button colorScheme='orange' size={{xs:'10px', sm:'30px', md:'50px', lg:'70px'}} borderRadius='m' bg='#1A202C' color='white'>
                <LinkOverlay href="/#/Login">
                    Log In
                </LinkOverlay>
              </Button>
            </HStack>
          </Flex>
    </div>
  );
}

export default Header2;

//export default Header;
