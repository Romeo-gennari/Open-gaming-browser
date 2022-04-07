import Sidebar from "./sidebar";
import Headband from "./Header";

function Settings(){
    return(
        <div className="pApp">
            <div>
                <Sidebar />
                <Headband />
                <h1>Settings</h1>
            </div>
        </div>
    );
}

export default Settings;