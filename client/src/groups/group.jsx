import { React, useState, useEffect, useCallback } from "react";
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";

var currentUserId;
var currentGroupId;

function Group(){

    const searchParams = new URLSearchParams(useLocation().search);
    currentUserId = parseInt(searchParams.get('userId'));
    currentGroupId = parseInt(searchParams.get('groupId'));

    const groupId = {
        "groupId":currentGroupId
    };

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

    const [isSearchVisibleAdd, setIsSearchVisibleAdd] = useState(false);

    const toggleSearchAdd = () => {
        setIsSearchVisibleAdd(!isSearchVisibleAdd);
    };

    const leaveGroup = async ()=>{
        try {
            const response = await axios.post('http://localhost:3000/leave',groupId);
            window.location.href = `/?userId=${currentUserId}`;
            console.log(response);
        } catch (error) {
            console.error('Error reading data :', error);
        }
    }

    return(<>
        <header>
            <nav>
                <Link to={`/?userId=${currentUserId}`} className="title">
                    <img src="../../data/popcorn.ico" alt="error_loading_logo" /> CineGather
                </Link>
                <p id="title" >Group Name: {groupInfos.name}</p>
                <div className="searchContainer">
                    <img src="../../data/add.png" alt="error_loading_add_image" className="searchIcon" onClick={toggleSearchAdd} />
                    {isSearchVisibleAdd && (
                        <div className="searchBox">
                        {/* Place your search input or other search components here */}
                        <input type="text" placeholder="Search..." />
                        <button>Search</button>
                        </div>
                    )}
                </div>
                <img src="../../data/minus.png" alt="error_loading_add_image" onClick={leaveGroup}/>
                <img src="../../data/list.png" alt="error_loading_add_image"/>
                
            </nav>
        </header>
    </>)
}

export default Group;