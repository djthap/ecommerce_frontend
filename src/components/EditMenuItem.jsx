import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import { MultiSelect } from 'react-multi-select-component'
import '../css/createMenuItem.css'

function EditMenuItem() {
	const { id } = useParams()

	const [formData, setFormData] = useState({
		image: '',
		name: '',
		description: '',
		category: '',
		basePrice: '',
		sizes: [],
		extraIngredientPrices: [],
	})

	const [categories, setCategories] = useState([])
	const [extraPrices, setExtraPrices] = useState([])
	const [selectedSizes, setSelectedSizes] = useState([])
	const [selectedIngredients, setSelectedIngredients] = useState([])

	// Fetch menu item data based on ID
	useEffect(() => {
		fetchMenuItem()
		fetchCategories()
		fetchExtraPrices()
	}, [id])

	const fetchMenuItem = async () => {
		try {
			const response = await fetch(
				`https://ecommerce-backend-o1vw.onrender.com/api/menuItem/${id}`
			)
			if (!response.ok) {
				throw new Error('Failed to fetch menu item')
			}
			const data = await response.json()
			setFormData(data)
			setSelectedSizes(
				data.sizes.map((size) => ({
					label: size.name,
					value: size._id,
				}))
			)
			setSelectedIngredients(
				data.extraIngredientPrices.map((ingredient) => ({
					label: ingredient.name,
					value: ingredient._id,
				}))
			)
		} catch (error) {
			console.error('Error fetching menu item:', error)
		}
	}

	const fetchCategories = async () => {
		try {
			const response = await fetch(
				'https://ecommerce-backend-o1vw.onrender.com/api/categories'
			)
			if (!response.ok) {
				throw new Error('Failed to fetch categories')
			}
			const data = await response.json()
			setCategories(data)
		} catch (error) {
			console.error('Error fetching categories:', error)
		}
	}

	const fetchExtraPrices = async () => {
		try {
			const response = await fetch(
				'https://ecommerce-backend-o1vw.onrender.com/api/extraPrice'
			)
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

	const handleImageChange = async (e) => {
		const file = e.target.files[0]
		// Handle image upload logic similar to CreateMenuItem component
	}

	const handleSizeChange = (selected) => {
		setSelectedSizes(selected)
		setFormData({
			...formData,
			sizes: selected.map((option) => option.value),
		})
	}

	const handleIngredientChange = (selected) => {
		setSelectedIngredients(selected)
		setFormData({
			...formData,
			extraIngredientPrices: selected.map((option) => option.value),
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await fetch(
				`https://ecommerce-backend-o1vw.onrender.com/api/menuItem/${id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `${sessionStorage.getItem('token')}`,
					},
					body: JSON.stringify(formData),
				}
			)

			if (!response.ok) {
				throw new Error('Failed to update menu item')
			}

			alert('Updated successfully')
			window.location.href = '/manageMenuitem'
		} catch (error) {
			console.error('Error updating menu item:', error)
		}
	}
	const sizeExtras = extraPrices.filter(
		(extraPrice) => extraPrice.display === 'Size'
	)
	const ItemExtras = extraPrices.filter(
		(extraPrice) => extraPrice.display === 'Ingredient'
	)

	return (
		<div className="admin-create-menu-container">
			<h2>Edit Menu Item</h2>
			<Form onSubmit={handleSubmit} className="admin-create-menu-form">
				<Form.Group className="mb-3">
					<Form.Label>Image:</Form.Label>
					<Form.Control
						type="file"
						name="image"
						onChange={handleImageChange}
						accept="image/*"
					/>
					{formData.image && (
						<img
							src={formData.image}
							alt={formData.name}
							width={200}
							height={200}
							className="edit-menu-item-image"
						/>
					)}
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Name:</Form.Label>
					<Form.Control
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Description:</Form.Label>
					<Form.Control
						as="textarea"
						name="description"
						value={formData.description}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Category:</Form.Label>
					<Form.Select
						name="category"
						value={formData.category}
						onChange={handleChange}
					>
						<option value="">Select Category</option>
						{categories.map((category) => (
							<option key={category._id} value={category._id}>
								{category.category_name}
							</option>
						))}
					</Form.Select>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Base Price:</Form.Label>
					<Form.Control
						type="number"
						name="basePrice"
						value={formData.basePrice}
						onChange={handleChange}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Sizes:</Form.Label>
					<MultiSelect
						options={sizeExtras.map((extraPrice) => ({
							label: `${extraPrice.name} - ${extraPrice.price}`,
							value: extraPrice._id,
						}))}
						value={selectedSizes}
						onChange={handleSizeChange}
						labelledBy="Select Sizes"
						hasSelectAll={false}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Extra Ingredient Prices:</Form.Label>
					<MultiSelect
						options={ItemExtras.map((extraPrice) => ({
							label: `${extraPrice.name} - ${extraPrice.price}`,
							value: extraPrice._id,
						}))}
						value={selectedIngredients}
						onChange={handleIngredientChange}
						labelledBy="Select Extra Ingredients"
						hasSelectAll={false}
					/>
				</Form.Group>

				<Button type="submit">Update</Button>
				<Link
					to="/manageMenuitem"
					className="back-to-admin-menu-list-button"
				>
					Back to Manage Menu Items
				</Link>
			</Form>
		</div>
	)
}

export default EditMenuItem
