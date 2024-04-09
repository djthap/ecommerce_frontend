import React, { useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../css/contactus.css'

export default function ContactUsPage() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await axios.post('/api/contactUsRoutes/send-email', {
				name,
				email,
				message,
			})
			toast.success('Email sent successfully!')
			// Reset form fields
			setName('')
			setEmail('')
			setMessage('')
		} catch (error) {
			console.error(error)
			toast.error('Failed to send email. Please try again later.')
		}
	}

	return (
		<section className="contact-section ">
			<div className="paint-stroke"></div>
			<h1 className="contact-heading text-center text-4xl mb-4">
				Contact Us
			</h1>

			<section className="contact-form-section">
				<form onSubmit={handleSubmit}>
					<table className="contact-form-table">
						<tbody>
							<tr>
								<td>
									<label htmlFor="name" className=" prr">
										Name
									</label>
								</td>
								<td className="column2">
									<input
										type="text"
										className="contact-form-control"
										id="name"
										placeholder="Enter your name"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
										required
									/>
								</td>
							</tr>
							<tr>
								<td>
									<label htmlFor="email" className=" prr">
										Email
									</label>
								</td>
								<td className="column2">
									<input
										type="email"
										className="contact-form-control"
										id="email"
										placeholder="Enter your email"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										required
									/>
								</td>
							</tr>
							<tr>
								<td>
									<label htmlFor="message" className=" prr">
										Message
									</label>
								</td>
								<td className="column2">
									<textarea
										className="contact-form-control"
										id="message"
										rows="6"
										placeholder="Write your message here..."
										value={message}
										onChange={(e) =>
											setMessage(e.target.value)
										}
										required
									></textarea>
								</td>
							</tr>
							<tr>
								<td colSpan="2">
									<button
										type="submit"
										className="contact-button"
									>
										Send Message
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</section>
			<div className="paint-stroke mt-4"></div>

			<ToastContainer />
		</section>
	)
}
