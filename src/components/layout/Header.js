import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../../css/Header.css'
import Search from '../Search'

export default function Header({ loading, setloading }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false) // State to manage login status
	const updateCartCount = () => {
		setCartCount(getCartCount())
	}
	useEffect(() => {
		updateCartCount()
		const cart = sessionStorage.getItem('cart')
		window.addEventListener('storage', updateCartCount)
		checkSession()
		getCartCount()
		console.log('Effect triggered because loading changed.')

		return () => {
			window.removeEventListener('storage', updateCartCount)
		}
	}, [loading])
	const checkSession = () => {
		const userLoggedIn =
			sessionStorage.getItem('user') && sessionStorage.getItem('token')
		setIsLoggedIn(userLoggedIn)
		// setloading(false)
	}
	const getCartCount = () => {
		const cart = sessionStorage.getItem('cart')
		if (cart) {
			const cartItems = JSON.parse(cart)
			return cartItems.reduce((count, item) => count + item.quantity, 0)
		}
		return 0
	}

	const [cartCount, setCartCount] = useState(getCartCount())
	const handleLogout = () => {
		sessionStorage.removeItem('user')
		sessionStorage.removeItem('token')
		setIsLoggedIn(false)
	}
	const user = JSON.parse(sessionStorage.getItem('user'))

	return (
		<Navbar expand="lg" className="text-dark nav-bg">
			<Container fluid>
				<Navbar.Brand href="/" className="logo_bg">
					<img
						src={'/bitebrust.png'}
						width={90}
						height={40}
						alt={'logo'}
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="me-auto my-2 my-lg-0">
						<Nav.Link href="/" className="space">
							HOME
						</Nav.Link>
						
					
						<Nav.Link href="/menu" className="space">
							MENU
						</Nav.Link>
						<Nav.Link href="/aboutUs" className="space">
							ABOUT
						</Nav.Link>
						<Nav.Link href="/ContactUs" className="space">
							CONTACT US
						</Nav.Link>
						{isLoggedIn &&
						(user.role === 'User' ) ? (
							<Nav.Link href="/myorders" className="space">
								MY ORDERS
							</Nav.Link>
						) : (
							''
						)}
						{isLoggedIn &&
						(user.role === 'Restaurant' ||
							user.role === 'Admin') ? (
							<Nav.Link href="/adminDashboard" className="space">
								DASHBOARD
							</Nav.Link>
						) : (
							''
						)}
					</Nav>
					<Form className="d-flex mf">
						<Search/>

						<div className="cart-icon">
							<Nav.Link href="/Cart" className="cart">
								<span className="badge">{cartCount}</span>
								<img
									src={'/cart-icon.png'}
									width={30}
									height={30}
									alt={'Cart'}
									className="icon"
								/>
							</Nav.Link>
						</div>

						{isLoggedIn ? (
							<Nav className="ml-2 mr-2">
								<Nav.Link href="/Profile" className="cart">
									<img
										src={'/person-icon.png'}
										width={30}
										height={30}
										alt={'PersonProfile'}
										className="icon"
									/>
								</Nav.Link>
								<Button
									variant="outline-danger"
									onClick={handleLogout}
									className=""
								>
									Logout
								</Button>
							</Nav>
						) : (
							<Nav className="ml-2 mr-2">
								<NavLink
									to={'/Login'}
									className="text-decoration-none login-btn"
								>
									LOGIN
								</NavLink>
							</Nav>
						)}
					</Form>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
