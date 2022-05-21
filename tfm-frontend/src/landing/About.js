import './../App.css';

import { Box, Image, Center, Flex, VStack, Heading, Text, useMediaQuery } from '@chakra-ui/react'
import OpenGaming from '../images/open_gaming_logo.png'

function About() {

  const [isLarge] = useMediaQuery('(min-width: 900px)')

  return (
    <div className="About">
      {isLarge ?
      <Center height='200px'>
        <Flex w='70%' justifyContent='space-around' >
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
        </Flex>
      </Center>
      :
      <Center >
        <Flex flexDir='column' w='70%' alignItems='center' mt='4vh' mb='1vh'>
          <Image bg='#d6dadb' boxSize='60px' src={OpenGaming} alt='logo' />
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
        </Flex>
      </Center>
      }
    </div>
  );
}

export default About;