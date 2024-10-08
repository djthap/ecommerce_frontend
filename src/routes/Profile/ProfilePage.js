import React, { useState, useEffect } from 'react'
import '../../css/ProfilePage.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const ProfilePage = () => {
	const [user, setUser] = useState({
		name: '',
		password: '',
		streetAddress: '',
		postalCode: '',
		image: '',
		city: '',
		country: '',
		phone: '',
	})
	const [errors, setErrors] = useState({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				// Fetch user profile data from session or API
				const userData = JSON.parse(sessionStorage.getItem('user'))
				if (userData) {
					setUser(userData)
					setLoading(false)
				} else {
					// If user data is not available in session, handle accordingly
					console.log('User data not found')
					setLoading(false)
				}
			} catch (error) {
				console.error('Error fetching user profile:', error)
				setLoading(false)
			}
		}

		fetchUserProfile()
	}, [])

	const handleChange = (e) => {
		const { name, value } = e.target
		setUser({ ...user, [name]: value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const validationErrors = validate(user)
		if (Object.keys(validationErrors).length === 0) {
			try {
				const response = await fetch(
					`http://localhost:5002/api/auth/updateProfile/${user._id}`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(user),
					}
				)

				if (!response.ok) {
					throw new Error('Failed to update user profile')
				}

				console.log('User profile updated:', user)
				toast.success('User profile updated successfully')
				sessionStorage.setItem('user', JSON.stringify(user))
			} catch (error) {
				console.error('Error updating user profile:', error)
			}
		} else {
			setErrors(validationErrors)
		}
	}

	const validate = (data) => {
		let errors = {}

		// Validation rules
		if (!data.name.trim()) {
			errors.name = 'Name is required'
		}
		// Validation rules for other fields
		if (!data.streetAddress.trim()) {
			errors.streetAddress = 'Street Address is required'
		}
		if (!data.postalCode.trim()) {
			errors.postalCode = 'Postal Code is required'
		}
		// Add more validation rules for other fields...

		return errors
	}
	const handleImageChange = async (e) => {
		const file = e.target.files[0]

		try {
			const formData = new FormData()
			formData.append('image', file)

			const response = await fetch(
				'http://localhost:5002/api/menuItem/uploadImage',
				{
					method: 'POST',
					body: formData,
				}
			)

			if (!response.ok) {
				throw new Error('Failed to upload image')
			}

			const data = await response.json()
			setUser({ ...user, image: data.imageUrl })
		} catch (error) {
			console.error('Error uploading image:', error)
		}
	}
	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<div className="profile-container">
			<ToastContainer />
			<h1>User Profile</h1>
			<form onSubmit={handleSubmit} className="profile-form">
				<div className="profile-image-container">
					{user.image && (
						<img
							src={user.image}
							alt="User"
							className="profile-image"
						/>
					)}
					{!user.image && (
						<div className="profile-placeholder">Upload Image</div>
					)}
					<label className="upload">
						Upload Image
						<input
							type="file"
							name="image"
							className="user-image"
							onChange={handleImageChange}
						/>
					</label>
				</div>
				<div className="profile-details">
					<div>
						<label>Name:</label>
						<input
							type="text"
							name="name"
							value={user.name}
							onChange={handleChange}
						/>
						{errors.name && (
							<div className="error">{errors.name}</div>
						)}
					</div>

					<div>
						<label>Street Address:</label>
						<input
							type="text"
							name="streetAddress"
							value={user.streetAddress}
							onChange={handleChange}
						/>
						{errors.streetAddress && (
							<div className="error">{errors.streetAddress}</div>
						)}
					</div>
					<div>
						<label>Postal Code:</label>
						<input
							type="text"
							name="postalCode"
							value={user.postalCode}
							onChange={handleChange}
						/>
						{errors.postalCode && (
							<div className="error">{errors.postalCode}</div>
						)}
					</div>
					<div>
						<label>City:</label>
						<input
							type="text"
							name="city"
							value={user.city}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label>Country:</label>
						<input
							type="text"
							name="country"
							value={user.country}
							onChange={handleChange}
						/>
					</div>
					<div>
						<label>Phone:</label>
						<input
							type="text"
							name="phone"
							value={user.phone}
							onChange={handleChange}
						/>
					</div>
					<button type="submit" className="update-button">
						Update Profile
					</button>
				</div>
			</form>
		</div>
	)
}

export default ProfilePage
