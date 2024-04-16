import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../css/admin_login.css'

function AdminLoginPage({ loading, setloading }) {
	const navigate = useNavigate()
	useEffect(() => {
		redirect()
	}, [])
	const fetch = require('isomorphic-fetch')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loginInProgress, setLoginInProgress] = useState(false)
	const [error, setError] = useState('')
	async function handleFormSubmit(ev) {
		ev.preventDefault()
		setLoginInProgress(true)
		try {
			const response = await fetch(
				'https://ecommercebackend-production-8c9e.up.railway.app/api/auth/admin/login',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email, password }),
				}
			)

			const data = await response.json()

			console.log(data)
			if (data.user !== undefined) {
				sessionStorage.setItem('token', data.token)
				sessionStorage.setItem('user', JSON.stringify(data.user))
				setloading(true)
				toast.success('Login successful')
				navigate('/', { replace: true })
			} else {
				alert('Login Credentials Wrong')
			}
		} catch (error) {
			console.error('Login error:', error)
			setError('Login failed')
		}
		setLoginInProgress(false)
	}

	const redirect = () => {
		if (sessionStorage.getItem('token')) {
			return navigate('/', { replace: true })
		}
	}
	return (
		<section className="mt-8">
			<ToastContainer />
			<h1 className="text-center text-4xl mb-4 admin-heading">
				Admin LOGIN
			</h1>
			<form className="admin-form-group" onSubmit={handleFormSubmit}>
				<input
					type="email"
					name="email"
					placeholder="Email"
					className="f mb-20 admin-input"
					value={email}
					disabled={loginInProgress}
					onChange={(ev) => setEmail(ev.target.value)}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					className="f mb-20 admin-input"
					value={password}
					disabled={loginInProgress}
					onChange={(ev) => setPassword(ev.target.value)}
				/>
				<button
					disabled={loginInProgress}
					className="btn highlight-menu f rbutton"
					type="submit"
				>
					Login
				</button>
				{error && (
					<div className="text-red-500 text-sm mt-2">{error}</div>
				)}
			</form>
		</section>
	)
}

export default AdminLoginPage
