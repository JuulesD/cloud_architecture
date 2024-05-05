import { React } from "react";
import { Link, useLocation } from "react-router-dom";

import '../styles/groupInfosNav.css';

import List from './list';
import Vote from './vote';

var currentUserId;
var currentGroupId;

function GroupInfosNav(){

    const searchParams = new URLSearchParams(useLocation().search);
    currentUserId = parseInt(searchParams.get('userId'));
    currentGroupId = parseInt(searchParams.get('groupId'));

    return (
        <div className="padding-center-logo">
            <div id="groupInfo-logo">
                <Link to={`/group/?userId=${currentUserId}&groupId=${currentGroupId}`}>
                    <img id="groupInfos-logo" src="../../data/popcorn.ico" alt="error_loading_logo" />
                </Link>
            </div>
            <div id="groupInfo-header-components">
                <List currentGroupId={currentGroupId}/>
                <Vote currentGroupId={currentGroupId}/>
            </div>
        </div>
    )
}

export default GroupInfosNav;