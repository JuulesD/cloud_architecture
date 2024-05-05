import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from '../profile/code/register';
import Connect from "../profile/code/connect";
import ProfileInformations from '../profile/code/profileInformations';

import Body from "./bodyhome";
import CreateGroup from '../groups/createGroup';
import Group from '../groups/group';

function Homepage(){
    return(<>
    <Router>
        <Routes>
            <Route path="/" element={<Body/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/connect" element={<Connect/>} />
            <Route path='/profileInformations' element={<ProfileInformations/>} />

            <Route path='/createGroup' element={<CreateGroup/>} />
            <Route path='/group' element={<Group/>} />
        </Routes>
    </Router>
    
    </>)
}

export default Homepage;