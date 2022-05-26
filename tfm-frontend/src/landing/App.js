import Features from "./Features";
import Benefits from "./Benefits";
import Contact from "./Contact";
import Community from "./Community";
import About from "./About";
import { Center, Image, Heading, Flex, Text, useMediaQuery, LinkOverlay, Button, HStack, Spacer, Link } from '@chakra-ui/react';
import home_image from '../images/home_image.webp'
import './../App.css';
import OpenGaming from '../images/open_gaming_logo.png';
import { useRef } from 'react';


function Home(){

  const [isLarge] = useMediaQuery('(min-width: 900px)')

  return(
    <div className='App'>
      {isLarge ? 
      <Center mt='20vh' mb='0'>
        <Flex flexDir='row' justifyContent='center' alignItems='center'>
          <Flex w={[300, 400, 500, 600 ]} flexDir='column' alignItems='start'>
            <Heading color='white' fontSize={{ base: '40px', md: '56px', lg: '75px'}}>MATCH</Heading>
            <Heading color='white' fontSize={{ base: '40px', md: '56px', lg: '75px' }}>MATCHER</Heading>
            <Text color='white' mt='5%' fontSize={{ base: '16px', md: '22px', lg: '30px' }}>Match your friends to find a Match</Text>
          </Flex>
          <Image w={[300, 400, 500, 600, 700, 800 ]} src={home_image} alt='home_image'/>
        </Flex>
      </Center> 
      :
      <Center mt='20vh' mb='10vh'>
        <Flex flexDir='column' h='max' w='max' justifyContent='space-around' alignItems='center'>
          <Flex flexDir='column' alignItems='center'>
            <Heading color='white' fontSize={{ base: '44px', md: '56px', lg: '90px'}}>MATCH</Heading>
            <Heading color='white' fontSize={{ base: '44px', md: '56px', lg: '90px' }}>MATCHER</Heading>
            <Text color='white' mt='5%' fontSize={{ base: '16px', md: '32px' }}>Match your friends to find a Match</Text>
          </Flex>
          <Image mt='10vh' alignSelf='start' w={[300, 400, 500, 600, 700]} src={home_image} alt='home_image'/>
        </Flex>
      </Center>
      }
    </div>
  )
}

function App() {

  const scrollToFeatures = useRef(null);
  const scrollToContact = useRef(null);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <div className="App">
        
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
            <HStack gap='2px'>
              <Button colorScheme='orange' size={{xs:'10px', sm:'30px', md:'50px', lg:'70px'}} borderRadius='5px' padding='2px' bg='#1A202C' color='white' onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                Home
              </Button>
              <Button colorScheme='orange' size={{xs:'10px', sm:'30px', md:'50px', lg:'70px'}} borderRadius='5px' padding='2px' bg='#1A202C' color='white' onClick={() => scrollToSection(scrollToFeatures)}>
                Features
              </Button>
              <Button colorScheme='orange' size={{xs:'10px', sm:'30px', md:'50px', lg:'70px'}} borderRadius='5px' padding='2px' bg='#1A202C' color='white' onClick={() => scrollToSection(scrollToContact)}>
                Contact
              </Button>
              <Button colorScheme='orange' size={{xs:'10px', sm:'30px', md:'50px', lg:'70px'}} borderRadius='5px' padding='2px' bg='#1A202C' color='white'>
                <LinkOverlay href="/#/Login">
                    Log In
                </LinkOverlay>
              </Button>
            </HStack>
          </Flex>
        </div>
        <Home />
        <div ref={scrollToFeatures}><Features /></div>
        <Benefits/>
        <div ref={scrollToContact}><Contact /></div>
        <Community />
        <About />
    </div>
  );
}

export default App;