import { React, useState, useEffect, useCallback } from "react";
import axios from "axios";

import '../styles/addVote.css';

function AddVote({currentUserId, currentGroupId}){

    const [votes, setVotes] = useState([]);

    const getVotes = useCallback(async () => {
        try{
            const response = await axios.post("http://localhost:3000/getVotes", {groupId:currentGroupId})
            setVotes(response.data);
        } catch (error){
            console.log("VOTE GET VOTES Error reading data :", error);
        }
    }, [currentGroupId])

    const add = useCallback(async (movieName) => {

        function findLastVote(updatedVotes){
            for (let i = 0; i!==updatedVotes.length;i++)
                if ((updatedVotes[i].votersId).includes(currentUserId))
                    return i;
        
            return -1;
        }

        const newVote = {
            groupId:currentGroupId,
            name:movieName
        }

        try{
            const response = await axios.post("http://localhost:3000/vote", newVote);
            if (response.data === "Vote added."){
                let updatedVotes = votes;
                let lastVoteIndex = findLastVote(updatedVotes);
                if (lastVoteIndex !== -1)
                    updatedVotes[lastVoteIndex].nbVote--;
                for (let i = 0; i!==updatedVotes.length;i++){
                    if (updatedVotes[i].movie === movieName){
                        updatedVotes[i].nbVote++;
                        break;
                    }
                }
                setVotes(updatedVotes);
            }
        } catch (error){
            console.log("VOTE GET VOTES Error reading data :", error);
        }
    }, [currentUserId, currentGroupId, votes])

    useEffect(()=>{
        getVotes();
    }, [getVotes, votes, currentGroupId])

    return(
        <ul id="vote-item">
            {votes.map((vote, index) => (
                <li id="vote-sep" key={index}>
                    <span id="vote-infos">{vote.movie} : <strong>{vote.nbVote}</strong></span>
                    <button className="vote-bouton" onClick={() => add(vote.movie)}>Vote</button>
                </li>
            ))}
        </ul>
    )
}

export default AddVote;