import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../css/AllOrders.css'

function AllOrders() {
	const [orders, setOrders] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetchOrders()
	}, [])

	const fetchOrders = async () => {
		try {
			const response = await fetch('https://ecommerce-backend-1-cl9h.onrender.com/api/orderRoutes')
			if (!response.ok) {
				throw new Error('Failed to fetch orders')
			}
			const data = await response.json()
			setOrders(data)
			setLoading(false)
		} catch (error) {
			console.error('Error fetching orders:', error)
			setError('Error fetching orders. Please try again later.')
			setLoading(false)
		}
	}

	const updateOrderStatus = async (orderId, status) => {
		try {
			const response = await fetch(`https://ecommerce-backend-1-cl9h.onrender.com/api/orderRoutes/${orderId}/status`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `${sessionStorage.getItem('token')}`,
				},
				body: JSON.stringify({ status }),
			})
			if (!response.ok) {
				throw new Error('Failed to update order status')
			}
			// Refresh orders after updating status
			fetchOrders()
			// Show toast notification
			toast.success('Order status updated successfully!', {
				autoClose: 3000,
			})
		} catch (error) {
			console.error('Error updating order status:', error)
			toast.error('Error updating order status. Please login again .')
		}
	}

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	return (
		<div className="orders-container">
			<h1>All Orders</h1>
			<table className="orders-table">
				<thead>
					<tr>
						<th>Order ID</th>
						<th>Phone Number</th>
						<th>Address</th>
						<th>Items</th>
						<th>Total Price</th>
						<th>Order Type</th>
						<th>Status</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order, i) => (
						<tr
							key={order._id}
							className={getBackgroundColor(order.status)}
						>
							<td>{i + 1}</td>
							<td>{order.phoneNumber}</td>
							<td>{order.address}</td>
							<td>
								<ul>
									{order.items.map((item) => (
										<li key={item._id}>{item.name}</li>
									))}
								</ul>
							</td>
							<td>${order.totalPrice.toFixed(2)}</td>
							<td>Cash On Delivery</td>
							<td>{order.status}</td>
							<td>
								{order.status !== 'delivered' ? (
									<select
										value={order.status}
										onChange={(e) =>
											updateOrderStatus(
												order._id,
												e.target.value
											)
										}
									>
										<option value="pending">Pending</option>
										<option value="ready to deliver">
											Ready to Deliver
										</option>
										<option value="delivered">
											Delivered
										</option>
									</select>
								) : (
									<select disabled>
										<option value={order.status}>
											{order.status}
										</option>
									</select>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<ToastContainer />
		</div>
	)
}

export default AllOrders

function getBackgroundColor(status) {
	switch (status) {
		case 'pending':
			return 'pending-bg'
		case 'ready to deliver':
			return 'ready-bg'
		case 'delivered':
			return 'delivered-bg'
		default:
			return ''
	}
}
