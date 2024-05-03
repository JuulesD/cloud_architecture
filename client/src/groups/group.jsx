import { React, useState, useEffect, useCallback } from "react";
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";

import Leave from './leave';
import Invite from './invite';

var currentUserId;
var currentGroupId;

function Group(){

    const searchParams = new URLSearchParams(useLocation().search);
    currentUserId = parseInt(searchParams.get('userId'));
    currentGroupId = parseInt(searchParams.get('groupId'));

    const [groupInfos, setGroupInfos] = useState([]);

    const getGroupInfos = useCallback(async () => {
        const groupData = {
            "groupId":currentGroupId
        };
        try {
            const response = await axios.post('http://localhost:3000/getGroupInfos', groupData );
            setGroupInfos(response.data);
        } catch (error) {
            console.error('Error reading data :', error);
        }
    }, []);

    useEffect(() => {
        if (currentUserId !== null && currentUserId !==-1 && currentGroupId !== null && currentGroupId !==-1)
            getGroupInfos();
    }, [getGroupInfos]);

    return(<>
        <header>
            <nav>
                <Link to={`/?userId=${currentUserId}`} className="title">
                    <img src="../../data/popcorn.ico" alt="error_loading_logo" /> CineGather
                </Link>
                <p id="title" >Group Name: {groupInfos.name}</p>
                <Invite currentGroupId={currentGroupId}/>
                <Leave currentUserId={currentUserId} currentGroupId={currentGroupId}/>
                <img src="../../data/list.png" alt="error_loading_add_image"/>
                
            </nav>
        </header>
    </>)
}

export default Group;