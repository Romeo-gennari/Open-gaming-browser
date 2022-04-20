import Sidebar from "./sidebar";
import Headband from "./Header";
import userdata from '../dummyData/test.json';

import styled from "styled-components";

const LeLibraryList = styled.div`
display:flex;
flex-direction:column;
align:left;
`
const LeLibraryListed = styled.a`
margin: 5px 5px;
border: solid black;
border-radius: 3px;
padding: 2px 2px 2px 2px;
width: 85vw;
height: 15vh;
color: grey;
font-size: 30px;
text-align: left;
background-color: white;
display: flex;
`
const LibraryButton = styled.button`
border: 2px solid red;
border-radius: 5px;
margin-left: 10px;
margin-right: 10px;
font-size: 20px;
color: red;
`
const PHeader = styled.div`
background-color: grey;
height: 4vh;
font-size: 3vh;
margin-bottom: 15px;
`
const TagList = styled.div`
border: 1px solid black;
border-radius: 3px;
display: flex;
flex-wrap: wrap;
width: 40vw;
margin-left: auto;
`
const Tagged = styled.div`
height: 3vh;
font-size: 2vh;
border: 1px solid black;
border-radius: 3px;
padding: 2px 2px 2px 2px;
margin: 1px 1px 1px 1px;
`
const GameResearch = styled.input`
height: 3vh;
width: 9vw;
border: 1px solid black;
border-radius: 3px;
padding: 2px 2px 2px 2px;
margin: 1px 1px 1px 1px;
`


function LibraryList(){
    return(
        <div>
            <LeLibraryList>
               {userdata[0].games.map((game)=>(
               <LeLibraryListed key={game.id} onClick={() => {}} >
                    <div>
                        {game.title}
                        <div><LibraryButton>Specify Time</LibraryButton><LibraryButton>Remove Game</LibraryButton></div>
                    </div>
                    <div>
                    </div>
               </LeLibraryListed>))} 
            </LeLibraryList>
        </div>
        
    );
}

function PresetHeader(){
    return(
    <PHeader>
        <div>Add    Sort    Select</div>
    </PHeader>
    )
}

function PresetList(){
    return(
        <div>
            <LeLibraryList>
                {userdata[0].games.map((game)=>(
                <LeLibraryListed key={game.id} onClick={() => {}} >
                    <div>
                        {game.title}
                        <div><LibraryButton>Edit</LibraryButton><LibraryButton>Delete</LibraryButton></div>
                    </div>
                    <TagList>
                        {userdata[0].games.map((game)=>(
                            <Tagged key={game.id}>{game.title}</Tagged>
                        ))}
                        <GameResearch label="Search">
                        </GameResearch>
                    </TagList> 
                </LeLibraryListed>))} 
            </LeLibraryList>
        </div>
        
    );
}

function Library(){
    return(
        <div className="pApp">
            <Sidebar />
            <Headband />
            <div className="paBody">
                <h1>Library</h1>
                <PresetHeader/>
                <PresetList/>
            </div>
        </div>
    );
}

export default Library;