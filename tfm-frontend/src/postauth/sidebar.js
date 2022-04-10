import styled from "styled-components";
import { Link, Button, Flex, Text, Box, HStack, Drawer, DrawerOverlay, DrawerContent, VStack, useDisclosure} from "@chakra-ui/react";
import axios from "axios";
import { useState, useRef } from 'react';
import { useNavigate } from "react-router";
import { HamburgerIcon } from "@chakra-ui/icons";
//npm install react-icons --save 
import { FiSettings, FiCalendar, FiUsers, FiHome, FiBookOpen } from 'react-icons/fi'
import { IoGameControllerOutline, IoBarChartOutline, IoPower } from 'react-icons/io5'

const Disco = styled.button`
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 25px;
    color: #FF1111;
    display: block;
`;

function Sidebar(){

    let navigate = useNavigate();
    
    const handleDisco = (event) => {
        event.preventDefault();
        axios.post("http://localhost:5050/auth/login").then(res=>{console.log(res)}).catch(error=>{console.log(error)});
        console.log("PostDisco");
        navigate('/');
    }

    const [barSize, changebarSize] = useState("closed")

    return(
        <div className='Sidebar'>
                <Flex bg='#111' w={barSize == "closed" ? "48px" : "10%"} h='100%' position='fixed' flexDir='column' alignItems='start' zIndex={1}>
                    <HStack>
                        <Button borderRadius='none' bg='#DD6B20' size='md' onClick={() => {
                            if (barSize=="closed"){
                                changebarSize("open");
                            }
                            else{
                                changebarSize("closed")
                            }}}>
                            <HamburgerIcon/>
                        </Button>
                    </HStack>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/Home" w='100%'><Button borderRadius='none' colorScheme='orange' bg='#111' size='md'><FiHome /></Button></Link>
                        : 
                        <Link href="/Home" w='100%'><Button w='100%' borderRadius='none' colorScheme='orange' bg='#111'><Text fontSize="125%">Home</Text></Button></Link>
                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/Friends" w='100%'><Button borderRadius='none' colorScheme='orange' bg='#111' size='md'><FiUsers/></Button></Link>
                        : 
                        <Link href="/Friends" w='100%'><Button w='100%' borderRadius='none' colorScheme='orange' bg='#111'><Text fontSize="125%">Friends</Text></Button></Link>
                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/Library" w='100%'><Button borderRadius='none' colorScheme='orange' bg='#111' size='md'><FiBookOpen/></Button></Link>
                        : 
                        <Link href="/Library" w='100%'><Button w='100%' borderRadius='none' colorScheme='orange' bg='#111'><Text fontSize="125%">Library</Text></Button></Link>
                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/Games" w='100%'><Button borderRadius='none' colorScheme='orange' bg='#111' size='md'><IoGameControllerOutline/></Button></Link>
                        : 
                        <Link href="/Games" w='100%'><Button w='100%' borderRadius='none' colorScheme='orange' bg='#111'><Text fontSize="125%">Games</Text></Button></Link>
                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/Stats" w='100%'><Button borderRadius='none' colorScheme='orange' bg='#111' size='md'><IoBarChartOutline/></Button></Link>
                        : 
                        <Link href="/Stats" w='100%'><Button w='100%' borderRadius='none' colorScheme='orange' bg='#111'><Text fontSize="125%">Stats</Text></Button></Link>
                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/Calendar" w='100%'><Button borderRadius='none' colorScheme='orange' bg='#111' size='md'><FiCalendar/></Button></Link> 
                        : 
                        <Link href="/Calendar" w='100%'><Button w='100%' borderRadius='none' colorScheme='orange' bg='#111'><Text fontSize="125%">Calendar</Text></Button></Link>
                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/Settings" w='100%'><Button borderRadius='none' colorScheme='orange' bg='#111' size='md'><FiSettings/></Button></Link>
                        : 
                        <Link href="/Settings" w='100%'><Button w='100%' borderRadius='none' colorScheme='orange' bg='#111'><Text fontSize="125%">Settings</Text></Button></Link>
                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Button borderRadius='none' colorScheme='orange' bg='#111' onClick={handleDisco} size='md'><IoPower color='red'/></Button> 
                        : 
                        <Button w='100%' borderRadius='none' colorScheme='orange' bg='#111' onClick={handleDisco}><Text fontSize="125%" color='red'>Disconnect</Text></Button>
                        }
                    </Box>
                </Flex>
                
        </div>
    );

}

export default Sidebar;