import styled from "styled-components";
import { Link, Heading, Flex, Box, Image, Spacer } from "@chakra-ui/react";
import OpenGaming from '../images/open_gaming_logo.png'


/*
const Head = styled.div`
height:5vh;
background-color: #FFFFFF;
padding-left: 80px;
`

function Headband(){

    return(
        <Head>
            <h1>OPEN GAMING</h1>
        </Head>
    );
}
*/

function Headband(){
    return(
        <Flex alignItems='row' h='40px'>
            <Image bg='#e4e1de' boxSize='40px' src={OpenGaming} alt='logo' ml ='5px'/>
            <Heading>OpenGaming</Heading>
            <Spacer/>
            <Box>profile</Box>
        </Flex>
    )
}

export default Headband;