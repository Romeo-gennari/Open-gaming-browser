import './../App.css';

import { Flex, Heading, Button, Text, Link } from '@chakra-ui/react'

function Community() {
  return (
    
    <div className="Community">
      <Flex flexDir='column' justifyContent='center' >
          <Heading fontSize={{ base: '26px', md: '40px' }} mt='4vw'>JOIN OUR COMMUNITY</Heading>
          <Text color='gray.500'>It only misses you.</Text>
          <Flex justifyContent='center'>
          <Link href='./#/Download'>
            <Button m='1vw' bg='black' color='white' size='lg' colorScheme='blue'>Download for WINDOWS</Button>
          </Link>
          </Flex>
      </Flex>
    </div>
    
  );
}

export default Community;