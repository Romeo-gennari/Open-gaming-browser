import styled from "styled-components";
import { Link } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router";

const Navigation = styled.div`
    height: 100%;
    width: 160px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    padding-top: 20px;
`;
const Aslink = styled.button`
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
`;
const Disco = styled.button`
    padding: 6px 8px 6px 16px;
    text-decoration: none;
    font-size: 25px;
    color: #FF1111;
    display: block;
`;



function Sidebar(){

    let navigate = useNavigate();
    
    const handleDisco = (event) => {
        event.preventDefault();
        axios.post("http://localhost:5050/auth/login").then(res=>{console.log(res)}).catch(error=>{console.log(error)});
        console.log("PostDisco");
        navigate('/');
    }


    return(
        <Navigation>
            <Link href="/Home"><Aslink>Home</Aslink></Link>
            <Link href="/Friends"><Aslink>Friends</Aslink></Link>
            <Link href="/Library"><Aslink>Library</Aslink></Link>
            <Link href="/Games"><Aslink>Games</Aslink></Link>
            <Link href="/Stats"><Aslink>Stats</Aslink></Link>
            <Link href="/Calendar"><Aslink>Calendar</Aslink></Link>
            <Link href="/Settings"><Aslink>Settings</Aslink></Link>
            <a onClick={handleDisco}><Disco>Disconnect</Disco></a>
        </Navigation>
    );
}

export default Sidebar;