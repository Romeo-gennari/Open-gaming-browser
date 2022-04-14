import Sidebar from "./sidebar";
import Headband from "./Header";
import { Flex, Heading, HStack, VStack, Input, Button, Select, Image, Spacer, Modal, useDisclosure, ModalContent, ModalHeader, ModalOverlay, 
    Center, InputGroup, InputRightElement, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark, Box } from '@chakra-ui/react';
import pp from '../images/open_gaming_logo.png';
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { IoIosNotifications, IoIosNotificationsOff } from 'react-icons/io'
import { MdGraphicEq } from "react-icons/md";
import { useNavigate } from "react-router-dom";

var myusername = 'Gahama';
var myemail = 'jacques.zhang@efrei.net';
var mynumber = '06 06 06 06 06';
var password = 'hello';
var mmNotification = true;
var newsNotification = false;

function Settings(){

    const [ username, setUsername ] = useState(myusername);
    const [ email, setEmail ] = useState(myemail);
    const [ number, setNumber ] = useState(mynumber);

    const handleModifyUsername = (event) => {
        event.preventDefault();
        console.log('UsernameChangeTo: ', username);
    }
    const handleModifyEmail = (event) => {
        event.preventDefault();
        console.log('EmailChangeTo: ', email);
    }
    const handleModifyNumber = (event) => {
        event.preventDefault();
        console.log('NumberChangeTo: ', number);
    }

    const { isOpen, onOpen, onClose } = useDisclosure();

    let navigate = useNavigate();

    const [ currentpassword, setCurrentpassword ] = useState('');
    const [ newpassword, setNewpassword ] = useState('');
    const [ vpassword, setVpassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);

    const handleModifyPassword = (event) => {
        if(password === currentpassword && newpassword === vpassword ){
            event.preventDefault();
            console.log('New Password: ', newpassword);
            navigate('/Login');
        }
        else if (password != currentpassword)
        {
            event.preventDefault();
            alert("Current password is wrong! ")
        }
        else if (newpassword != vpassword){
            event.preventDefault();
            alert("Password don't match! ")
        }
    }

    const [ mmNotifOn, mmNotifOff ] = useState(mmNotification);
    const [ newsNotifOn, newsNotifOff ] = useState(newsNotification);

    const [sliderValue, setSliderValue] = useState(30);

    return(
        <div className='pApp'>
            <Sidebar />
            <Headband />
            <div className="paBody">
                <Flex flexDir='column'>
                    <Flex flexDir='row'>
                        <Flex flexDir='column' ml='3%'>
                            <Heading>User Details</Heading>
                            <Spacer/>
                            <form onSubmit={handleModifyUsername}>
                                <HStack>
                                    <Input placeholder="Username" borderRadius='none' bg='white' htmlSize='40' mr='30px' value={username} onChange={({target}) => setUsername(target.value)}></Input>
                                    <Button type='submit' borderRadius='none' bg='orange' color='white' width='300px'>Modify</Button>
                                </HStack>
                            </form>
                            <Spacer/>
                            <form onSubmit={handleModifyEmail}>
                                <HStack>
                                    <Input placeholder="Username" borderRadius='none' bg='white' htmlSize='40' mr='30px' value={email} onChange={({target}) => setEmail(target.value)}></Input>
                                    <Button type='submit' borderRadius='none' bg='orange' color='white' width='300px'>Modify</Button>
                                </HStack>
                            </form>
                            <Spacer/>
                            <form onSubmit={handleModifyNumber}>
                                <HStack>
                                    <Input placeholder="Username" borderRadius='none' bg='white' htmlSize='40' mr='30px' value={number} onChange={({target}) => setNumber(target.value)}></Input>
                                    <Button type='submit' borderRadius='none' bg='orange' color='white' width='300px'>Modify</Button>
                                </HStack>
                            </form>
                            <Spacer/>
                            <Button onClick={onOpen} borderRadius='none' bg='red' color='white' width='458px' colorScheme='red'>Modify the password</Button>
                            <Center>
                            <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
                                <ModalOverlay />
                                <ModalContent>
                                    <Center>
                                        <Flex w='400px' flexDir='column' alignItems='center'>
                                            <ModalHeader color='red'>Password Change</ModalHeader>
                                            <form onSubmit={handleModifyPassword}>
                                                <InputGroup w='350px'>
                                                    <Input isRequired type={showPassword ? 'text' : 'password'} id='currentpassword' placeholder="Current Password" mb='3%' value={currentpassword} onChange={({target}) => setCurrentpassword(target.value)}/>
                                                    <InputRightElement width='3rem'>
                                                        <Button height='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)} bg='gray.300'>
                                                            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                                        </Button>
                                                    </InputRightElement>
                                                </InputGroup>
                                                <InputGroup>
                                                    <Input isRequired type={showPassword ? 'text' : 'password'} id='newpassword' placeholder="New Password" mb='3%' value={newpassword} onChange={({target}) => setNewpassword(target.value)}/>
                                                    <InputRightElement width='3rem'>
                                                        <Button height='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)} bg='gray.300'>
                                                            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                                        </Button>
                                                    </InputRightElement>
                                                </InputGroup>
                                                <InputGroup>
                                                    <Input isRequired type={showPassword ? 'text' : 'password'} id='vpassword' placeholder="Confirm New Password" mb='3%' value={vpassword} onChange={({target}) => setVpassword(target.value)}/>
                                                    <InputRightElement width='3rem'>
                                                        <Button height='1.75rem' size='sm' onClick={() => setShowPassword(!showPassword)} bg='gray.300'>
                                                            {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                                        </Button>
                                                    </InputRightElement>
                                                </InputGroup>
                                                <Spacer/>
                                                <Center mb='3%'>
                                                    <Button onClick={onClose} bg='red' colorScheme='red' w='45%' mr='1%'>Cancel Changes</Button>
                                                    <Button type='submit' bg='orange' colorScheme='orange' w='45%' ml='1%'>Save Password</Button>
                                                </Center>
                                            </form>
                                        </Flex>
                                    </Center>
                                </ModalContent>
                            </Modal>
                            </Center>
                            <Spacer/>
                            <Select borderRadius='none' bg='white' width='458px' defaultValue='online'>
                                <option value='online'>Online</option>
                                <option value='idle'>Idle</option>
                                <option value='donotdisturb'>Do Not Disturb</option>
                                <option value='invisible'>Invisible</option>
                            </Select>
                        </Flex>
                        <Spacer/>
                        <VStack mr='3%'>
                            <Heading>Profile Picture</Heading>
                            <Image height='180px' src={pp} alt='profile picture'/>
                            <Button borderRadius='none'>Select Image</Button>
                        </VStack>
                    </Flex>
                    <Spacer/>
                    <Flex flexDir='column' ml='3%' mt='3%'>
                        <Heading mb='1%'>Notifications</Heading>
                        <Flex flexDir='row' w='400px' mb='1%'>
                            <Text>Matchmaker Notification</Text>
                            <Spacer/>
                            <Button onClick={() => mmNotifOff(!mmNotifOn)}>{mmNotifOn ? <IoIosNotifications/> : <IoIosNotificationsOff/>}</Button>
                        </Flex>
                        <Flex flexDir='row' w='400px' mb='1%'>
                            <Text>Newsletter</Text>
                            <Spacer/>
                            <Button onClick={() => newsNotifOff(!newsNotifOn)}>{newsNotifOn ? <IoIosNotifications/> : <IoIosNotificationsOff/>}</Button>
                        </Flex>
                    </Flex>
                    <Spacer/>
                    <Flex flexDir='column' ml='3%' mt='3%' w='100%'>
                        <Heading mb='1%'>Sound</Heading>
                        <HStack>
                            <Text mr='1%'>Matchmaker Volume</Text>
                            <Slider w='40%' defaultValue={30} onChange={(val) => setSliderValue(val)}>
                                <SliderTrack bg='orange'>
                                    <SliderFilledTrack bg='tomato' />
                                </SliderTrack>
                                <SliderThumb boxSize={6}>
                                    <Box color='tomato' as={MdGraphicEq} />
                                </SliderThumb>
                                <SliderMark value={sliderValue} textAlign='center' bg='tomato' color='white' mt='-12' ml='-8' w='10%'>
                                    {sliderValue}%
                                </SliderMark>
                            </Slider>
                        </HStack>
                    </Flex>
                </Flex>
            </div>
        </div>
    );
}

export default Settings;
