import Sidebar from "./sidebar";
import Headband from "./Header";
import userdata from '../dummyData/test.json';

import styled from 'styled-components';
import {React, useState, useEffect} from "react";
import axios from "axios";

const ResearchBar = styled.input`
color: black;
width: 13vw;
`

const MasterFriendList = styled.div`
padding: 10px 3px 3px 5vw;
width 20vw;
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

function GetFriends() {
    const [data, setData] = useState("");
    
    const getData = () => {
      axios
        .get ("http://localhost:5051/friends.json")
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
    useEffect(() => {
      getData();
    }, []);
    
    return(
      data
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
            else if (friend.username.toLowerCase().includes(query.toLowerCase())) {
              return friend;
            }
          }).map((friend) => (<NarrowFriendListed key={friend.id} onClick={() => {}} >{friend.username}</NarrowFriendListed>))}
            
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
        <SearchBar input={data.filter(friend => {if (friend.status==status.input) {return friend;}})}/>
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
                <CoFi>Online Friends</CoFi>
                <DisplayFriends input={1}/>
                <DeFi>Offline Friends</DeFi>
                <DisplayFriends input={0}/>
            </MasterFriendList>
            <div className="paBody">
                <p>Now I gotta do the f'ing chat. Thx Kevin :unamused: :angry: :flamethrower: </p>
            </div>
        </div>
    );
}

export default Friends;