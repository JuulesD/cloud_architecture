import { React, useState, useEffect, useCallback } from "react";
import axios from "axios";

import '../styles/addPoll.css';

function AddPoll({currentUserId, currentGroupId}){

    const [name, setName] = useState('');
    const [showForm, setShowForm] = useState(false);

    const add = async () => {
        try{
            await axios.post("http://localhost:3000/addPoll", {name:name})
        } catch (error){
            console.log("ADD POLL Error sending data :", error);
        }
    }

    return (
        <div>
            {showForm ? (
                <form>

                    <div className="pollName-field">
                        <label className="pollName-label"></label>
                        <input className="pollName-input"  onChange={(event) => setName(event.target.value)}/>
                    </div>
    
                    <button id="connect-submit" type="submit" onClick={() => add()}>Add</button>
                </form>
            ) : (
                <button onClick={() => setShowForm(true)} className="vote-bouton">Add Poll</button>
            )}
        </div>
    );
}

export default AddPoll;
