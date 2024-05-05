import { React, useState, useEffect } from "react";
import axios from "axios";

import '../styles/invite.css';

function Invite({ currentGroupId }){

    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchVisibleAdd, setIsSearchVisibleAdd] = useState(false);

    const toggleSearchAdd = () => {
        setIsSearchVisibleAdd(!isSearchVisibleAdd);
    };

    const [message, setMessage] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
        setMessage("");
        }, 3000);

        return () => clearTimeout(timeout);
    }, [message]);

    const invite = async ()=>{
        const inviteInfos = {
            "username":searchQuery,
            "groupId":currentGroupId
        }
        console.log(inviteInfos);
        try {
            const response = await axios.post('http://localhost:3000/invitation',inviteInfos);
            setSearchQuery('');
            setMessage(response.data);
        } catch (error) {
            console.error('Error reading data :', error);
        }
    }
    
    return(<>
        <div id="invite-container">
            <img id="invite-img" src="../../data/add.png" alt="error_loading_add_image"onClick={toggleSearchAdd} />
            {isSearchVisibleAdd && (
                <div id="invite-searchBox">
                <input id="invite-searchBox-input" type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button id="invite-searchBox-bouton" onClick={invite}>Invite</button>
                </div>
            )}
        </div>
    </>)

}

export default Invite;