import React, { useState } from 'react';
import axios from 'axios';

var currentUserId = -1;

function Connect(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = {
            "username":username,
            "password":password
        };

        try {
            const response = await axios.post('http://localhost:3000/connect', formData);
            setUsername("");
            setPassword("");
            if (response.data.message !== "Username and password doesn't match."){
                currentUserId = response.data.userId;
                window.location.href = `/?userId=${currentUserId}`;
            }
        } catch (error) {
            console.error('Error sending data :', error);
        }
    };

    return (<>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>

            <label htmlFor="password">Password:</label>
            <input id="password" type="text" value={password} onChange={(event) => setPassword(event.target.value)}/>

            {currentUserId !== -1 ? (
                <span>Profile informations</span>
            ) : null}

            <button type="submit">Connect</button>
        </form>
    </>)    
}

export default Connect;