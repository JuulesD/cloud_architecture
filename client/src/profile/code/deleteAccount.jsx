import React from "react";
import axios from "axios";

import '../styles/delete.css';

function DeleteAccount(){
    
    const deleteAccount = async() => {
        try{
            await axios.delete('http://localhost:3000/delete');
            window.location.href = 'http://localhost:3001/';
        } catch (error) {
            console.error('DELETE ACCOUNT : Error sending data :', error);
        }
    }

    return(<>
        <button id="delete-submit" onClick={() => deleteAccount()}>Delete Account</button>
    </>)
}

export default DeleteAccount;