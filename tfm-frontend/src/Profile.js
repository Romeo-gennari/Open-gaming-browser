import './App.css';

import {Get, GetFriendList, GetGameList, GetUserHeader, ProfilePage} from './queries/getters';

import React from 'react';
import { useState} from 'react';
import styled from 'styled-components';




const ProfileTabs = styled.button`
  font-size: 20px;
  padding: 10px 60px;
  cursor: pointer;
  opacity: 0.6;
  background: white;
  border: 0;
  outline: 0;
  color: black;
  ${({ active }) =>
    active &&
    `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
`;
const ButtonRow = styled.div`
  display: flex;
  align: center;
`;
const subpages = ['Friends', 'Games', 'Settings'];


//https://react.school/ui/tabs
function ProfileTabsSelector(basedata) {
  const [active, setActive] = useState(subpages[0]);
  var body = CirconstancialBody(active,basedata);
  return (
    <div>
      <ButtonRow>
        {subpages.map(type => (
          <ProfileTabs
            key={type}
            active={active === type}
            onClick={() => {setActive(type);body=CirconstancialBody(type);}}
          >
            {type}
          </ProfileTabs>
        ))}
      </ButtonRow>
      {body}

    </div>
  );
}
function CirconstancialBody(chosen,basedata)
{
  if(chosen === 'Friends'){
    console.log(chosen)
    return (
    <div>
      <p> Profile: {chosen} </p>

      <GetFriendList input={basedata}/>
    </div>
  );
  }
  if(chosen === 'Games'){
    console.log(chosen)
    return(
      <div>
        <p> Profilex: {chosen} </p>
        <p>You're most definitely on the games tab</p>
        <GetGameList input={basedata} />
      </div>
    )
  }
  else{
    return(
      <div className='App'>
        <header className='App-header'>
          
          <p> Profilex: {chosen} </p>
          <p>You're most definitely on the settings tab</p>
          <DisplayDateButtons />
        </header>
      </div>
    )
}
}
  


const ButtonCluster = styled.div`
display:flex
aligne: center`
const Button = styled.button`
  background-color: blue;
  font-size: 20px;
  margin: 2px 1px;
  padding: 10px 10px;
  cursor: pointer;
  `
const ButtonToggle = styled(Button)`
opacity: 0.6;
${({activated}) =>
activated && `opacity: 1;`
}
`;
const types = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
const dispHours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
let profileTime = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

function swapTime(type){
  profileTime[type] = (profileTime[type]+1)%2
}

//https://react.school/ui/button
function DisplayDateButtons(){
  const [activated, setActive] = useState(types[0])
  
  return(
    <div>
        <ButtonCluster>
          {types.map(type=>(
            <ButtonToggle
              key={type}
              activated={profileTime[type] === 1}
              onClick={() => {setActive(type);swapTime(type)}}>
              {dispHours[type]}
            </ButtonToggle>
          ))}
        </ButtonCluster>
        <Button onClick={()=>{console.log(profileTime);}}>
          Confirm
        </Button>
          
    </div>
    
  )
  
}

function Profile() { 
  let basedata = Get(0);
  console.log(basedata);
  return (
    
    <div className="App">
        <header className="App-header">
          <ProfilePage />
          <GetUserHeader input={basedata} />
          <ProfileTabsSelector input={basedata} />

        </header>
        
    </div>
    
  );
}

export default Profile;