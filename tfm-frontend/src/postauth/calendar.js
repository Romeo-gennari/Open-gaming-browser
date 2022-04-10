import Sidebar from "./sidebar";
import Headband from "./Header";

import React from 'react';
import { useState} from 'react';
import styled from 'styled-components';

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



function Calendar(){
    return(
        <div className="pApp">
          <Sidebar />
          <Headband />
            <div className="paBody">
                <h1>Calendar</h1>
                <DisplayDateButtons />
            </div>
        </div>
    );
}

export default Calendar;