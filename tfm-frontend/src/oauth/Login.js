import '../App.css';

import { useState} from 'react';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Box, Center, Image, Heading , Link, VStack} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import OpenGaming from './../images/open_gaming_logo.png'

import { useNavigate } from "react-router-dom";

import api from '../api';

function Login() {

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    let navigate = useNavigate();
    
    const handleLogIn = (event) => {
        event.preventDefault();
        console.log('username:', emailAddress);
        console.log('password:', password);
        api.post("auth/login",{
            username:emailAddress,
            password:password
          }).then(res=>{console.log(res);navigate('/Home');}).catch(error=>{console.log(error)});
    }

    return (
        <div className="login">
            <form method='POST' onSubmit={handleLogIn}>
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
                                    <Input isRequired bg='white' id='email' value={emailAddress} onChange={({target}) => setEmailAddress(target.value)}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontSize={['5vw', '2.5vh']} htmlFor="password" mt={['1', '5']}>Password</FormLabel>
                                    <InputGroup>
                                        <Input isRequired bg='white' type={showPassword ? 'text': 'password'} id='password' value={password} onChange={({target}) => setPassword(target.value)} />
                                        <InputRightElement width='3rem'>
                                            <Button height='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)} bg='gray.300'>
                                                {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <Button type='submit' bg='black' color='white' w='full' mt={['4', '7']}>Log In</Button>
                                <Link ml='2px' href="/#/Register" fontSize={['4vw', '2.2vh']} >New on OpenGaming ? Create an Account !</Link> 
                            </Box>
                        </VStack>
                    </Box>
                </Center>
            </form>
        </div>
  );
}

export default Login;