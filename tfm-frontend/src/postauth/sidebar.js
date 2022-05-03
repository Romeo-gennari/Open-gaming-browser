import styled from "styled-components";
import { Link, Button, Flex, Text, Box, HStack, Drawer, DrawerOverlay, DrawerContent, VStack, useDisclosure, background, color} from "@chakra-ui/react";
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
                <Flex bg='#111' w={barSize == "closed" ? "auto" : "15%"} h='100%' position='fixed' flexDir='column' alignItems='start' zIndex={1}>
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
                        <Link href="/#/Home" w='100%'><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><FiHome color='white'/></Flex></Link>
                        : 
                        <Link href="/#/Home" w='100%'><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><FiHome color='white'/><Text color='white' fontSize="125%" paddingLeft='20px'>Home</Text></Flex></Link>
                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/#/Friends" w='100%'><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><FiUsers color='white'/></Flex></Link>
                        : 
                        <Link href="/#/Friends" w='100%'><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><FiUsers color='white'/><Text color='white' fontSize="125%" paddingLeft='20px'>Friends</Text></Flex></Link>

                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/#/Library" w='100%'><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><FiBookOpen color='white'/></Flex></Link>
                        : 
                        <Link href="/#/Library" w='100%'><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><FiBookOpen color='white'/><Text color='white' fontSize="125%" paddingLeft='20px'>Library</Text></Flex></Link>
                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/#/Games" w='100%'><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><IoGameControllerOutline color='white'/></Flex></Link>
                        : 
                        <Link href="/#/Games" w='100%'><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><IoGameControllerOutline color='white'/><Text color='white' fontSize="125%" paddingLeft='20px'>Games</Text></Flex></Link>

                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/#/Stats" w='100%'><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><IoBarChartOutline color='white'/></Flex></Link>
                        : 
                        <Link href="/#/Stats" w='100%'><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><IoBarChartOutline color='white'/><Text color='white' fontSize="125%" paddingLeft='20px'>Stats</Text></Flex></Link>

                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/#/Calendar" w='100%'><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><FiCalendar color='white'/></Flex></Link>
                        : 
                        <Link href="/#/Calendar" w='100%'><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><FiCalendar color='white'/><Text color='white' fontSize="125%" paddingLeft='20px'>Calendar</Text></Flex></Link>

                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/#/Settings" w='100%'><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><FiSettings color='white'/></Flex></Link>
                        : 
                        <Link href="/#/Settings" w='100%'><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><FiSettings color='white'/><Text color='white' fontSize="125%" paddingLeft='20px'>Settings</Text></Flex></Link>

                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Flex onClick={handleDisco} flexDir='row' _hover={{background: '#DD6B20', cursor: 'pointer'}} alignItems='center' h='50px' paddingLeft='15px'><IoPower color='red'/></Flex>
                        : 
                        <Flex onClick={handleDisco} flexDir='row' _hover={{background: '#DD6B20', cursor: 'pointer'}} alignItems='center' h='50px' paddingLeft='15px'><IoPower color='red'/><Text color='white' fontSize="125%" paddingLeft='20px'>Disconnect</Text></Flex>
                        }
                    </Box>
                </Flex>
                
        </div>
    );

}

export default Sidebar;