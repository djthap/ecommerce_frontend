import React, { useState, useEffect } from 'react'
import '../css/Cart.css'
import { Link } from 'react-router-dom'

function CartPage({ loading, setloading }) {
	const [cartItems, setCartItems] = useState([])

	useEffect(() => {
		// Retrieve cart items from session storage
		const storedCart = JSON.parse(sessionStorage.getItem('cart')) || []
		setCartItems(storedCart)
	}, [])

	const handleRemoveFromCart = (index) => {
		// Remove item from cart
		const updatedCart = [...cartItems]
		updatedCart.splice(index, 1)
		setCartItems(updatedCart)
		setloading(index)
		// Update session storage
		sessionStorage.setItem('cart', JSON.stringify(updatedCart))
	}

	const handleQuantityChange = (index, quantity) => {
		const updatedCart = [...cartItems]
		updatedCart[index].quantity = quantity
		updatedCart[index].totalPrice =
			updatedCart[index].product.basePrice * quantity
		setCartItems(updatedCart)
		setloading(quantity)
		// Update session storage
		sessionStorage.setItem('cart', JSON.stringify(updatedCart))
	}

	// Calculate total price
	const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0)

	return (
		<div className="cart-container">
			<h2 className="cart-heading">Your Shopping Cart</h2>
			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<div className="cart-items">
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
							<tr>
								<td colSpan="4">
									<Link
										to={{
											pathname: '/checkout',
											state: { cartItems: cartItems }, // Pass cartItems data via state
										}}
									>
										<button className="cart-remove-button">
											Proceed to Checkout
										</button>
									</Link>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</div>
	)
}

export default CartPage
