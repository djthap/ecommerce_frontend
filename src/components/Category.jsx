import React, { useState, useEffect } from 'react'
import '../css/category.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Category() {
	const [categories, setCategories] = useState([])
	const [newCategoryName, setNewCategoryName] = useState('')
	const [editingCategoryId, setEditingCategoryId] = useState(null)
	const [updatedCategoryName, setUpdatedCategoryName] = useState('')

	useEffect(() => {
		fetchCategories()
	}, [])

	const fetchCategories = async () => {
		try {
			const response = await fetch('http://localhost:5002/api/categories')
			if (!response.ok) {
				throw new Error('Failed to fetch categories')
			}
			const data = await response.json()
			setCategories(data)
		} catch (error) {
			console.error('Error fetching categories:', error)
		}
	}

	const handleCreateCategory = async () => {
		try {
			const response = await fetch(
				'http://localhost:5002/api/categories',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ category_name: newCategoryName }),
				}
			)
			if (!response.ok) {
				throw new Error('Failed to create category')
			}
			const data = await response.json()
			setCategories([...categories, data])
			setNewCategoryName('')
			toast.success('Category created successfully')
		} catch (error) {
			console.error('Error creating category:', error)
			toast.error('Failed to create category')
		}
	}
	const handleDeleteCategory = async (categoryId) => {
		try {
			const confirmed = window.confirm(
				'Are you sure you want to delete this category?'
			)
			if (!confirmed) {
				return // User cancelled the deletion
			}

			const response = await fetch(
				`http://localhost:5002/api/categories/${categoryId}`,
				{
					method: 'DELETE',
				}
			)

			if (!response.ok) {
				throw new Error('Failed to delete category')
			}

			setCategories(
				categories.filter((category) => category._id !== categoryId)
			)

			toast.success('Category deleted successfully')
		} catch (error) {
			console.error('Error deleting category:', error)
			toast.error('Failed to delete category')
		}
	}

	const handleEditCategory = (categoryId, categoryName) => {
		setEditingCategoryId(categoryId)
		setUpdatedCategoryName(categoryName)
	}

	const handleUpdateCategory = async () => {
		try {
			const response = await fetch(
				`http://localhost:5002/api/categories/${editingCategoryId}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						category_name: updatedCategoryName,
					}),
				}
			)
			if (!response.ok) {
				throw new Error('Failed to update category')
			}
			setCategories(
				categories.map((category) => {
					if (category._id === editingCategoryId) {
						return {
							...category,
							category_name: updatedCategoryName,
						}
					}
					return category
				})
			)
			setEditingCategoryId(null)
			toast.success('Category updated successfully')
		} catch (error) {
			console.error('Error updating category:', error)
			toast.error('Failed to update category')
		}
	}

	return (
		<div className="dashboard-container">
			<div className="create-category-section">
				<h2 className="admin-category-heading">Create New Category</h2>
				<div className="create-category-form">
					<input
						type="text"
						placeholder="Enter category name"
						value={newCategoryName}
						required
						onChange={(e) => setNewCategoryName(e.target.value)}
					/>
					<button onClick={handleCreateCategory}>Create</button>
				</div>
			</div>
			<div className="category-list-section ">
				<h2 className="admin-category-heading">All Categories</h2>
				<div className="category-list">
					{categories.map((category) => (
						<div className="category-item" key={category._id}>
							{editingCategoryId === category._id ? (
								<>
									<input
										type="text"
										value={updatedCategoryName}
										onChange={(e) =>
											setUpdatedCategoryName(
												e.target.value
											)
										}
									/>
									<button onClick={handleUpdateCategory}>
										Save
									</button>
								</>
							) : (
								<>
									<span className="category-name">
										{category.category_name}
									</span>
									<button
										className="edit-button"
										onClick={() =>
											handleEditCategory(
												category._id,
												category.category_name
											)
										}
									>
										Edit
									</button>
									<button
										className="delete-button"
										onClick={() =>
											handleDeleteCategory(category._id)
										}
									>
										Delete
									</button>
								</>
							)}
						</div>
					))}
				</div>
			</div>
			<ToastContainer />
		</div>
	)
}

export default Category
