import { React, useState, useEffect } from "react";
import axios from "axios";

function Accept(){

    const choose = async (groupId, acceptance) => {
        const answer = {
            groupId:groupId,
            accept:acceptance
        }
        try {
            await axios.put('http://localhost:3000/accept', answer);
            setInvitations(invitations.filter(invitation => invitation.groupId !== groupId));
        } catch (error) {
            console.error('ACCEPT (choose) : Error sending data :', error);
        }
    }
    
    const [invitations, setInvitations] = useState([]);

    useEffect(() => {
        const getUserWaitingsInfos = async () => {
            try{
                const response = await axios.get('http://localhost:3000/getUserWaitingsInfos');
                if (response.data.length === 0){
                    const exception = {
                        userId: -1,
                        username: "",
                        groupId: -1,
                        groupName:""
                    };
                    setInvitations([exception]);
                }
                else
                    setInvitations(response.data);
            } catch (error) {
                console.error('ACCEPT (getUserWaitingInfos) : Error sending data :', error);
            }
        }

        getUserWaitingsInfos();
    }, [])

    return(<>
        <option key={-1} value={-1}></option>
            {invitations.map(invitation => (
                invitation.groupId !== -1 && (
                <div key={invitation.groupId} >
                    <option value={invitation.groupId}>
                        You're invited to join {invitation.groupName} by {invitation.username}.
                    </option>
                    <button onClick={() => choose(invitation.groupId, true)}>Accepter</button>
                    <button onClick={() => choose(invitation.groupId, false)}>Refuser</button>
                </div>)
            ))}
    </>)
}

export default Accept;