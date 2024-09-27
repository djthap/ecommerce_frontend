import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MenuItemCard from './MenuItemCard'
import '../css/AllMenuItems.css'
function ManageMenuItems() {
	const [menuItems, setMenuItems] = useState([])

	useEffect(() => {
		fetchMenuItems()
	}, [])

	const fetchMenuItems = async () => {
		try {
			const response = await fetch(
				'https://ecommerce-backend-o1vw.onrender.com/api/menuItem'
			)
			if (!response.ok) {
				throw new Error('Failed to fetch menu items')
			}
			const data = await response.json()
			setMenuItems(data)
		} catch (error) {
			console.error('Error fetching menu items:', error)
		}
	}

	return (
		<div className="admin-all-menu-items">
			<h2>All Menu Items</h2>
			<Link to="/createMenuItem">
				<button>Create Menu Item</button>
			</Link>
			<div className="admin-menu-item-list">
				{menuItems.map((menuItem) => (
					<MenuItemCard key={menuItem._id} menuItem={menuItem} />
				))}
			</div>
		</div>
	)
}

export default ManageMenuItems
