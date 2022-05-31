import './../App.css';
import features_image from '../images/features_image.webp'

import { Center, Heading, Image, Flex, useMediaQuery, AspectRatio } from '@chakra-ui/react'

function Features() {

  const [isLarge] = useMediaQuery('(min-width: 900px)')

  return (
    <div className="Features">
      {isLarge ? 
      <Center>
        <Flex mt='15vh' mb='12vh' >
          <Flex flexDir='column' alignItems='start' mr='10vw'>
            <Heading fontSize={{ base: '32px', md: '44px', lg: '52px'}}>Features</Heading>
            <Heading fontSize={{ base: '16px', md: '22px', lg: '28px' }} mt='8' color='gray.700' >The convenient platform that</Heading>
            <Heading fontSize={{ base: '16px', md: '22px', lg: '28px' }} color='gray.700' >lets you save up time.</Heading>
            <Heading fontSize={{ base: '16px', md: '22px', lg: '28px' }} color='gray.700' >Your planning activity companion.</Heading>
          </Flex>
          <AspectRatio w={[300, 400, 500, 600]}  maxW='560px' ratio={560/315}>
            <iframe 
              src="https://www.youtube.com/embed/d1EwlLqwI0M?autoplay=1" 
              title="YouTube video player" 
              frameborder="0" 
              allow='autoplay'
              allowfullscreen
            />
          </AspectRatio>
        </Flex>
      </Center>
      :
      <Center>
        <Flex mt='8vh' flexDir='column' mb='8vh' alignItems='center'>
          <Flex flexDir='column' mb='6vh'>
            <Heading fontSize={{ base: '32px', md: '44px', lg: '52px'}} mb='1vh'>Features</Heading>
            <Heading fontSize={{ base: '16px', md: '22px', lg: '28px' }} color='gray.700' >The convenient platform that lets you save up time.</Heading>
            <Heading fontSize={{ base: '16px', md: '22px', lg: '28px' }} color='gray.700' >Your planning activity companion.</Heading>
          </Flex>
          <AspectRatio w={[300, 400, 500, 600]}  maxW='560px' ratio={560/315}>
            <iframe 
              src="https://www.youtube.com/embed/d1EwlLqwI0M?autoplay=1" 
              title="YouTube video player" 
              frameborder="0" 
              allow='autoplay'
              allowfullscreen
            />
          </AspectRatio>
        </Flex>
      </Center>
      }
    </div>
    
  );
}

export default Features;