import { React, useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";

var currentUserId;

function ChangeInfos(){

    const searchParams = new URLSearchParams(useLocation().search);
    currentUserId = parseInt(searchParams.get('userId'));
    
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [surname, setSurname] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [password, setPassword] = useState("");

    const [isValidInformations, setValid] = useState("");

    useEffect(() => {
        setValid(true);
    },[])

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
            const response = await axios.post('http://localhost:3000/changeInfos', formData);
            if (response.data)
                window.location.href = `/?userId=${currentUserId}`;
            else
                setValid(false);
        } catch (error) {
            console.error('Error sending data :', error);
        }
    };

    return(<>
        <Link to={`/?userId=${currentUserId}`} className="title">
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

            <button type="submit">Change Informations</button>
        </form>
        {!isValidInformations && <p>Informations not valid.</p>}
    </>)

}

export default ChangeInfos;
