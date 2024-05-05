import { React, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";

import '../styles/changeInfos.css';

var currentUserId;

function ChangeInfos(){

    const searchParams = new URLSearchParams(useLocation().search);
    currentUserId = parseInt(searchParams.get('userId'));
    
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [surname, setSurname] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [password, setPassword] = useState("");
    const [isValidInformations, setValid] = useState(false);

    useEffect(() => {
        const getUserInfos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getUserInfos');
                setUsername(response.data.username);
                setFirstname(response.data.firstname);
                setSurname(response.data.surname);
                setProfilePic(response.data.profilePic);
                setPassword(response.data.password);

            } catch (error) {
                console.error('Error sending data :', error);
            }
        }
        
        setValid(true);

        getUserInfos();

    }, [])

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
            const response = await axios.put('http://localhost:3000/changeInfos', formData);
            if (response.data)
                window.location.href = `/?userId=${currentUserId}`;
            else
                setValid(false);
        } catch (error) {
            console.error('Error sending data :', error);
        }
    };

    return(<>
        <form id="changeInfos-form" onSubmit={handleSubmit}>

            <div className="register-field">
                <label className="changeInfos-label" htmlFor="username">Username:</label>
                <input className="changeInfos-input" type="text" value={username} onChange={(event) => setUsername(event.target.value)}/>
            </div>

            <div className="register-field">
                <label className="changeInfos-label" htmlFor="firstname">Firstname:</label>
                <input className="changeInfos-input" type="text" value={firstname} onChange={(event) => setFirstname(event.target.value)}/>
            </div>

            <div className="register-field">
                <label className="changeInfos-label" htmlFor="surname">Surname:</label>
                <input className="changeInfos-input" type="text" value={surname} onChange={(event) => setSurname(event.target.value)}/>
            </div>

            <div className="register-field">
                <label className="changeInfos-label" htmlFor="profilePic">Profile Picture:</label>
                <input className="changeInfos-input" type="text" value={profilePic} onChange={(event) => setProfilePic(event.target.value)}/>
            </div>

            <div className="register-field">
                <label className="changeInfos-label" htmlFor="password">Password:</label>
                <input className="changeInfos-input" type="text" value={password} onChange={(event) => setPassword(event.target.value)}/>
            </div>

            <button id="changeInfos-submit" type="submit">Change Informations</button>
        </form>
        {!isValidInformations && <p>Informations not valid.</p>}
    </>)

}

export default ChangeInfos;
