import { React, useState, useEffect, useCallback } from "react";
import axios from "axios";

import '../styles/vote.css';

function Vote({currentGroupId}){

    const [votes, setVotes] = useState([]);

    const getVotes = useCallback(async () => {
        try{
            const response = await axios.post("http://localhost:3000/getVotes", {groupId:currentGroupId})
            setVotes(response.data);
        } catch (error){
            console.log("VOTE GET VOTES Error reading data :", error);
        }
    }, [currentGroupId])

    useEffect(()=>{
        getVotes();
    }, [getVotes, currentGroupId])

    return (
        <div id="vote-container">
            <ul id="vote-item">
                {votes.map((vote, index) => (
                    <li id="vote-sep" key={index}>
                        <span id="vote-infos">{vote.movie} : <strong>{vote.nbVote}</strong></span>
                        <button className="vote-bouton">Vote</button>
                    </li>
                ))}
            </ul>
            <button className="vote-bouton">Add Poll</button>
        </div>
    );
}

export default Vote;