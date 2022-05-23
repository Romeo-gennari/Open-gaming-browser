import api from "../../api";
import { useEffect, useState } from "react";



export default function GetMe(){
    const [userdata, setUserdata] = useState([]);
      
    const getData = () => {
      api
        .get ("/auth/me")
        .then((response) => {
          console.log(response.data);
          setUserdata(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
    useEffect(() => {
      getData();
    }, []);

    return(userdata);
}