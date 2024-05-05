import React from "react";
import { Link, useLocation } from 'react-router-dom';

import Leave from './leave';
import Invite from './invite';
import DisplayMembers from './displayMembers';

import '../styles/group.css';

var currentUserId;
var currentGroupId;

function Group(){

    const searchParams = new URLSearchParams(useLocation().search);
    currentUserId = parseInt(searchParams.get('userId'));
    currentGroupId = parseInt(searchParams.get('groupId'));

    return(<>
        <div id="group-header">
            <nav>
                <Link to={`/?userId=${currentUserId}`} id="group-logo">
                    <img src="../../data/popcorn.ico" alt="error_loading_logo" />
                </Link>
                <DisplayMembers currentGroupId={currentGroupId}/>
                <Invite currentGroupId={currentGroupId}/>
                <Leave currentUserId={currentUserId} currentGroupId={currentGroupId}/>
                <Link to={`/groupInfosNav/?userId=${currentUserId}&groupId=${currentGroupId}`}>
                    <img id="groupInfosNav-logo" src="../../data/groupInfosNav.png" alt="error_loading_add_image"/>
                </Link>
            </nav>
        </div>
    </>)
}

export default Group;