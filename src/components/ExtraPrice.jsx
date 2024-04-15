import React, { useState, useEffect } from 'react'
import '../css/ExtraPrice.css'

function ExtraPrice() {
	const [extraPrices, setExtraPrices] = useState([])
	const [formData, setFormData] = useState({
		name: '',
		price: '',
		display: 'Ingredient',
	})
	const [editingId, setEditingId] = useState(null)
	const [editingData, setEditingData] = useState({
		name: '',
		price: '',
		display: 'Ingredient',
	})

	useEffect(() => {
		fetchExtraPrices()
	}, [])

	const fetchExtraPrices = async () => {
		try {
			const response = await fetch('/api/extraPrice')
			if (!response.ok) {
				throw new Error('Failed to fetch extra prices')
			}
			const data = await response.json()
			setExtraPrices(data)
		} catch (error) {
			console.error('Error fetching extra prices:', error)
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleEdit = (id, name, price, display) => {
		setEditingId(id)
		setEditingData({ name, price, display })
	}

	const handleEditSubmit = async (id) => {
		try {
			const response = await fetch(`/api/extraPrice/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(editingData),
			})
			if (!response.ok) {
				throw new Error('Failed to update extra price')
			}
			setEditingId(null)
			fetchExtraPrices() // Refresh the list
		} catch (error) {
			console.error('Error updating extra price:', error)
		}
	}

	const handleDelete = async (id) => {
		try {
			const confirmDelete = window.confirm(
				'Are you sure you want to delete this extra price?'
			)
			if (!confirmDelete) {
				return // If user cancels deletion, exit function
			}

			const response = await fetch(`/api/extraPrice/${id}`, {
				method: 'DELETE',
			})
			if (!response.ok) {
				throw new Error('Failed to delete extra price')
			}
			setExtraPrices(
				extraPrices.filter((extraPrice) => extraPrice._id !== id)
			)
		} catch (error) {
			console.error('Error deleting extra price:', error)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await fetch('/api/extraPrice', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})
			if (!response.ok) {
				throw new Error('Failed to create extra price')
			}
			const data = await response.json()
			setExtraPrices([...extraPrices, data])
			setFormData({ name: '', price: '' })
		} catch (error) {
			console.error('Error creating extra price:', error)
		}
	}

	return (
		<div className="dashboard-container">
			<div className="create-extra-price-section">
				<form
					className="create-extra-price-form"
					onSubmit={handleSubmit}
				>
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Name"
					/>
					<input
						type="number"
						name="price"
						value={formData.price}
						onChange={handleChange}
						placeholder="Price"
					/>
					<select
						className="ss"
						value={formData.display}
						onChange={handleChange}
					>
						<option value="Ingredient">Ingredient</option>
						<option value="Size">Size</option>
					</select>
					<button type="submit">Create</button>
				</form>
			</div>

			<div className="extra-price-list-section">
				<ul className="extra-price-list">
					{extraPrices.map((extraPrice) => (
						<li className="extra-price-item" key={extraPrice._id}>
							{editingId === extraPrice._id ? (
								<>
									<input
										type="text"
										value={editingData.name}
										onChange={(e) =>
											setEditingData({
												...editingData,
												name: e.target.value,
											})
										}
									/>
									<input
										type="number"
										value={editingData.price}
										onChange={(e) =>
											setEditingData({
												...editingData,
												price: e.target.value,
											})
										}
									/>
									<select
										className="ss"
										value={editingData.display}
										onChange={(e) =>
											setEditingData({
												...editingData,
												display: e.target.value,
											})
										}
									>
										<option value="Ingredient">
											Ingredient
										</option>
										<option value="Size">Size</option>
									</select>
									<button
										onClick={() =>
											handleEditSubmit(extraPrice._id)
										}
									>
										Save
									</button>
								</>
							) : (
								<>
									<span>{extraPrice.name}</span>
									<span>Price : ${extraPrice.price}</span>
									<button
										onClick={() =>
											handleEdit(
												extraPrice._id,
												extraPrice.name,
												extraPrice.price,
												extraPrice.display
											)
										}
									>
										Edit
									</button>
									<button
										className="extra-price-delete-button"
										onClick={() =>
											handleDelete(extraPrice._id)
										}
									>
										Delete
									</button>
								</>
							)}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default ExtraPrice
