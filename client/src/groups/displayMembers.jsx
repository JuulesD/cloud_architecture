import { React, useState, useEffect, useCallback } from "react";
import axios from "axios";

function DisplayMembers({ currentGroupId }){
    
    const [memberList, setMemberList] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    
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
        getMembers();
        getIsAdmin();
    }, [getMembers, getIsAdmin]);

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
        <>
            <p id="title" onClick={toggleDropdown}>Group Name</p>
            {isDropdownVisible && (
                <ul>
                    {memberList.map((member, index) => (
                        <li key={index}>
                            {member}
                            {isAdmin && <button onClick={() => passAdmin(member)}>Pass Admin</button>}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default DisplayMembers;