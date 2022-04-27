import './../App.css';
import Sidebar from "./sidebar";
import Headband from "./Header";
import { Modal, ModalOverlay, ModalBody, ModalHeader, ModalFooter, ModalContent, Heading, Box, Image, Flex, Popover, PopoverTrigger, PopoverContent, PopoverArrow, HStack, Button, Center, AspectRatio, Text } from "@chakra-ui/react";
import pp from '../images/open_gaming_logo.png';
import mm from '../dummyData/matchmaking.json';
import { constant } from 'lodash';

import styled from 'styled-components';

const GameList = styled.div`
margin-top: 3vh;
display:flex;
flex-wrap: wrap;
`

function Stats(){

    var match_found = true;
    var game_name = 'Minecraft';

    return(
        <div className="mmClient" >
            <Modal isOpen={match_found}>
                <ModalOverlay/>
                <ModalContent alignItems='center' margin='auto' textAlign='center' w='auto' maxW='450px'>
                    <ModalHeader justifyContent='center'><Heading color='red' fontSize={{ base: '20px', md:'24px', lg:'40px' }}>You have found a Match!</Heading></ModalHeader>
                    <ModalBody justifyContent='center'>
                        <Heading mb='5%' fontSize={{ base: '18px', md:'20px', lg:'36px' }} alignSelf='center'>{game_name}</Heading>
                        <Flex flexWrap='wrap'>
                        {mm.map((item)=>{
                            return <Popover isLazy trigger='hover' closeDelay='100' maxW='100px'>
                                    <PopoverTrigger>
                                        <Flex flexDir='row' >
                                            <AspectRatio w={['46px', '64px', '80px']} ratio={2/3} borderWidth='1px' borderColor='black'>
                                                <Image src={item.profile_picture} alt='profile picture' />
                                            </AspectRatio>
                                        </Flex>
                                    </PopoverTrigger>
                                    <PopoverContent w='auto' maxW='100%' textAlign='start' >
                                        <PopoverArrow />
                                        <HStack spacing='2%'>
                                            <Box m='1.5%'>
                                                <Heading fontSize={{ base: '14px', md: '18px', lg:'24px' }}>{item.player_name}</Heading>
                                                <AspectRatio w={['56px', '80px', '120px']} ratio={3/4} borderWidth='1px' borderColor='black'>
                                                    <Image src={item.profile_picture} alt='profile picture' />
                                                </AspectRatio>
                                            </Box>
                                            <Box m='1.5%'><Text fontSize={{ base: '10px', md: '12px', lg:'16px' }}>{item.player_name}{item.game_name}info info info</Text></Box>
                                        </HStack>
                                    </PopoverContent>
                                </Popover>  
                        })}
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Center>
                            <Button mr='1%'>Accept</Button>
                            <Button ml='1%'>Decline</Button>
                        </Center>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Stats;