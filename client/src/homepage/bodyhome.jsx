import React from 'react';
import { Link, useLocation } from "react-router-dom";
import Navbar from './navbar';
import './body.css';

function Body(){

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('userId');

    return (
        <div>
            <Navbar />
            {!userId && (
                <div className="title-container">
                    <Link to="/" className="title">
                        <img src="../../data/popcorn.ico" alt="error_loading_logo" />
                        <div className="title-text">CineGather</div>
                        <div className="description-text">CineGather, the app for your best cine party !!!</div>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Body;
