import Sidebar from "./sidebar";
import Headband from "./Header";

function Settings(){
    return(
        <div className="pApp">
            <Sidebar />
            <Headband />
            <div className="paBody">
                <h1>Settings</h1>
            </div>
        </div>
    );
}

export default Settings;