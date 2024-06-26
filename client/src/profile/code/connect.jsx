import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../styles/connect.css';

var currentUserId = -1;

function Connect(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
        setErrorMessage("");
        }, 3000);

        return () => clearTimeout(timeout);
    }, [errorMessage]);

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
            } else {
                setErrorMessage("Username and password doesn't match.");
            }
        } catch (error) {
            console.error('Error sending data :', error);
        }
    };

    return (
        <div className="padding-center-logo">
            <Link to="/">
                <img src="../../../data/popcorn.ico" alt="error_loading_logo" />
            </Link>
            <form id="connect-form" onSubmit={handleSubmit}>
                <div className="connect-field">
                    <label className="connect-label" htmlFor="username">Username:</label>
                    <input className="connect-input" type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
    
                <div className="connect-field">
                    <label className="connect-label" htmlFor="password">Password:</label>
                    <input className="connect-input" type="text" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
    
                <button id="connect-submit" type="submit">Connect</button>
            </form>
            {errorMessage && (<p id='connect-errorMessage'>{errorMessage}</p>)}
        </div>
    );
       
}

export default Connect;