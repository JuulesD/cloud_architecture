import { React, useState, useEffect, useCallback } from "react";
import axios from "axios";

import '../styles/list.css';

function List({currentGroupId}){

    const [list, setList] = useState([]);

    const getList = useCallback(async () => {
        try{
            const response = await axios.post("http://localhost:3000/getList", {groupId:currentGroupId})
            setList(response.data);
        } catch (error){
            console.log("LIST GET LIST Error reading data :", error);
        }
    }, [currentGroupId])

    useEffect(()=>{
        getList();
    }, [getList, currentGroupId])

    return (
        <div id="list-container">
            <ul className="list-item">
                {list.map((item, index) => (
                    <li id='list-item-sep' key={index}>
                        <strong>{item.name}</strong>
                        <ul className="list-item">
                            {item.elements.map((element, subIndex) => (
                                <li key={subIndex}>{element}</li>
                            ))}
                        <button className="list-bouton">Add Element</button>
                        </ul>
                    </li>
                ))}
            </ul>
            <button className="list-bouton">Add Item</button>
        </div>
    );
}

export default List;