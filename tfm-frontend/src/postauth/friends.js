import Sidebar from "./sidebar";
import Headband from "./Header";

function Friends(){
    return(
        <div className="pApp">
            <div>
                <Sidebar />
                <Headband />
                <h1>Friends</h1>
            </div>
        </div>
    );
}

export default Friends;