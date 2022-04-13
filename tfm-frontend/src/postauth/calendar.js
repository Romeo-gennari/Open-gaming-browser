import Sidebar from "./sidebar";
import Headband from "./Header";

import React from 'react';
import { useState} from 'react';
import styled from 'styled-components';

const ClusterBox = styled.div`
  border: solid black 2px;
  background-color: white;
  padding: 2px 2px 2px
  `

const ButtonCluster = styled.div`
  display:flex;
  justify-content: center;
  width: 80vh;
  margin-left: auto;
  margin-right: auto;
  `
const Button = styled.button`
  background-color: grey;
  font-size: 20px;
  border: solid black 1px;
  margin: 0px 0px;
  padding: 8px 8px;
  cursor: pointer;
  `
const ButtonToggle = styled(Button)`
opacity: 0.6;
${({activated}) =>
activated && `opacity: 1;`
}
`;
const types1 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
const dispHours1 = ["00'00","00'30","01'00","01'30","02'00","02'30","03'00","03'30","04'00","04'30","05'00","05'30","06'00","06'30","07'00","07'30","08'00","08'30","09'00","09'30","10'00","10'30","11'00","11'30"]
const types2 = [24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47]
const dispHours2 = ["12'00","12'30","13'00","13'30","14'00","14'30","15'00","15'30","16'00","16'30","17'00","17'30","18'00","18'30","19'00","19'30","20'00","20'30","21'00","21'30","22'00","22'30","23'00","23'30"]
let profileTime = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

let selected = 0;

function GetDateInfo(){

  let selectedTime;
  if(selected<23) selectedTime = dispHours1[selected];
  else selectedTime = dispHours2[selected];

  return(<>{selectedTime}</>)
}

let info;

function swapTime(type){
  profileTime[type] = (profileTime[type]+1)%2;
  selected = type;
  info = GetDateInfo;

}

//https://react.school/ui/button
function DisplayDateButtons(){
  const [activated, setActive] = useState(types1[0])
  const [activated2, setActive2] = useState(types2[0])
  
  // This function is a hot mess, will repair later
  return(
    <ClusterBox>
        <ButtonCluster>
          {types1.map(type=>(
            <ButtonToggle
              key={type}
              activated={profileTime[type] === 1}
              onClick={() => {setActive(type);swapTime(type)}}>
              {dispHours1[type]}
            </ButtonToggle>
          ))}
        </ButtonCluster>
        <ButtonCluster>
          {types2.map(type=>(
            <ButtonToggle
              key={type}
              activated={profileTime[type] === 1}
              onClick={() => {setActive2(type);swapTime(type)}}>
              {dispHours2[type%24]}
            </ButtonToggle>
          ))}
        </ButtonCluster>
        <Button onClick={()=>{console.log(profileTime);}}>
          Confirm
        </Button>
          
    </ClusterBox>
    
  )
  
}

function DisplayDateInfo(){

  return(
    <ClusterBox>
      <p>Waiting for slot info ...</p>
      <p>Selected slot: {info}</p>
      <p>Selected Games:</p>
      <ul>
        <li>Satisfactory</li>
        <li>Minecraft</li>
      </ul>
      
      
    </ClusterBox>
  );
}


function Calendar(){
    return(
        <div className='pApp'>
            <Sidebar />
            <Headband />
            <div className="paBody">
                <div>
                    <h1>Calendar</h1>
                    <DisplayDateButtons />
                    <DisplayDateInfo />
                </div>
            </div>
        </div>
    );
}

export default Calendar;