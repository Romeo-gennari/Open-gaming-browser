import React from "react";
import { useState, useEffect, getAllData} from "react";

import axios from "axios";


import styled from "styled-components";
import createPalette from "@mui/material/styles/createPalette";
import { extendTheme } from "@chakra-ui/react";
import { integerPropType } from "@mui/utils";
import { render } from "react-dom";

const FriendList = styled.div`
display:flex;
align:left;
`
const FriendListed = styled.button`
margin: 5px 5px;
border: solid black;
padding: 5px 10px 5px 10px;
width: 24vw;
`
const ProfileHeader = styled.div`
border-bottom: solid black;
display: flex;
`
const ProfileHeaderText = styled.div`
margin: 5px 15px;
text-align:left;
`
const ProfileTitle = styled.h1`
font-size: 60px
`
const avatar_cont = styled.div`
width: 128px;
heigth: 128px;
border: solid black;
`
const profileavatar = styled.img`
width: 128px;
heigth: 128px;
`


//Other way of doing things

export class ProfilePage extends React.Component{
  state = {
    id:0,
    username:"default",
    email:"default",
    icon:"",
    friends:[],
    games:[],
    age:0,

  };

  componentDidMount(){
      axios.get("http://localhost:5051/test2.json").then(res=>{console.log(res);
      this.setState({
        id:res.data.id,
        username:res.data.username,
        email:res.data.email,
        icon:res.data.icon,
        friends:res.data.friends,
        games:res.data.games,
        age:res.data.age});
    });
  }

  render(){
    return(
    <div>
      <p>This is a totally new way to display {this.state.email}</p>
    </div>);
    
  }

}


//Paragraphe from https://javascript.plainenglish.io/display-api-data-using-axios-in-a-react-app-with-hooks-eb9ca298f27
export function Get(id=0) {
  const [data, setData] = useState("");
  
  const getAllData = () => {
    axios
      //.get("https://jsonplaceholder.typicode.com/users")
      .get ("http://localhost:5051/test.json")
      .then((response) => {
        console.log(response.data);
        setData(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  useEffect(() => {
    getAllData();
  }, []);
  
  return (
    
    data

  );
}

export function GetUserName(basedata){
  //const data = Get(0);
  const displayData = () => {
    return basedata ? (
      <h3>{basedata.username}</h3>
    ) : (
      <h3>No data yet</h3>
    );
  }
  return (
    <>
      {displayData()}
    </>
  );
}

export function GetUserHeader(basedata){
  const data = Get(0);
  return(
    <ProfileHeader>
      <img src={data.icon} alt="Avatar ?"></img>
      <ProfileHeaderText>
        <ProfileTitle>{basedata.username}</ProfileTitle>
        <h1>{data.age} years old.</h1>
      </ProfileHeaderText>
    </ProfileHeader>
  )
}

export function GetFriendList(basedata){
  const data = Get(0);
  console.log(data);
  const displayData = () => {
    return data ? (
      <FriendList>
        {data.friends.map(friend=>(
        
          <FriendListed key={friend.id}>{friend.username}<img src={friend.avatar}></img></FriendListed>
        
      ))}
      </FriendList>) : 
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

export function GetGameList(basedata){
  const data = Get(0);
  const displayData = () => {
    return data ? (
      <FriendList>
        {data.games.map(game=>(
        
          <FriendListed key={game.id}>{game.title}<img src={game.avatar}></img></FriendListed>
        
      ))}
      </FriendList>) : 
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
  
