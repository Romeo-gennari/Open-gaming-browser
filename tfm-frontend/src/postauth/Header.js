import styled from "styled-components";
import { Link, Heading, Flex, Box, Image, Spacer, HStack, Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react";
import OpenGaming from '../images/open_gaming_logo.png';

import GetMe from "./getters/GetMe";

const UserAvatar = styled.img`
width:  128px;
height: 128px;
display: block;
margin-left: auto;
margin-right: auto;
`

const MarginalBox = styled.p`
margin-right: 2vw;
`

function GetHeaderProfile(){

    let userdata = GetMe();

    return(
        <div>
            <Popover trigger='hover'>
                <PopoverTrigger>
                    <MarginalBox>{userdata.username}</MarginalBox>
                </PopoverTrigger>
                <PopoverContent w='auto' padding={1}>
                    <UserAvatar href={userdata.avatar_url} alt="avatar"></UserAvatar>
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
            <Link href="/#/home" style={{ textDecoration: 'none' }}>
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