import { Center, HStack, VStack, Heading, Input, Box, Textarea, Button, FormControl } from '@chakra-ui/react';
import { useState } from 'react';


function Contact() {

    const [name, setName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [message, setMessage] = useState('');

    const handleContact = event => {
        event.preventDefault();
        console.log('Name:', name);
        console.log('Email:', emailAddress);
        console.log('Message:', message);
    }

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
                            <form onSubmit={handleContact}>
                                <VStack>
                                    <FormControl>
                                        <Input type='text' placeholder='Name' borderRadius='m' htmlSize='45' bg='white' borderWidth='2px' borderColor='gray.400' value={name} onChange={({target}) => setName(target.value)}/>
                                    </FormControl>
                                    <FormControl>
                                        <Input type='email' placeholder='Email' borderRadius='m' bg='white' borderWidth='2px' borderColor='gray.400' value={emailAddress} onChange={({target}) => setEmailAddress(target.value)}/>
                                    </FormControl>
                                    <FormControl>
                                        <Textarea type='text' placeholder='Message' borderRadius='m' height='157' bg='white' borderWidth='2px' borderColor='gray.400' value={message} onChange={({target}) => setMessage(target.value)} />
                                    </FormControl>
                                    <Button type='submit' bg='black' color='white'>Submit</Button>
                                </VStack>
                            </form>
                            <Box className="Efrei Paris Map">
                                <iframe 
                                    width="550" 
                                    height="300" 
                                    src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=efrei%20paris%20Cr%C3%A9teil+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                                </iframe>
                            </Box>
                        </HStack>
                </Center>
            </VStack>

        </div>
    
  );
}

export default Contact;