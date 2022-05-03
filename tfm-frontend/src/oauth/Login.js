import '../App.css';

import { useState} from 'react';
import { Stack, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Box, Center, Image, Heading, HStack, Link} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import OpenGaming from './../images/open_gaming_logo.png'

import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    let navigate = useNavigate();
    
    const handleLogIn = (event) => {
        event.preventDefault();
        console.log('EmailAddress', emailAddress);
        console.log('Password', password);
        axios.post("http://localhost:5050/auth/login",{
            email: emailAddress,
            password:password
          }).then(res=>{console.log(res)}).catch(error=>{console.log(error)});
          
        console.log("PostPost");
        navigate('/Home');
    }

    return (
        <div className="login">
            <form method='POST' onSubmit={handleLogIn}>
                <Center height='100vh'>
                    <Box bg='black' borderRadius='5px' borderColor='black' borderWidth='2px' width='500px' height='347px'>
                        <HStack marginBottom='8px' marginTop='5px'>
                            <Image bg='black' boxSize='50px' src={OpenGaming} alt='logo' marginLeft='80px'/>
                            <Link href="/"><Heading color='white'>OPEN GAMING</Heading></Link>
                        </HStack>
                        <Box bg='#DD6B20' maxWidth='500px' height='280px' >
                            <Stack bg='#DD6B20' maxWidth='400px' margin='auto' spacing='5'>
                                <FormControl>
                                    <FormLabel htmlFor="email" marginTop='5'>Email Address</FormLabel>
                                    <Input isRequired bg='white' id='email' value={emailAddress} onChange={({target}) => setEmailAddress(target.value)}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <InputGroup>
                                        <Input isRequired bg='white' type={showPassword ? 'text': 'password'} id='password' value={password} onChange={({target}) => setPassword(target.value)} />
                                        <InputRightElement width='3rem'>
                                            <Button height='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)} bg='gray.300'>
                                                {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                <Button type='submit' bg='black' color='white'>Log In</Button>
                            </Stack>
                            <div>
                                <Link ml='50px' href="/#/Register">Nouveau sur OpenGaming ?</Link>  
                            </div>
                        </Box>
                    </Box>
                </Center>
            </form>        
            
        </div>
    
  );
}

export default Login;