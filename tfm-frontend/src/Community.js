import './App.css';

import { Center, Box, VStack, Heading, Button, Text, Link } from '@chakra-ui/react'

function Community() {
  return (
    
    <div className="Community">
        <Box height='20'/>
        <Center>
            <VStack>
                <Heading>JOIN OUR COMMUNITY</Heading>
                <Text color='gray.500'>It only misses you.</Text>
                <Box height='8'/>
                <Link href='./Download'>
                  <Button bg='black' color='white' size='lg'>Download for WINDOWS</Button>
                </Link>
            </VStack>
        </Center>
    </div>
    
  );
}

export default Community;