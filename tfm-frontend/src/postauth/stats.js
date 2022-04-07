import Sidebar from "./Sidebar";
import Headband from "./Header";

function Stats(){
    return(
        <div className="pApp">
            <div>
                <Sidebar />
                <Headband />
                <h1>Stats</h1>
            </div>
        </div>
    );
}

export default Stats;