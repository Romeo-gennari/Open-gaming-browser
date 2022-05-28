import Sidebar from "./sidebar";
import Headband from "./Header";

import styled from 'styled-components';
import {React, useState, useEffect} from "react";
import { Heading, Popover, PopoverTrigger, PopoverContent, Button } from "@chakra-ui/react";

import GetFriends from "./getters/GetFriends";
import GetAllUsers from "./getters/GetAllUsers";

import api from "../api";

const ResearchBar = styled.input`
color: black;
width: 13vw;
`

const MasterFriendList = styled.div`
padding: 10px 3px 3px 5vw;
width 20vw;
background-color:grey;
height:95vh;
position: absolute;
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

function AddFriend(){

  const [newFriendName, setNewFriendName] = useState("");
  //const [newFriendId, setNewFriendId] = useState(-1);

  let userslist = GetAllUsers();
  console.log(userslist);

  function handleAddFriend(id){
    if(1){
      console.log(id);
      api.post("/friends",{user2_id: id,friend_group:" "}).then(console.log);
      console.log("We got there");
    }
    
  }

  return(
      <div>
          <Popover placement='right'>
              <PopoverTrigger>
                  <Button>Add</Button>
              </PopoverTrigger>
              <PopoverContent w='auto' padding={1} >
                
                <input placeholder="Friend Pseudo" onChange={event => setNewFriendName(event.target.value)} />
                {userslist.filter(game => {
                  if (newFriendName === '') {}
                  else if (game.username.toLowerCase().includes(newFriendName.toLowerCase())) {return game;}
                }).map((game) => (<p key={game.id} onClick={() => {handleAddFriend(game.id)}}>{game.username}</p>))}

              </PopoverContent>
          </Popover>
      </div>
  );
}

function SearchBar (Data){
    const [query, setQuery] = useState("")
    Data = Data.input;
    console.log(Data);
    return(
      <div>
          <ResearchBar placeholder="Research" onChange={event => setQuery(event.target.value)} />
          <NarrowFriendList>
          {Data.filter(friend => {
            if (query === '') {
                return friend;
            }
            else if (friend.user2.username.toLowerCase().includes(query.toLowerCase())) {
                return friend;
            }
          }).map((friend) => (<NarrowFriendListed key={friend.user2.id} onClick={() => {}} >{friend.user2.username}</NarrowFriendListed>))}
            
            </NarrowFriendList>
      </div>
    )
}

function DisplayFriends(status){
    const data = GetFriends();
    console.log(data);
    const displayData = () => {
    return data ? (
      <div>
        <SearchBar input={data}/>
      </div>) : 
      (
      <h3>No data yet</h3>
    );
  }
  return (
    <>
      {displayData()}
    </>
  );
}

function Friends(){

    return(
        <div className="pApp">
            <Sidebar />
            <Headband />
            <MasterFriendList>
                <AddFriend />
                <CoFi>Friends</CoFi>
                <DisplayFriends input={1}/>
            </MasterFriendList>
            <div className="paBody">
              <Heading textAlign='center'>OpenChat : Coming soon...</Heading>
              <Heading textAlign='center'>Stay Tuned !!</Heading>
            </div>
        </div>
    );
}

export default Friends;