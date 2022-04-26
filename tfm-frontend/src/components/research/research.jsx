
import {React, useState} from "react";

export default function SearchBar (Data){
    const [query, setQuery] = useState("")

    console.log(Data);
    Data = Data.input;
    console.log(Data);
    return(
      <div>
          <input placeholder="Research" onChange={event => setQuery(event.target.value)} />
          {Data.filter(post => {
            if (query === '') {}
            else if (post.name.toLowerCase().includes(query.toLowerCase())) {
              return post;
            }
          }).map((post, index) => (
            <div className="box" key={index}>
              <button onClick={console.log(post.id)}>{post.name}</button>
            </div>
          ))}
      </div>
    )
}