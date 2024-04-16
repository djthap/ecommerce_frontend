import React from 'react'
import { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../css/Login.css'
function LoginPage({ setRedirectTo, loading, setloading }) {
	const navigate = useNavigate()
	const fetch = require('isomorphic-fetch')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loginInProgress, setLoginInProgress] = useState(false)
	const [error, setError] = useState('')
	useEffect(() => {
		
		redirect();
	}, [])
	const redirect =()=>{
		if (sessionStorage.getItem('token')) {
			return navigate('/', { replace: true })
		}
	}
	async function handleFormSubmit(ev) {
		ev.preventDefault()
		setLoginInProgress(true)
		try {
			const response = await fetch('https://ecommerce-backend-1-cl9h.onrender.com/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			})

			const data = await response.json()

			if (response.ok) {
				sessionStorage.setItem('token', data.token)
				sessionStorage.setItem('user', JSON.stringify(data.user))
				setloading(true)
				toast.success('Login successful')
				navigate('/', { replace: true })
			} else {
				setError(data.message || 'Login failed')
			}
		} catch (error) {
			console.error('Login error:', error)
			setError('Login failed')
		}
		setLoginInProgress(false)
	}

	

	// Check if already logged in
	if (sessionStorage.getItem('token')) {
		return navigate('/', { replace: true })
	}
	return (
		<section className="mt-8">
			<h1 className="text-center  text-4xl mb-4 heading ">LOGIN</h1>
			<ToastContainer />
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
				<div className="my-4 text-center text-gray-500">
					If uh are new User
				</div>

				<Link
					className="flex gap-4 justify-center text-white rbutton mb-3 "
					to={'/signup'}
				>
					Register &raquo;
				</Link>
			</form>
		</section>
	)
}

export default LoginPage
