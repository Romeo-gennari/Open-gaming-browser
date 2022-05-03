import './../App.css';
import Sidebar from "./sidebar";
import Headband from "./Header";
import { Modal, ModalOverlay, ModalBody, ModalHeader, ModalFooter, ModalContent, Heading, Box, Image, Flex, Popover, PopoverTrigger, 
    PopoverContent, PopoverArrow, HStack, Button, Center, AspectRatio, Text, Avatar, Divider } from "@chakra-ui/react";
import mmg from '../dummyData/matchmakinggame.json';
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

    return(
        <div className="mmClient" >
            <Modal isOpen={match_found}>
                <ModalOverlay/>
                <ModalContent alignItems='center' margin='auto' textAlign='center' w='auto' maxW='500px'>
                    <ModalHeader justifyContent='center'><Heading color='red' fontSize={{ base: '20px', md:'24px', lg:'32px'}}>You have found a Match!</Heading></ModalHeader>
                    <ModalBody justifyContent='center'>
                        <Flex flexDir='row' h='auto'>
                            <Box w={{base: '120px', md:'165px', lg:'210px'}} maxH='250px'>
                                {mmg.map((game)=>{
                                    return <Box w={{base: '120px', md:'165px', lg:'210px'}}  maxH='250px'>
                                            <Heading mb='5%' fontSize={{ base: '18px', md:'20px', lg:'22px'}} isTruncated>{game.game_name}</Heading>
                                            <Center><AspectRatio w={{base: '100px', md:'140px', lg:'160px'}} ratio={5/7} maxH='210px'><Image src={game.picture} alt='game picture'/></AspectRatio></Center>
                                        </Box>
                                })}
                            </Box>
                            <Divider orientation='vertical' h='auto' mr='2%'/>
                            <Flex flexWrap='wrap' maxH='250px' overflowY='auto' w={{base: '120px', md:'185px', lg:'270px'}} h={{base: '170px', md:'225px', lg: '245px'}} margin='auto'>
                            {mm.map((players)=>{
                                return <Popover isLazy trigger='hover' closeDelay='100' maxW='100px' w='auto' h='auto'>
                                        <PopoverTrigger>
                                            <Avatar size='lg' src={players.profile_picture}/>
                                        </PopoverTrigger>
                                        <PopoverContent w='auto' maxW='100%' textAlign='start' >
                                            <PopoverArrow />
                                            <HStack spacing='2%'>
                                                <Box m='1.5%'>
                                                    <Heading fontSize={{ base: '14px', md: '18px', lg:'24px' }}>{players.player_name}</Heading>
                                                    <AspectRatio w={['56px', '80px', '120px']} ratio={3/4} borderWidth='1px' borderColor='black' maxH='230px'>
                                                        <Image src={players.profile_picture} alt='profile picture' />
                                                    </AspectRatio>
                                                </Box>
                                                <Box m='1.5%'><Text fontSize={{ base: '10px', md: '12px', lg:'16px' }}>{players.player_name}{players.game_name}info info info</Text></Box>
                                            </HStack>
                                        </PopoverContent>
                                    </Popover>  
                            })}
                            </Flex>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Center>
                            <Button mr='2%' bg='green' color='white' colorScheme='green' >Accept</Button>
                            <Button ml='2%' bg='red' color='white' colorScheme='red' >Decline</Button>
                        </Center>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Stats;