// import { React, useState, useEffect, useCallback } from "react";
import React from "react";
import { Link, useLocation } from 'react-router-dom';
// import axios from "axios";

import Leave from './leave';
import Invite from './invite';
import DisplayMembers from './displayMembers';

var currentUserId;
var currentGroupId;

function Group(){

    const searchParams = new URLSearchParams(useLocation().search);
    currentUserId = parseInt(searchParams.get('userId'));
    currentGroupId = parseInt(searchParams.get('groupId'));

    return(<>
        <header>
            <nav>
                <Link to={`/?userId=${currentUserId}`} className="title">
                    <img src="../../data/popcorn.ico" alt="error_loading_logo" /> CineGather
                </Link>
                <DisplayMembers currentGroupId={currentGroupId}/>
                <Invite currentGroupId={currentGroupId}/>
                <Leave currentUserId={currentUserId} currentGroupId={currentGroupId}/>
                <img src="../../data/list.png" alt="error_loading_add_image"/>
                
            </nav>
        </header>
    </>)
}

export default Group;