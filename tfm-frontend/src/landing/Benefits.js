import './../App.css';
import Benefits_image from '../images/benefits.png'

import { Flex, Heading, Image, Center } from '@chakra-ui/react'

function Benefits() {
  return (
    
    <div className="Benefits">
      <Flex flexDir='column'>
        <Heading fontSize={{ base: '32px', md: '40px' }} color='black' mt='10vh'>BENEFITS</Heading>
        <Center>
            <Image bg='#1A202C' w={[200, 300, 400, 500, 600, 700, 800 ]} src={Benefits_image} alt='ben_image' />
        </Center>
      </Flex>
    </div>
    
  );
}

export default Benefits;