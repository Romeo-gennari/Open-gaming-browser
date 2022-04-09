import Sidebar from "./sidebar";
import Headband from "./Header";

function Library(){
    return(
        <div className="pApp">
            <Sidebar />
            <Headband />
            <div className="paBody">
                <h1>Library</h1>
            </div>
        </div>
    );
}

export default Library;