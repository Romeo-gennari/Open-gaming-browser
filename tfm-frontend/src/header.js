//import './App.css';
import {Link as routerLink} from "react-router-dom";

import { Box, HStack, Button, Input, Text, Center, Link } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

function Header() {
  return (
    <div>
      <header className="Band-header">
      <h1>TFM<Link to="/">Home</Link><Link to="/About">About</Link><Link to="/Profile">Profile</Link></h1>
      </header>
    </div>
    
  );
}

function Header2() {
  return (
    <div className="App">
        <Box bg='black' w='100%' p={5}>
          <HStack spacing='400'>
            <Text color='orange'>
              OPEN GAMING LOGO
            </Text>
            <Center>
              <Input borderRadius='m' placeholder='Search' bg='white' htmlSize={40}></Input>
              <Link href="/">
                <Button borderRadius='m' children={<SearchIcon color='gray' />}>
                </Button>
              </Link>
            </Center>
            <Link href="/Profile">
              <Button borderRadius='m' colorScheme='orange'>
                Account
              </Button>
            </Link>
          </HStack>
        </Box>
    </div>
  );
}

export default Header2;

//export default Header;