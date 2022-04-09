import Sidebar from "./sidebar";
import Headband from "./Header";
import frienddata from '../dummyData/friends.json';

import styled from 'styled-components';
import {React, useState} from "react";

const ResearchBar = styled.input`
color: black;
width: 13vw;
`

const MasterFriendList = styled.div`
padding: 10px 3px 3px 3px;
width 15vw;
background-color:grey;
height:95vh;
`

const NarrowFriendList = styled.div`
display:flex;
flex-direction:column;
align:left;
width: 15vw;
margin: 1px 1px 15px 1px;
`
const NarrowFriendListed = styled.a`
margin: 5px 1px;
width: 14vw;
height: 25px;
color: white;
font-size: 25px;
text-align: left;
`
const CoFi = styled.h1`
font-size: 25px;
color: green;
`
const DeFi = styled.h1`
font-size: 25px;
color: red;
`

function NarrowFriendsLister(research) {

    const refinedData = frienddata.filter((el) => { return el.username.toLowerCase().includes(research.input) })
        
    if (research.input === ''){
        return(
            <NarrowFriendList>
               {frienddata.map((game)=>(<NarrowFriendListed key={game.id} onClick={() => {}} >{game.username}</NarrowFriendListed>))} 
            </NarrowFriendList>
        );
    }
    else {
        return(
            <NarrowFriendList>
               {refinedData.map((game)=>(<NarrowFriendListed key={game.id} onClick={() => {}}>{game.username}</NarrowFriendListed>))} 
            </NarrowFriendList>
        )
    }
}
function Friends(){
    
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
                <MasterFriendList>
                <div className='search'>
                    <ResearchBar id="outlined-basic" label="Search"  placeholder='Search' onChange={inputHandler}/>
                </div>
                <CoFi>Online Friends</CoFi>
                <NarrowFriendsLister input={inputText}/>
                <DeFi>Offline Friends</DeFi>
                <NarrowFriendsLister input={inputText}/>
                </MasterFriendList>
            </div>
        </div>
    );
}

export default Friends;