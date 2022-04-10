import Sidebar from "./sidebar";
import Headband from "./Header";

function Stats(){
    return(
        <div className="pApp">
            <Sidebar />
            <Headband />
            <div className="paBody">
                <h1>Stats</h1>
            </div>
        </div>
    );
}

export default Stats;