import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar(){

    const searchParams = new URLSearchParams(useLocation().search);
    const currentUserId = searchParams.get('userId');

    console.log(currentUserId);

    return (
        <header>
            <nav>
                <Link to="/" className="title">
                    <img src="../../data/popcorn.ico" alt="error_loading_logo" /> CineGather
                </Link>
                {currentUserId !== -1 && currentUserId !== null ? (
                    <Link to="/" className="profileInfos">
                        <div>
                            <img src="./data/profile" alt="error_loading_profile_image" /> Profile informations
                        </div>
                    </Link>
                ) : (
                    <>
                        <Link to="/register">
                            <div>
                                <img src="./data/profile.jpg" alt="error_loading_profile_image" /> Register
                            </div>
                        </Link>
                        <Link to="/connect">
                            <div>
                                <img src="./data/profile.jpg" alt="error_loading_profile_image" /> Connect
                            </div>
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Navbar;