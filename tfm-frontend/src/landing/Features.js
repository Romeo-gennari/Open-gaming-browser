import './../App.css';
import features_image from '../images/features_image.webp'

import { Center, HStack, Heading, Image, Box, Flex} from '@chakra-ui/react'

function Features() {
  return (
    
    <div className="Features">
        <Center>
          <HStack spacing='200px' marginTop='70' >
            <Flex flexDir='column' alignItems='start'>
              <Heading>Features</Heading>
              <Heading mt='8' size='l' width='70' color='gray.700' >The convenient platform that</Heading>
              <Heading size='l' width='70' color='gray.700' >lets you save up time.</Heading>
              <Heading size='l' width='70' color='gray.700' >Your planning activity companion.</Heading>
            </Flex>
            <Image bg='#ffffff' height='250' src={features_image} alt='features_image' />
          </HStack>
        </Center>
    </div>
    
  );
}

export default Features;