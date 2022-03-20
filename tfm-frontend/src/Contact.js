import { Center, HStack, VStack, Heading, Input, Box } from '@chakra-ui/react';


function Contact() {
  return (
    <div className="Contact">
        <Box boxSize='40px'/>
        <VStack>
            <Center>
                <Heading>Contact</Heading>
            </Center>
            <Box boxSize='40px'/>
            <Center >
                    <HStack spacing='4'>
                        <VStack>
                            <Input type='text' placeHolder='Name' borderRadius='m' htmlSize='45' height='10'/>
                            <Input type='text' placeHolder='Email' borderRadius='m' htmlSize='45' height='10'/>
                            <Input type='text' placeHolder='Message' borderRadius='m' htmlSize='45' height='40'/>
                        </VStack>
                        <Box>
                            <div class="Efrei Paris Map">
                                <iframe 
                                    width="400" 
                                    height="256" 
                                    frameborder="0" 
                                    scrolling="no"
                                    marginheight="0" 
                                    marginwidth="0" 
                                    id="gmap_canvas" 
                                    src="https://maps.google.com/maps?width=373&amp;height=311&amp;hl=en&amp;q=Efrei%20Paris%20Cr%C3%A9teil+(Efrei%20Paris)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                                </iframe>
                            </div>
                        </Box>
                    </HStack>
            </Center>
        </VStack>

    </div>
    
  );
}

export default Contact;