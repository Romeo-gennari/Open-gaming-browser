import './../App.css';

import { Box, Image, Center, HStack, VStack, Heading, Text } from '@chakra-ui/react'
import OpenGaming from './images/open_gaming_logo.png'

function About() {
  return (
    <div className="About">
      <Center height='200px'>
        <HStack spacing='110px'>
          <Box>
            <Image bg='#d6dadb' boxSize='60px' src={OpenGaming} alt='logo' />
          </Box>
          <VStack>
            <Heading fontSize='xl'>About</Heading>
            <Text fontSize='sm'>Project</Text>
            <Text fontSize='sm'>Features</Text>
          </VStack>
          <VStack>
            <Heading fontSize='xl'>Resources</Heading>
            <Text fontSize='sm'>Tutorials</Text>
            <Text fontSize='sm'>Brand assets</Text>
          </VStack>
          <VStack>
            <Heading fontSize='xl'>Contact</Heading>
            <Text fontSize='sm'>0000 00 00 00</Text>
            <Text fontSize='sm'>open.gaming94800@gmail.com</Text>
          </VStack>
        </HStack>
      </Center>
    </div>
  );
}

export default About;