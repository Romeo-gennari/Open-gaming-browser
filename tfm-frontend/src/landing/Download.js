import './../App.css';

import Windows_Logo from '../images/windows_logo.png';
import Mac_Logo from '../images/mac_logo.png';
import Linux_Logo from '../images/linux_logo.png';
import { HStack, VStack, Box, Heading, Button, Image } from '@chakra-ui/react';

function Download() {
  return (
    
    <div className="Download">
        <VStack spacing='50px' marginTop='10'>
            <Box>
                <HStack>
                    <Box marginRight='250'>
                        <Heading marginBottom='20px'>Windows</Heading>
                        <Button color='white' bg='black' borderRadius='30'>Download</Button>
                    </Box>
                    <Image src={Windows_Logo} alt='Windows_Logo' height='150'/>
                </HStack>
            </Box>
            <Box>
                <HStack>
                    <Box marginRight='250'>
                        <Heading marginBottom='20px' marginRight='66'>Linux</Heading>
                        <Button color='white' bg='black' borderRadius='30'>Download</Button>
                    </Box>
                    <Image src={Linux_Logo} alt='Linux_Logo' height='150'/>
                </HStack>
            </Box>
            <Box>
                <HStack>
                    <Box marginRight='250'>
                        <Heading marginBottom='20px' marginRight='83'>Mac</Heading>
                        <Button color='white' bg='black' borderRadius='30'>Download</Button>
                    </Box>
                    <Image src={Mac_Logo} alt='Mac_Logo' height='150'/>
                </HStack>
            </Box>
        </VStack>


    </div>
    
  );
}

export default Download;