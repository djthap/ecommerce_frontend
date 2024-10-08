import React from 'react'
import '../css/AllMenuItems.css'
import { Link } from 'react-router-dom'

function MenuItemCard({ menuItem, onEdit, onDelete }) {
	const handleDelete = async (id) => {
		try {
			const confirmed = window.confirm(
				'Are you sure you want to delete this menu item?'
			)
			if (!confirmed) {
				return // User cancelled the deletion
			}

			const response = await fetch(
				`http://localhost:5002/api/menuItem/${id}`,
				{
					method: 'DELETE',
				}
			)

			if (!response.ok) {
				throw new Error('Failed to delete menu item')
			}

			// Call the onDelete function passed from the parent component to update the state or perform any other action
			alert('Deleted successfully')
			window.location.href = '/manageMenuitem'
		} catch (error) {
			console.error('Error deleting menu item:', error)
		}
	}

	return (
		<div className="admin-menu-item-card">
			<h3>{menuItem?.name || ''}</h3>
			<img
				src={menuItem?.image || ''}
				alt={menuItem?.name || ''}
				style={{ width: '200px', height: '200px' }}
			/>

			<p className="admin-menu-description">
				{menuItem?.description || ''}
			</p>
			<div className="admin-menu-other-element">
				<p>Category: {menuItem?.category?.category_name || ''}</p>
				<p>Base Price: ${menuItem?.basePrice ?? ''}</p>
				<div className="admin-menu-size-list">
					{menuItem?.sizes.map((size) => (
						<span key={size._id} className="size">
							{size.name}
							{'  '}
						</span>
					))}
				</div>
			</div>
			<Link
				className="admin-menu-edit-button"
				to={`/editMenuItem/${menuItem?._id}`}
			>
				Edit
			</Link>
			<button onClick={() => handleDelete(menuItem?._id)}>Delete</button>
		</div>
	)
}

export default MenuItemCard
