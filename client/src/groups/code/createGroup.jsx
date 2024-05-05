import { React, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";

import '../styles/createGroup.css';

var currentUserId;

function CreateGroup(){

    const searchParams = new URLSearchParams(useLocation().search);
    currentUserId = searchParams.get('userId');

    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = {
            "name":name
        };

        try {
            const response = await axios.post('http://localhost:3000/creation', formData);
            setName("");
            if (response.data === "New Group added to your profile."){
                window.location.href = `/?userId=${currentUserId}`;
            }
        } catch (error) {
            console.error('Error sending data :', error);
        }
    };

    return (
        <div className="padding-center-logo">
            <Link to={`/?userId=${currentUserId}`} className="title">
                <img src="../../data/popcorn.ico" alt="error_loading_logo" />
            </Link>
            <form id="createGroup-form" onSubmit={handleSubmit}>
                
                <div id="connect-field">
                    <label id="createGroup-label" htmlFor="name">Name:</label>
                    <input id="createGroup-input" type="text" value={name} onChange={(event) => setName(event.target.value)}/>
                </div>

                <button id="createGroup-submit" type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateGroup;