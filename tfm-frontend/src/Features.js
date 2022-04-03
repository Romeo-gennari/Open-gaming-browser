import './App.css';
import features_image from './images/features_image.webp'

import { Center, HStack, Heading, Image, Box } from '@chakra-ui/react'

function Features() {
  return (
    
    <div className="Features">
        <Center>
          <HStack spacing='200px' marginTop='70'>
            <Box>
              <Heading>Features</Heading>
              <Heading mt='8' size='l' width='60' color='gray.700'>The convenient platform that lets you save up time. Your planning activity companion.</Heading>
            </Box>
            <Image bg='#ffffff' height='250' src={features_image} alt='features_image' />
          </HStack>
        </Center>
    </div>
    
  );
}

export default Features;