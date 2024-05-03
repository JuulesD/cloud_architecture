import { React, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

var currentUserId = -1;

function Navbar(){

    const searchParams = new URLSearchParams(useLocation().search);
    currentUserId = searchParams.get('userId');

    const [selectedOption, setSelectedOption] = useState('');
    const [userGroups, setUserGroups] = useState([]);

    const getUserGroups = async ()=>{
        try {
            const response = await axios.get('http://localhost:3000/getUserGroups');
            setUserGroups(response.data);
        } catch (error) {
            console.error('Error reading data :', error);
        }
    }

    useEffect(() => {
        if (currentUserId !== null && currentUserId !==-1)
            getUserGroups()
    }, []);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    function handleOptionSelected(groupId){
        window.location.href = `/group/?userId=${currentUserId}&groupId=${groupId}`
    };

    const handleCreateGroup = (event) => {
        window.location.href = `/createGroup/?userId=${currentUserId}`
    };

    if (currentUserId === null || currentUserId === -1){
        return (
            <header>
                <nav>
                    <Link to="/" className="title">
                        <img src="../../data/popcorn.ico" alt="error_loading_logo" /> CineGather
                    </Link>
                    <Link to="/register">
                        <div>
                            <img src="./data/profile.jpg" alt="error_loading_profile_image" /> Register
                        </div>
                    </Link>
                    <Link to="/connect">
                        <div>
                            <img src="./data/profile.jpg" alt="error_loading_profile_image" /> Connect
                        </div>
                    </Link>
                </nav>
            </header>
        )
    }

    return(
        <header>
            <nav>
                <Link to={`changeInfos/?userId=${currentUserId}`} className="profileInfos">
                    <div>
                        <img src="./data/profile.jpg" alt="error_loading_profile_image" /> Profile informations
                    </div>
                </Link>
                <div>
                    <label htmlFor="dropdown">Choose a group :</label>
                    <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
                    <option key={-1} value={-1}></option>
                    {userGroups.map(group => (
                        <option key={group.groupId} value={group.groupId} onClick={() => handleOptionSelected(group.groupId)}>{group.name}</option>
                    ))}
                    <option key={0} value={0} onClick={handleCreateGroup}>New Group</option>
                    </select>
                    <p>Selected group : {selectedOption}</p>
                </div>
        </nav>
    </header>
    )
}

export default Navbar;