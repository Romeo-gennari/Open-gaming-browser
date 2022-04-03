import './../App.css';
import Benefits_image from './images/benefits.png'

import { Heading, Box, Image, Center } from '@chakra-ui/react'

function Benefits() {
  return (
    
    <div className="Benefits">
        <Box height='60px'/>
        <Heading color='black'>BENEFITS</Heading>
        <Box height='20px'/>
        <Center>
            <Image bg='#1A202C' height='200' width='' src={Benefits_image} alt='ben_image' />
        </Center>
    </div>
    
  );
}

export default Benefits;