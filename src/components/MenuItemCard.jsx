import React from 'react';
import '../css/MenuItemCard.css';
import { Link } from 'react-router-dom';

function MenuItemCard({ menuItem, onEdit, onDelete }) {
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/menuItem/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete menu item');
            }
            // Call the onDelete function passed from the parent component to update the state or perform any other action
            alert("Deleted successfully")
            window.location.href = '/manageMenuitem';
        } catch (error) {
            console.error('Error deleting menu item:', error);
        }
    };

    return (
        <div className="menu-item-card">
            <h3>{menuItem?.name || ''}</h3>
            <img
                src={menuItem?.image || ''}
                alt={menuItem?.name || ''}
                style={{ width: '200px', height: '200px' }}
            />

            <p>{menuItem?.description || ''}</p>
            <p>Category: {menuItem?.category?.category_name || ''}</p>
            <p>Base Price: ${menuItem?.basePrice ?? ''}</p>
            <div className="size-list">
                {menuItem?.sizes.map((size) => (
                    <span key={size._id} className="size">
                        {size.name}
                    </span>
                ))}
            </div>
            <Link className='ll' to={`/editMenuItem/${menuItem?._id}`}>Edit</Link>
            <button onClick={() => handleDelete(menuItem?._id)}>Delete</button>
        </div>
    );
}

export default MenuItemCard;
