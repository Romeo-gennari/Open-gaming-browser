import './../App.css';
import { Flex, Center, HStack, VStack, Heading, Input, Box, Textarea, Button, FormControl, useMediaQuery } from '@chakra-ui/react';
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

  const [isLarge] = useMediaQuery('(min-width: 920px)')

  return (
      <div className="Contact">
        
        {isLarge ?
        <Flex flexDir='column' padding='6vh' >
            <Heading fontSize={{ base: '32px', md: '44px' }} mt='4vh' mb='3vw'>Contact Us</Heading>
            <Center>
                <HStack spacing='4vw' mb='4vh'>
                    <form onSubmit={handleContact}>
                        <VStack>
                            <FormControl>
                                <Input type='text' placeholder='Name' borderRadius='m' w='450px' bg='white' borderWidth='2px' borderColor='gray.400' value={name} onChange={({target}) => setName(target.value)}/>
                            </FormControl>
                            <FormControl>
                                <Input type='email' placeholder='Email' borderRadius='m' bg='white' borderWidth='2px' borderColor='gray.400' value={emailAddress} onChange={({target}) => setEmailAddress(target.value)}/>
                            </FormControl>
                            <FormControl>
                                <Textarea resize='none' type='text' placeholder='Message' borderRadius='m' height='157' bg='white' borderWidth='2px' borderColor='gray.400' value={message} onChange={({target}) => setMessage(target.value)} />
                            </FormControl>
                            <Button type='submit' bg='black' color='white' colorScheme='blue'>Submit</Button>
                        </VStack>
                    </form>
                    <Box className="Efrei Paris Map" w={{ base: '380px', md: '460px' }} h={{ base: '250px', md: '300px' }}>
                        <iframe
                            title='title'
                            width='100%'
                            height='100%'
                            src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=efrei%20paris%20Cr%C3%A9teil+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                        />
                    </Box>
                </HStack>
            </Center>
        </Flex>
        :
        <Flex flexDir='column' padding='3vw'>
            <Center mt='4vh' mb='5vw'>
                <Heading fontSize={{ base: '32px', md: '44px', lg: '52px'}}>Contact Us</Heading>
            </Center>
            <form onSubmit={handleContact}>
                <VStack mb='2vh'>
                    <FormControl>
                        <Input type='text' placeholder='Name' borderRadius='m' w={{base: '250px', md: '300px', lg: '400px' }} bg='white' borderWidth='2px' borderColor='gray.400' value={name} onChange={({target}) => setName(target.value)}/>
                    </FormControl>
                    <FormControl>
                        <Input type='email' placeholder='Email' borderRadius='m' w={{base: '250px', md: '300px', lg: '400px' }} bg='white' borderWidth='2px' borderColor='gray.400' value={emailAddress} onChange={({target}) => setEmailAddress(target.value)}/>
                    </FormControl>
                    <FormControl>
                        <Textarea resize='none' type='text' placeholder='Message' borderRadius='m' w={{base: '250px', md: '300px', lg: '400px' }} height='157px' bg='white' borderWidth='2px' borderColor='gray.400' value={message} onChange={({target}) => setMessage(target.value)} />
                    </FormControl>
                    <Button type='submit' bg='black' color='white' colorScheme='blue'>Submit</Button>
                </VStack>
            </form>
            <Center mb='2vh'>
                <Box className="Efrei Paris Map" w={{base: '250px', md: '300px', lg: '400px' }} h='220px'>
                    <iframe
                        title='title'
                        width='100%'
                        height='100%'
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2628.649536629006!2d2.361917500946093!3d48.78858066347233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e673e24be8f239%3A0x3d6f6bc71dbfd0d8!2sEfreitech!5e0!3m2!1sen!2sfr!4v1653336658503!5m2!1sen!2sfr"
                    />
                </Box>
            </Center>
        </Flex>
        }
      </div>
    
  );
}

export default Contact;