import '../App.css';

import { useState } from 'react';
import { VStack, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Box, Center, Image, Heading, Link } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import OpenGaming from './../images/open_gaming_logo.png'

import axios from "axios";
import { useNavigate } from "react-router-dom";

import api from '../api';

function Register() {

    const [emailAddress, setEmailAddress] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [vpassword, setVPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    let navigate = useNavigate();

    const handleRegister = (event) => {
        if(password===vpassword){
            event.preventDefault();
            console.log('EmailAddress', emailAddress);
            console.log('Password', password);
            api.post("/auth/register",{
                username : username,
                email: emailAddress,
                password:password
              }).then(res=>{console.log(res)}).catch(error=>{console.log(error)});
            navigate('/Login')
        }
        else
        {
            event.preventDefault();
            alert("Passwords don't match!")
        }
    }

    return (
        <div className="login">
            <form method='POST' onSubmit={handleRegister}>
            <Center height='95vh'>
                    <Box backgroundColor='#1A202C' w={['full', 'md']} p='1' borderColor='black' borderRadius='10' m='2%'>
                        <VStack spacing='1' align='center' w='full' mb>
                            <Link href="/" display='flex' justifyContent='center'>
                                <Image boxSize={['12vw', '7vh']} src={OpenGaming} alt='logo' />
                                <Heading fontSize={['8vw', '5vh']} color='white'>OPEN GAMING</Heading>
                            </Link>
                            <Box background='#DD6B20' w='full' p='5' borderRadius='10' >
                                <FormControl>
                                    <FormLabel fontSize={['5vw', '2.5vh']} htmlFor="email" >Email Address</FormLabel>
                                    <Input isRequired bg='white' type='email' id='email' value={emailAddress} onChange={({target}) => setEmailAddress(target.value)}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontSize={['5vw', '2.5vh']} htmlFor="username" marginTop='1' mt={['1', '3']}>Username</FormLabel>
                                    <Input isRequired bg='white' type='username' id='username' value={username} onChange={({target}) => setUsername(target.value)}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontSize={['5vw', '2.5vh']} htmlFor="password"  marginTop='1' mt={['1', '3']}>Password</FormLabel>
                                    <InputGroup>
                                        <Input isRequired bg='white' type={showPassword ? 'text': 'password'} id='password' value={password} onChange={({target}) => setPassword(target.value)} />
                                        <InputRightElement width='3rem'>
                                            <Button height='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)} bg='gray.300'>
                                                {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontSize={['5vw', '2.5vh']} htmlFor="password"  marginTop='1' mt={['1', '3']}>ConfirmPassword</FormLabel>
                                    <InputGroup>
                                        <Input isRequired bg='white' type={showPassword ? 'text': 'password'} id='vpassword' value={vpassword} onChange={({target}) => setVPassword(target.value)} />
                                        <InputRightElement width='3rem'>
                                            <Button height='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)} bg='gray.300'>
                                                {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <Button type='submit' bg='black' color='white' w='full' mt={['4', '7']}>Register</Button>
                                <Link ml='2px' href="/#/Login" fontSize={['4vw', '2.2vh']} >Already have an Account ? Log In !</Link>   
                            </Box>
                        </VStack>
                    </Box>
                </Center>


            </form>
        </div>
    
  );
}


export default Register;