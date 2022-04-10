import styled from "styled-components";
import { Link, Heading, Flex, Box, Image, Spacer } from "@chakra-ui/react";
import OpenGaming from '../images/open_gaming_logo.png'


function Headband(){
    return(
        <Flex alignItems='row' h='40px' paddingLeft={20} bgColor='#ffffff'>
            <Image bg='#ffffff' boxSize='40px' src={OpenGaming} alt='logo' ml ='5px'/>
            <Heading fontSize={30}>OpenGaming</Heading>
            <Spacer/>
            <Box>profile</Box>
        </Flex>
    )
}

export default Headband;