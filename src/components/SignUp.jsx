import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/Login.css'

export default function SignUp() {
    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loginInProgress, setLoginInProgress] = useState(false)
    const [name, setname] = useState('')
	const [ConfirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('');
	async function handleFormSubmit(ev) {
		ev.preventDefault()
		setLoginInProgress(true)
    try {
      // Check if passwords match
      if (password !== ConfirmPassword) {
          setError('Passwords do not match');
          return;
      }

      const response = await fetch('https://ecommerce-backend-1-cl9h.onrender.com/api/auth/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
console.log(data)
      if (response.ok) {
          
          alert('Registration successful');
          
      } else {
        
          setError(data.message || 'Registration failed');
      }
  } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed');
  }

		setLoginInProgress(false)
    }
  return (
    <section className="mt-8">
    <h1 className="text-center  text-4xl mb-4 heading ">SignUp</h1>
    <form className=" form-group" onSubmit={handleFormSubmit}>
    <input
					type="name"
					placeholder="Name"
                    className="form-control mb-20"
					value={name}
					
					onChange={(ev) => setname(ev.target.value)}
					required
				/>
        <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-20"
            value={email}
            disabled={loginInProgress}
            onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-20"
            value={password}
            disabled={loginInProgress}
            onChange={(ev) => setPassword(ev.target.value)}
        />
        	<input
					type="password"
					placeholder="ConfirmPassword"
					className="form-control mb-20"
					value={ConfirmPassword}
				
					onChange={(ev) => setConfirmPassword(ev.target.value)}
					required
				/>
        <button
            disabled={loginInProgress}
            className="btn highlight_menu  form-control"
            type="submit"
        >
           Signup
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
       
    </form>
</section>
  )
}
