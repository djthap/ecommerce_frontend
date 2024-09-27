import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../css/CheckoutPage.css'

function Test({ loading, setloading }) {
	const [cartItems, setCartItems] = useState([])

	useEffect(() => {
		const storedCart = JSON.parse(sessionStorage.getItem('cart')) || []
		setCartItems(storedCart)
	}, [])

	const handleRemoveFromCart = (index) => {
		const updatedCart = [...cartItems]
		updatedCart.splice(index, 1)
		setCartItems(updatedCart)
		sessionStorage.setItem('cart', JSON.stringify(updatedCart))
	}

	const handleQuantityChange = (index, quantity) => {
		const updatedCart = [...cartItems]
		updatedCart[index].quantity = quantity
		updatedCart[index].totalPrice =
			updatedCart[index].product.basePrice * quantity
		setCartItems(updatedCart)
		sessionStorage.setItem('cart', JSON.stringify(updatedCart))
	}

	const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0)

	const makePayment = async () => {
		const stripe = await loadStripe(
			'pk_test_51P0TTMFCUOELksMnK6njO4OglZ1mU339uPGGLTedpRptmfPpONsuue2TFTdA6vdlGst0WWZGoxmsUaU679A0xHAB000LIeto2d'
		)
		const body = {
			products: cartItems,
		}
		const headers = {
			'Content-Type': 'application/json',
		}
		const response = await fetch(
			'https://ecommerce-backend-o1vw.onrender.com/api/orderRoutes/create-checkout-session/',
			{
				method: 'POST',
				headers: headers,
				body: JSON.stringify(body),
			}
		)
		const session = await response.json()
		console.log(session)
		const result = await stripe.redirectToCheckout({
			sessionId: session.id,
		})
	}

	return (
		<div>
			<div className="checkout-container">
				<ToastContainer />
				<h1 className="checkout-heading">Checkout</h1>
				<div className="checkout-content">
					<div className="checkout-cart">
						<h2 className="checkout-sub-heading">Your Cart</h2>
						<table>
							<thead>
								<tr>
									<th>Product</th>
									<th>Quantity</th>
									<th>Action</th>
									<th>Total Price</th>
								</tr>
							</thead>
							<tbody>
								{cartItems.map((item, index) => (
									<tr key={index}>
										<td>
											<div className="cart-item-info">
												<img
													src={item.product.image}
													alt={item.product.name}
													className="cart-item-image"
												/>
												<div className="cart-item-details">
													<h3>{item.product.name}</h3>
													<p>
														Size:{' '}
														{item.selectedSize.name}
													</p>
												</div>
											</div>
										</td>
										<td>
											<div className="quantity-control">
												<button
													onClick={() =>
														handleQuantityChange(
															index,
															item.quantity - 1
														)
													}
													className="mr"
												>
													-
												</button>
												<span>{item.quantity}</span>
												<button
													onClick={() =>
														handleQuantityChange(
															index,
															item.quantity + 1
														)
													}
													className="mr"
												>
													+
												</button>
											</div>
										</td>
										<td>
											<button
												className="cart-remove-button"
												onClick={() =>
													handleRemoveFromCart(index)
												}
											>
												Remove
											</button>
										</td>
										<td>${item.totalPrice.toFixed(2)}</td>
									</tr>
								))}
								<tr>
									<td colSpan="3" className="text-right">
										Total Price :{' '}
									</td>
									<td>${totalPrice.toFixed(2)}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="checkout-shipping">
						<button
							type="submit"
							className="place-order-button"
							onClick={makePayment}
						>
							Proceed to Checkout
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Test
