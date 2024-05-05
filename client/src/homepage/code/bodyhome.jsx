import React from 'react';
import { Link, useLocation } from "react-router-dom";
import Navbar from './navbar';

import '../styles/body.css';

function Body(){

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');

    return (
        <>
            <Navbar />
            {!userId && (
                <div id="bodyhome-container">
                    <Link to="/" id="bodyhome-title">
                        <img src="../../data/popcorn.ico" alt="error_loading_logo" />
                        <div id="bodyhome-title-text">CineGather</div>
                        <div id="bodyhome-description-text">CineGather, the app for your best cine party !!!</div>
                    </Link>
                </div>
            )}
        </>
    );
}

export default Body;
