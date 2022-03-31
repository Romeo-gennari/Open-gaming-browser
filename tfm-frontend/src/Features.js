import './App.css';
import features_image from './images/features_image.webp'

import { Center, HStack, Heading, Image, Box } from '@chakra-ui/react'

function Features() {
  return (
    
    <div className="Features">
        <Box height='82px'/>
        <Center>
          <HStack>
            <Box p={5} width='8000' >
              <Heading>Features</Heading>
              <Heading mt='8' size='l' width='60' color='gray.700'>The convenient platform that lets you save up time. Your planning activity companion.</Heading>
            </Box>
            <Box px='20'/>
            <Image bg='#ffffff' height='250' src={features_image} alt='features_image' />
          </HStack>
        </Center>
    </div>
    
  );
}

export default Features;