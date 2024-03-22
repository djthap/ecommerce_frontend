import React, { useState, useEffect, useRef } from 'react';
import '../css/user.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Users() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const userDetailsRef = useRef(null);

    useEffect(() => {
        fetchUsers();
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/auth/getAllUsers');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleCloseDetails = () => {
        setSelectedUser(null);
    };

    const handleClickOutside = (event) => {
        if (userDetailsRef.current && !userDetailsRef.current.contains(event.target)) {
            setSelectedUser(null);
        }
    };

    const handleRoleChange = async (event) => {
        const newRole = event.target.value;
        try {
            const response = await fetch(`/api/auth/editRole/${selectedUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({  newRole }),
            });
            if (!response.ok) {
                throw new Error('Failed to update role');
            }
            setSelectedUser({ ...selectedUser, role: newRole });
            toast.success('Role updated successfully');
        } catch (error) {
            console.error('Error updating role:', error);
            toast.error('Failed to update role');
        }
    };

    return (
        <div className="users-container">
            <h2>List of Users</h2>
            <ul className="user-list">
                {users.map((user) => (
                    <li
                        key={user._id}
                        onClick={() => handleUserClick(user)}
                        className={`user-item ${selectedUser === user ? 'active' : ''}`}
                    >
                        {user.email}
                    </li>
                ))}
            </ul>
            {selectedUser && (
                <div className="user-details" ref={userDetailsRef}>
                    <h3>User Details</h3>
                    <p>
                        <strong>Email:</strong> {selectedUser.email}
                    </p>
                    <p>
                        <strong>Name:</strong> {selectedUser.name || 'N/A'}
                    </p>
                    <select value={selectedUser.role} onChange={handleRoleChange}>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                        <option value="Restaurant">Restaurant</option>
                    </select>
                    <button onClick={handleCloseDetails}>Close</button>
                </div>
            )}
        </div>
    );
}

export default Users;
