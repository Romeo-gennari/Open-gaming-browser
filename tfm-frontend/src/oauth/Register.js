import '../App.css';

import { useState } from 'react';
import { Stack, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Box, Center, Image, Heading, HStack, Link } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import OpenGaming from './../images/open_gaming_logo.png'

import axios from "axios";
import { useNavigate } from "react-router-dom";

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
            axios.post("http://localhost:5050/auth/register",{
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
                <Center height='100vh'>
                    <Box bg='black' borderRadius='5px' borderColor='black' borderWidth='2px' width='500px' height='547px'>
                        <HStack marginBottom='8px' marginTop='5px'>
                            <Image bg='black' boxSize='50px' src={OpenGaming} alt='logo' marginLeft='80px'/>
                            <Link href="/"><Heading color='white'>OPEN GAMING</Heading></Link>
                        </HStack>
                        <Box bg='#DD6B20' maxWidth='500px' height='480px' >
                            <Stack bg='#DD6B20' maxWidth='400px' margin='auto' spacing='5'>
                                <FormControl>
                                    <FormLabel htmlFor="email" marginTop='5'>Email Address</FormLabel>
                                    <Input isRequired bg='white' type='email' id='email' value={emailAddress} onChange={({target}) => setEmailAddress(target.value)}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="username" marginTop='1'>Username</FormLabel>
                                    <Input isRequired bg='white' type='username' id='username' value={username} onChange={({target}) => setUsername(target.value)}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="password"  marginTop='1'>Password</FormLabel>
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
                                    <FormLabel htmlFor="password"  marginTop='1'>ConfirmPassword</FormLabel>
                                    <InputGroup>
                                        <Input isRequired bg='white' type={showPassword ? 'text': 'password'} id='vpassword' value={vpassword} onChange={({target}) => setVPassword(target.value)} />
                                        <InputRightElement width='3rem'>
                                            <Button height='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)} bg='gray.300'>
                                                {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <Button type='submit' bg='black' color='white'>Register</Button>
                            </Stack>
                            <div>
                                <Link ml='50px' href="/#/Login">Déjà membre ?</Link>    
                            </div>
                        </Box>
                    </Box>
                </Center>
            </form>
        </div>
    
  );
}

export default Register;