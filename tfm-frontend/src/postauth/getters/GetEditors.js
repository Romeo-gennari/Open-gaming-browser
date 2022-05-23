import {useState, useEffect} from "react";
import api from '../../api';

export default function GetEditors() {
    const [data, setData] = useState([]);
    
    const getData = () => {
      api.get ("/editors")
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
    useEffect(() => {
      getData();
    }, []);
    
    return(
      data
    );
}