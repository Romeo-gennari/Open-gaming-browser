import Sidebar from "./sidebar";
import Headband from "./Header";

function Calendar(){
    return(
        <div className="pApp">
            <div>
                <Sidebar />
                <Headband />
                <h1>Calendar</h1>
            </div>
        </div>
    );
}

export default Calendar;