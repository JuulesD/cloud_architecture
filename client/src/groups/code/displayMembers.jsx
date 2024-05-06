import { React, useState, useEffect, useCallback } from "react";
import axios from "axios";

import '../styles/displayMembers.css';

function DisplayMembers({ currentUserId, currentGroupId }){
    
    const [memberList, setMemberList] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [currentGroupName, setcurrentGroupName] = useState("");

    const groupName = useCallback(async() => {
        try {
            const response = await axios.post('http://localhost:3000/getGroupInfos', { groupId: currentGroupId });
            setcurrentGroupName(response.data.name);
        } catch (error) {
            console.log('DISPLAY MEMBERS Error reading data :', error)
        }
    }, [currentGroupId]);
    
    const getMembers = useCallback(async () => {
        try {
            const response = await axios.post('http://localhost:3000/getMembersName', { groupId: currentGroupId });
            setMemberList(response.data);
        } catch (error) {
            console.log('DISPLAY MEMBERS Error reading data :', error)
        }
    }, [currentGroupId]);

    const getIsAdmin = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/getUserInfos');
            const getIsAdminFromGroupId = (groupId, groups) => {
                const group = groups.find(group => group.groupId === groupId);
                if (group.status === "admin") {
                    setIsAdmin(true);
                }
            };
            getIsAdminFromGroupId(currentGroupId, response.data.groups);
        } catch (error) {
            console.log('DISPLAY MEMBERS Error reading data :', error)
        }
    }, [currentGroupId]);

    useEffect(() => {
        groupName();
        getMembers();
        getIsAdmin();
    }, [getMembers, getIsAdmin, groupName]);

    const passAdmin = async (member) => {
        const adminInfos = {
            groupId:currentGroupId,
            newAdminUsername:member
        }
        try {
            await axios.put('http://localhost:3000/changeStatus',adminInfos);
            setIsAdmin(false);
        }
        catch (error) {
            console.log('DISPLAY MEMBERS Error reading data :', error)
        }
    }

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    return (
        <div className="dispMem-container">
            <p id="dispMem-groupName" onClick={toggleDropdown}>{currentGroupName}</p>
            {isDropdownVisible && (
                <ul id="dispMem-dropdown">
                    {memberList.map((member, index) => (
                        <li className="dispMem-member" key={index}>
                            {member.name}
                            {isAdmin && member.userId !== currentUserId && <button onClick={() => passAdmin(member.name)}>Pass Admin</button>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DisplayMembers;