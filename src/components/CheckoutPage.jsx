import React, { useEffect, useState } from 'react'
import { Link, useLocation ,useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import { loadStripe } from '@stripe/stripe-js';
import 'react-toastify/dist/ReactToastify.css'
import '../css/CheckoutPage.css'

function CheckoutPage({loading,setloading}) {
	const navigate = useNavigate()
	
	const [shippingInfo, setShippingInfo] = useState({
		phoneNumber: '',
		address: '',
		cardHolderName: '',
		cardNumber: '',
		email:"",
		cvv: '',
		expiryDate: '',
	})
	const [cartItems, setCartItems] = useState([])
	const [paymentMethod, setPaymentMethod] = useState('pickup'); 
  
	useEffect(() => {
		const storedCart = JSON.parse(sessionStorage.getItem('cart')) || []
		setCartItems(storedCart)
		redirect()
	}, [])
	const redirect =()=>{

		if (!sessionStorage.getItem('token')) {
			return navigate('/login', { replace: true })
		}
	}
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

	const handleChange = (e) => {
		const { name, value } = e.target
		setShippingInfo({ ...shippingInfo, [name]: value })

		
	}
	const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51P0TTMFCUOELksMnK6njO4OglZ1mU339uPGGLTedpRptmfPpONsuue2TFTdA6vdlGst0WWZGoxmsUaU679A0xHAB000LIeto2d");
        const body = {
            products: cartItems
        };
        const headers = {
            "Content-Type": "application/json",
        };
        const response = await fetch('/api/orderRoutes/create-checkout-session/', {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });
        const session = await response.json();
        console.log(session);
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });
    };
	const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (paymentMethod === 'pickup') {
                // Place order logic for pickup
                const response = await fetch('/api/orderRoutes/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${sessionStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({
                        phoneNumber: shippingInfo.phoneNumber,
						email: shippingInfo.email,
                        cardHolderName: shippingInfo.cardHolderName,
                        address: shippingInfo.address,
                        items: cartItems.map((item) => item.product._id),
                        totalPrice: totalPrice,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to place order');
                }

                console.log('order placed successfully');
                setCartItems([]);
                setloading("0");
                setShippingInfo({
                    phoneNumber: '',
                    address: '',
                });
                sessionStorage.removeItem('cart');
                toast.success('Order placed successfully');
            } else if (paymentMethod === 'online') {
                // Save details with product in session
                sessionStorage.setItem('pendingCheckout', JSON.stringify({ shippingInfo, cartItems }));

                // Run makePayment function
                await makePayment();
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order');
        }
    };

	

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
						<form onSubmit={handleSubmit}>
							<h2 className="checkout-sub-heading">
								Shipping Address
							</h2>
							<input
                                        type="text"
                                        name="cardHolderName"
                                        placeholder=" Name"
                                        value={shippingInfo.cardHolderName}
                                        onChange={handleChange}
                                        required
                                    />
                                  
							<input
								type="text"
								name="phoneNumber"
								placeholder="Phone Number"
								value={shippingInfo.phoneNumber}
								onChange={handleChange}
								pattern="[0-9]*"
								maxLength={10}
								required
							/>
							 <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={shippingInfo.email}
                                onChange={handleChange}
                                required
                            />
							<input
								type="text"
								name="address"
								placeholder="Address"
								value={shippingInfo.address}
								onChange={handleChange}
								required
							/>

                                   
                               
<div>
                                <label>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="pickup"
                                        checked={paymentMethod === 'pickup'}
                                        onChange={() => setPaymentMethod('pickup')}
                                    />
                                    Pick up
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="online"
                                        checked={paymentMethod === 'online'}
                                        onChange={() => setPaymentMethod('online')}
                                    />
                                    Online
                                </label>
                            </div>
							
						
							<button
								type="submit"
								className="place-order-button"
							>
								Place Order
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CheckoutPage
