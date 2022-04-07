import Sidebar from "./Sidebar";
import Headband from "./Header";

function Library(){
    return(
        <div className="pApp">
            <div>
                <Sidebar />
                <Headband />
                <h1>Library</h1>
            </div>
        </div>
    );
}

export default Library;