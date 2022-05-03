import styled from "styled-components";
import { Link, Heading, Flex, Box, Image, Spacer, HStack, Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import OpenGaming from '../images/open_gaming_logo.png';

import { WarningIcon, CheckCircleIcon } from "@chakra-ui/icons";

import axios from 'axios';
import { useEffect, useState } from "react";

const UserAvatar = styled.img`
width:  128px;
height: 128px;
display: block;
margin-left: auto;
margin-right: auto;
`


function DisplayConnexionIcon(status){
    if (status == 1) return(<CheckCircleIcon w={5} h={5} color="green" />);
    else return(<WarningIcon w={5} h={5} color="red.500" />);
}

function GetHeaderProfile(){

    const [userdata, setUserdata] = useState([]);
      
    const getData = () => {
      axios
        .get ("http://localhost:5051/test2.json")
        .then((response) => {
          console.log(response.data);
          setUserdata(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
    useEffect(() => {
      getData();
    }, []);

    return(
        <div>
            <Popover trigger='hover'>
                <PopoverTrigger>
                    <Box><DisplayConnexionIcon input={userdata.status} />{userdata.username}</Box>
                </PopoverTrigger>
                <PopoverContent w='auto' padding={1}>
                    <UserAvatar href={userdata.icon} alt="avatar"></UserAvatar>
                    <h2>{userdata.username}</h2>
                    <p>Button to change status</p>
                    <Link href="/#/settings">Settings</Link>
                </PopoverContent>
            </Popover>
        </div>
    );

}

function Headband(){
    return(
        <Flex alignItems='row' h='40px' paddingLeft={50} bgColor='#ffffff' w='auto' >
            <Link href="/#/home">
                <HStack>
                    <Image bg='#ffffff' boxSize='40px' src={OpenGaming} alt='logo' ml ='5px'/>
                    <Heading fontSize={{inv:0, sm:10, md:20, lg:30}}>OpenGaming</Heading>
                </HStack>
            </Link>
            <Spacer/>
            <GetHeaderProfile/>
        </Flex>
    )
}

export default Headband;