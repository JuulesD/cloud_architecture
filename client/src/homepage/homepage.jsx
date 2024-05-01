import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './navbar';
import Register from './../profile/register';
import Connect from "../profile/connect";

function Homepage(){
    return(<>
    <Router>
        <Routes>
            <Route path="/" element={<Navbar/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/connect" element={<Connect/>} />
        </Routes>
    </Router>
    </>)
}

export default Homepage;