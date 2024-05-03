import { React, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";

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

    return (<>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" value={name} onChange={(event) => setName(event.target.value)}/>

            <button type="submit">Create</button>
        </form>
    </>)
}

export default CreateGroup;