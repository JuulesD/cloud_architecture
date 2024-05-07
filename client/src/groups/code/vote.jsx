import { React, useState, useEffect, useCallback } from "react";
import axios from "axios";

import '../styles/vote.css';

function Vote({currentUserId, currentGroupId}){
    
    const [name, setName] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [votes, setVotes] = useState([]);

    const getVotes = useCallback(async () => {
        try{
            const response = await axios.post("http://localhost:3000/getVotes", {groupId:currentGroupId});
            if (JSON.stringify(response.data) !== JSON.stringify(votes))
                setVotes(response.data);
        } catch (error){
            console.log("VOTE GET VOTES Error reading data :", error);
        }
    }, [currentGroupId, votes])

    const addVote = useCallback(async (movieName) => {

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
                getVotes();
                setVotes(updatedVotes);
            }
        } catch (error){
            console.log("VOTE GET VOTES Error reading data :", error);
        }
    }, [currentUserId, currentGroupId, votes, getVotes])

    
    const addPoll = async (event) => {
        event.preventDefault();
        const request = {
            groupId:currentGroupId,
            name:name
        }
        try{
            await axios.post("http://localhost:3000/addPoll", request);
            const newPoll = {
                "name": name,
                "nbVote": 0,
                "votersId": []
            }
            let updatedVotes = votes;
            updatedVotes.push(newPoll);
            setVotes(updatedVotes);
            setShowForm(false);
            setName("");
        } catch (error){
            console.log("ADD POLL Error sending data :", error);
        }
    }

    useEffect(()=>{
        getVotes();
    }, [getVotes, votes, currentGroupId])

    
    return (
        <div id="vote-container">
            <ul id="vote-item">
                {votes.map((vote, index) => (
                    <li id="vote-sep" key={index}>
                        <span id="vote-infos">{vote.name} : <strong>{vote.nbVote}</strong></span>
                        <button className="vote-bouton" onClick={() => addVote(vote.name)}>Vote</button>
                    </li>
                ))}
            </ul>
            <div>
                {showForm ? (
                    <form onSubmit={addPoll}>

                        <div className="pollName-field">
                            <label className="pollName-label"></label>
                            <input className="pollName-input"  onChange={(event) => setName(event.target.value)}/>
                        </div>
        
                        <button className="vote-bouton" type="submit">Add</button>
                    </form>
                ) : (
                    <button onClick={() => setShowForm(true)} className="vote-bouton">Add Poll</button>
                )}
            </div>
        </div>
    );
}

export default Vote;