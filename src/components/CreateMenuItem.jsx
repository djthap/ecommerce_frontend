import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { MultiSelect } from 'react-multi-select-component'
import '../css/createMenuItem.css'

function CreateMenuItem() {
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

	useEffect(() => {
		fetchCategories()
		fetchExtraPrices()
	}, [])

	const fetchCategories = async () => {
		try {
			const response = await fetch('/api/categories')
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

	const handleImageChange = async (e) => {
		const file = e.target.files[0]

		try {
			const formData = new FormData()
			formData.append('image', file)

			const response = await fetch('/api/menuItem/uploadImage', {
				method: 'POST',
				body: formData,
			})

			if (!response.ok) {
				throw new Error('Failed to upload image')
			}

			const data = await response.json()
			setFormData({
				...formData,
				image: data.imageUrl,
			})
		} catch (error) {
			console.error('Error uploading image:', error)
		}
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
			const response = await fetch('/api/menuItem', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `${sessionStorage.getItem('token')}`,
				},
				body: JSON.stringify(formData),
			})

			if (!response.ok) {
				throw new Error('Failed to create menu item')
			}

			const data = await response.json()
			alert('Created successfully')
			setFormData({image: '',
			name: '',
			description: '',
			category: '',
			basePrice: '',
			sizes: [],
			extraIngredientPrices: [],})
			console.log(data)
		} catch (error) {
			console.error('Error creating menu item:', error)
		}
	}

	return (
		<div className="admin-create-menu-container">
			<h2>Create Menu Item</h2>
			<Form onSubmit={handleSubmit} className='admin-create-menu-form'>
				<Form.Group className="mb-3">
					<Form.Label>Image:</Form.Label>
					<Form.Control
						type="file"
						name="image"
						onChange={handleImageChange}
						accept="image/*"
					/>
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
						
						options={extraPrices.map((extraPrice) => ({
							label: `Name : ${extraPrice.name}    ||  Price :  ${extraPrice.price}`,
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
						style={{ color: 'black' }}
						className="ddddd text-black"
						options={extraPrices.map((extraPrice) => ({
							label: `Name : ${extraPrice.name}    ||  Price :  ${extraPrice.price}`,
							value: extraPrice._id,
						}))}
						value={selectedIngredients}
						onChange={handleIngredientChange}
						labelledBy="Select Extra Ingredients"
						hasSelectAll={false}
					/>
				</Form.Group>

				<Button type="submit">Create</Button>
			</Form>
		</div>
	)
}

export default CreateMenuItem
