import styled from "styled-components";
import { Link } from "@chakra-ui/react";

const Head = styled.div`
height:50px;
background-color: #FFFFFF;
margin-bottom: 35px;
`

function Headband(){

    return(
        <Head>
            <h1>OPEN GAMING</h1>
        </Head>
    );
}

export default Headband;