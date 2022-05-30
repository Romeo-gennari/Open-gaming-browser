import styled from "styled-components";
import { Link, Button, Flex, Text, Box, HStack } from "@chakra-ui/react";
import { useState, useRef } from 'react';
import { useNavigate } from "react-router";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FiSettings, FiUsers, FiHome, FiBookOpen } from 'react-icons/fi'
import { IoGameControllerOutline, IoBarChartOutline, IoPower, IoAlbumsOutline } from 'react-icons/io5'

import api from "../api";

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
        api.post("/auth/logout").then(res=>{console.log(res)}).catch(error=>{console.log(error)});
        console.log("PostDisco");
        navigate('/');
    }

    const [barSize, changebarSize] = useState("closed")

    return(
        <div className='Sidebar'>
                <Flex className='sidebar' bg='#1A202C' w={barSize === "closed" ? "auto" : '12em' } h='100%' position='fixed' flexDir='column' alignItems='start' zIndex={99}>
                    <HStack w='100%'>
                        <Button borderRadius='none' _hover={{background: '#DD6B20'}} bg='#111' color='white' w={barSize == "open" ? "md" : "auto"} size='md' onClick={() => {
                            if (barSize=="closed"){
                                changebarSize("open");
                            }
                            else{
                                changebarSize("closed");
                            }}}>
                            <HamburgerIcon/>
                        </Button>
                    </HStack>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/#/Home" w='100%' style={{ textDecoration: 'none' }} ><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><FiHome color='white'/></Flex></Link>
                        : 
                        <Link href="/#/Home" w='100%' style={{ textDecoration: 'none' }} ><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><FiHome color='white'/><Text color='white' fontSize="125%" paddingLeft='20px'>Home</Text></Flex></Link>
                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/#/Friends" w='100%' style={{ textDecoration: 'none' }} ><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><FiUsers color='white'/></Flex></Link>
                        : 
                        <Link href="/#/Friends" w='100%' style={{ textDecoration: 'none' }} ><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><FiUsers color='white'/><Text color='white' fontSize="125%" paddingLeft='20px'>Friends</Text></Flex></Link>

                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/#/Library" w='100%' style={{ textDecoration: 'none' }} ><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><FiBookOpen color='white'/></Flex></Link>
                        : 
                        <Link href="/#/Library" w='100%' style={{ textDecoration: 'none' }} ><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><FiBookOpen color='white'/><Text color='white' fontSize="125%" paddingLeft='20px'>Presets</Text></Flex></Link>
                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/#/Gamemodes" w='100%' style={{ textDecoration: 'none' }} ><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><IoAlbumsOutline color='white'/></Flex></Link>
                        : 
                        <Link href="/#/Gamemodes" w='100%' style={{ textDecoration: 'none' }} ><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><IoAlbumsOutline color='white'/><Text color='white' fontSize="125%" paddingLeft='20px'>Gamemodes</Text></Flex></Link>

                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/#/Games" w='100%' style={{ textDecoration: 'none' }} ><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><IoGameControllerOutline color='white'/></Flex></Link>
                        : 
                        <Link href="/#/Games" w='100%' style={{ textDecoration: 'none' }} ><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><IoGameControllerOutline color='white'/><Text color='white' fontSize="125%" paddingLeft='20px'>Games</Text></Flex></Link>

                        }
                    </Box>
                    <Box w='100%'>
                        {barSize == "closed" ? 
                        <Link href="/#/Settings" w='100%' style={{ textDecoration: 'none' }} ><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><FiSettings color='white'/></Flex></Link>
                        : 
                        <Link href="/#/Settings" w='100%' style={{ textDecoration: 'none' }} ><Flex flexDir='row' _hover={{background: '#DD6B20'}} alignItems='center' h='50px' paddingLeft='15px'><FiSettings color='white'/><Text color='white' fontSize="125%" paddingLeft='20px'>Settings</Text></Flex></Link>

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