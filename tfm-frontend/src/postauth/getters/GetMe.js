import { useEffect, useState } from "react";
import api from "../../api";

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