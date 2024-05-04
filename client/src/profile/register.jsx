import React, {useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

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

    return (<>
        <Link to="/" className="title">
            <img src="../../data/popcorn.ico" alt="error_loading_logo" /> CineGather
        </Link>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>

            <label htmlFor="firstname">Firstname:</label>
            <input id="firstname" type="text" value={firstname} onChange={(event) => setFirstname(event.target.value)}/>

            <label htmlFor="surname">Surname:</label>
            <input id="surname" type="text" value={surname} onChange={(event) => setSurname(event.target.value)}/>

            <label htmlFor="profilePic">Profile Picture:</label>
            <input id="profilePic" type="text" value={profilePic} onChange={(event) => setProfilePic(event.target.value)}/>

            <label htmlFor="password">Password:</label>
            <input id="password" type="text" value={password} onChange={(event) => setPassword(event.target.value)}/>

            <button type="submit">Create Account</button>
        </form>
    </>)
}

export default Register;