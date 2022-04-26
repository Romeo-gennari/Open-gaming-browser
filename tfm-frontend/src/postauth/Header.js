import styled from "styled-components";
import { Link, Heading, Flex, Box, Image, Spacer, HStack } from "@chakra-ui/react";
import OpenGaming from '../images/open_gaming_logo.png';

import { WarningIcon, CheckCircleIcon } from "@chakra-ui/icons";

import userdata from '.././dummyData/test.json';
import axios from 'axios';

function DisplayConnexionIcon(status){
    if (status == 1) return(<CheckCircleIcon w={5} h={5} color="green" />);
    else return(<WarningIcon w={5} h={5} color="red.500" />);
}

function GetHeaderProfile(){

    //let nuserdata = axios.get("localhost:5050/user/data");
    let ruserdata = userdata[0];

    return(
        <div><DisplayConnexionIcon input={ruserdata.status} />{ruserdata.username}</div>
    );

}

function Headband(){
    return(
        <Flex alignItems='row' h='40px' paddingLeft={20} bgColor='#ffffff'>
            <Link href="/home">
                <HStack>
                    <Image bg='#ffffff' boxSize='40px' src={OpenGaming} alt='logo' ml ='5px'/>
                    <Heading fontSize={30}>OpenGaming</Heading>
                </HStack>
            </Link>
            <Spacer/>
            <Box><GetHeaderProfile /></Box>
        </Flex>
    )
}

export default Headband;