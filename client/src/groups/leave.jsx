import React from "react";
import axios from "axios";

function Leave({ currentUserId, currentGroupId }){
    
    const groupId = {
        "groupId":currentGroupId
    };

    const leaveGroup = async ()=>{
        try {
            await axios.post('http://localhost:3000/leave',groupId);
            window.location.href = `/?userId=${currentUserId}`;
        } catch (error) {
            console.error('Error reading data :', error);
        }
    }

    return(<>
        <img src="../../data/minus.png" alt="error_loading_add_image" onClick={leaveGroup}/>
    </>)

}

export default Leave;