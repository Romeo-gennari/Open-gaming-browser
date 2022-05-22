import './../App.css';

import Windows_Logo from '../images/windows_logo.png';
import Mac_Logo from '../images/mac_logo.png';
import Linux_Logo from '../images/linux_logo.png';
import { HStack, VStack, Flex, Box, Heading, Button, Image, useMediaQuery } from '@chakra-ui/react';

function Download() {

  const [isLarge] = useMediaQuery('(min-width: 920px)')

  return (
    
    <div className="Download">
        {isLarge ?
        <VStack spacing='50px' marginTop='10'>
            <Box>
                <HStack>
                    <Box marginRight='10vw'>
                        <Heading marginBottom='20px'>Windows</Heading>
                        <Button color='white' bg='black' borderRadius='30'>Download</Button>
                    </Box>
                    <Image src={Windows_Logo} alt='Windows_Logo' height='150'/>
                </HStack>
            </Box>
            <Box>
                <HStack>
                    <Box marginRight='10vw'>
                        <Heading marginBottom='20px' marginRight='66'>Linux</Heading>
                        <Button color='white' bg='black' borderRadius='30'>Download</Button>
                    </Box>
                    <Image src={Linux_Logo} alt='Linux_Logo' height='150'/>
                </HStack>
            </Box>
            <Box>
                <HStack>
                    <Box marginRight='10vw'>
                        <Heading marginBottom='20px' marginRight='83'>Mac</Heading>
                        <Button color='white' bg='black' borderRadius='30'>Download</Button>
                    </Box>
                    <Image src={Mac_Logo} alt='Mac_Logo' height='150'/>
                </HStack>
            </Box>
        </VStack>
        :
        <Flex flexDir='column' alignItems='center' marginTop='10'>
            <Flex flexDir='column' mb='4vh' alignItems='center'>
                <Heading marginBottom='10px'>Windows</Heading>
                <Button color='white' bg='black' borderRadius='30' marginBottom='10px'>Download</Button>
                <Image src={Windows_Logo} alt='Windows_Logo' height='150'/>
            </Flex>
            <Flex flexDir='column' mb='4vh' alignItems='center'>
                <Heading marginBottom='10px'>Linux</Heading>
                <Button color='white' bg='black' borderRadius='30' marginBottom='10px'>Download</Button>
                <Image src={Linux_Logo} alt='Linux_Logo' height='150'/>
            </Flex>
            <Flex flexDir='column' mb='4vh' alignItems='center'>
                <Heading marginBottom='10px'>Mac</Heading>
                <Button color='white' bg='black' borderRadius='30' marginBottom='10px'>Download</Button>
                <Image src={Mac_Logo} alt='Mac_Logo' height='150'/>
            </Flex>
        </Flex>
        }
    </div>
    
  );
}

export default Download;