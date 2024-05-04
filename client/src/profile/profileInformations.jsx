import React from "react";
import { Link, useLocation } from 'react-router-dom';
import ChangeInfos from "./changeInfos";
import Accept from "./accept";
import DeleteAccount from "./deleteAccount";

var currentUserId;

function ProfileInformations(){
    
    const searchParams = new URLSearchParams(useLocation().search);
    currentUserId = parseInt(searchParams.get('userId'));

    return(<>
        <Link to={`/?userId=${currentUserId}`} className="title">
            <img src="../../data/popcorn.ico" alt="error_loading_logo" /> CineGather
        </Link>
        <ChangeInfos />
        <Accept />
        <DeleteAccount />
    </>)

}

export default ProfileInformations;