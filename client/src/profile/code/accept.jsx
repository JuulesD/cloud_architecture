import { React, useState, useEffect } from "react";
import axios from "axios";

import "../styles/accept.css";

function Accept(){

    const exception = {
        userId: -1,
        username: "",
        groupId: -1,
        groupName:""
    };
    const [invitations, setInvitations] = useState([exception]);

    const choose = async (groupId, acceptance) => {
        const answer = {
            groupId:groupId,
            accept:acceptance
        }
        try {
            await axios.put('http://localhost:3000/accept', answer);
            if (invitations.length === 1)
                setInvitations([exception]);
            else
                setInvitations(invitations.filter(invitation => invitation.groupId !== groupId));
        } catch (error) {
            console.error('ACCEPT (choose) : Error sending data :', error);
        }
    }

    useEffect(() => {
        const getUserWaitingsInfos = async () => {
            try{
                const response = await axios.get('http://localhost:3000/getUserWaitingsInfos');
                if (response.data.length !== 0)
                    setInvitations(response.data);
            } catch (error) {
                console.error('ACCEPT (getUserWaitingInfos) : Error sending data :', error);
            }
        }

        getUserWaitingsInfos();
    }, [])

    return (
        <>
            {invitations[0].userId !== -1 && <div className="invitation-container">
                {invitations.map(invitation => (
                    invitation.groupId !== -1 && (
                        <div id='invitation-infos' key={invitation.groupId}>
                            <p className="invitation-message">
                                You're invited to join <strong>{invitation.groupName}</strong> by <strong>{invitation.username}</strong>.
                            </p>
                            <div className="invitation-buttons">
                                <button className="accept-button" onClick={() => choose(invitation.groupId, true)}>Accept</button>
                                <button className="reject-button" onClick={() => choose(invitation.groupId, false)}>Reject</button>
                            </div>
                        </div>
                    )
                ))}
            </div>}
        </>
    );
    
}

export default Accept;