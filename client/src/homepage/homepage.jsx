import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Register from '../profile/register';
import Connect from "../profile/connect";
import ChangeInfos from '../profile/changeInfos';

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
            <Route path='/createGroup' element={<CreateGroup/>} />
            <Route path='/group' element={<Group/>} />
            <Route path='/changeInfos' element={<ChangeInfos/>} />
        </Routes>
    </Router>
    
    </>)
}

export default Homepage;