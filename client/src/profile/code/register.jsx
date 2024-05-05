import React, {useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import '../styles/register.css';

function Register(){

    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [surname, setSurname] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = {
            "username":username,
            "firstname":firstname,
            "surname":surname,
            "profilePic":profilePic,
            "password":password
        };

        try {
            await axios.post('http://localhost:3000/register', formData);
            setUsername("");
            setFirstname("");
            setSurname("");
            setProfilePic("");
            setPassword("");
            window.location.href = 'http://localhost:3001/'
        } catch (error) {
            console.error('Error sending data :', error);
        }
    };

    return (
        <>
            <Link to="/" className="title">
                <img src="../../../data/popcorn.ico" alt="error_loading_logo" />
            </Link>
            <form id="register-form" onSubmit={handleSubmit}>
                <div className="register-field">
                    <label htmlFor="username" className="register-label">Username:</label>
                    <input className='register-input' type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
                </div>
    
                <div className="register-field">
                    <label htmlFor="firstname" className="register-label">Firstname:</label>
                    <input className='register-input' type="text" value={firstname} onChange={(event) => setFirstname(event.target.value)}/>
                </div>
    
                <div className="register-field">
                    <label htmlFor="surname" className="register-label">Surname:</label>
                    <input className='register-input' type="text" value={surname} onChange={(event) => setSurname(event.target.value)}/>
                </div>
    
                <div className="register-field">
                    <label htmlFor="profilePic" className="register-label">Profile Picture:</label>
                    <input className='register-input' type="text" value={profilePic} onChange={(event) => setProfilePic(event.target.value)}/>
                </div>
    
                <div className="register-field">
                    <label htmlFor="password" className="register-label">Password:</label>
                    <input className='register-input' type="text" value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
    
                <button id="register-submit" type="submit">Create Account</button>
            </form>
        </>
    );
    
}

export default Register;