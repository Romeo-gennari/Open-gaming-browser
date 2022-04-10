import './../App.css';
import Sidebar from "./sidebar";
import Headband from "./Header";
import frienddata from '../dummyData/friends.json';

import styled from 'styled-components';
import {React, useState} from "react";
import {Box} from "@chakra-ui/react"

const ResearchBar = styled.input`
color: black;
width: 85vw;
padding: 3px 3px 3px 3px;
margins: 3px 3px 3px 3px;
`

const FriendList = styled.div`
display:flex;
flex-direction:column;
align:left;
`
const FriendListed = styled.a`
margin: 5px 5px;
border: solid black;
padding: 2px 2px 2px 2px;
width: 85vw;
height: 75px;
color: grey;
font-size: 30px;
text-align: left;
`
const CoFi = styled.h1`
font-size: 30px;
padding: 3px 3px 3px 3px;
color: green;
`

function FriendsLister(research) {

    const refinedData = frienddata.filter((el) => { return el.username.toLowerCase().includes(research.input) })
        
    if (research.input === ''){
        return(
            <FriendList>
               {frienddata.map((game)=>(<FriendListed key={game.id} onClick={() => {}} >{game.username}</FriendListed>))} 
            </FriendList>
        );
    }
    else {
        return(
            <FriendList>
               {refinedData.map((game)=>(<FriendListed key={game.id} onClick={() => {}}>{game.username}</FriendListed>))} 
            </FriendList>
        )
    }
}

function Home(){

    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        var lowercase = e.target.value.toLowerCase();
        setInputText(lowercase);
    };

    return(
        <div className="pApp">
            <Sidebar />
            <Headband />
            <div className="paBody">
                <div className='search'>
                    <ResearchBar id="outlined-basic" label="Search"  placeholder='Search' onChange={inputHandler}/>
                </div>
                <CoFi>Online Friends</CoFi>
                <FriendsLister input={inputText}/>
                <CoFi>Research match</CoFi>
                <p>TBA</p>

            </div>
        </div>
        
    );
}

export default Home;