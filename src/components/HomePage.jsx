import React, { useEffect, useState } from 'react'
import '../css/Home.css'
import ProductLayout from './ProductLayout'
import axios from 'axios';

export default function HomePage() {
	const [products, setProducts] = useState([])

	useEffect(() => {
		fetchTopThreeProducts()
	}, [])

	const fetchTopThreeProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5002/api/menuItem/top3', {
                headers: {
                    Accept: 'application/json', // Correct content type for the request
                },
            });
            
            // Axios automatically parses JSON, no need for response.json()
            setProducts(response.data); // Assuming setProducts is a state setter
        } catch (error) {
            console.error('Error fetching top three products:', error);
        }
    };
	return (
		<section>
			<section className="home-container">
				<div className="text-overlay">
					<h2>Food that makes you happy</h2>
					<h5>
						Our job is to fill your tummy with delicious food with
						fast and free delivery
					</h5>
					<button className="order-now-button" name="Order Now">
						Order Now
					</button>
				</div>
			</section>
			<section className="food-icons-container">
				<h2 className="heading1">Want To Eat?</h2>
				<div className=" pl-4 pr-4">
					<div className=" cat gx-0">
						<div className="col-1 text-center">
							<img
								src={'/pizzaIcon.png'}
								width={70}
								height={70}
								alt={'pizzaicon'}
								className="icon"
							/>
							<p>Pizza</p>
						</div>
						<div className="col-1 text-center">
							<img
								src={'/burgerIcon.png'}
								width={70}
								height={70}
								alt={'burgericon'}
								className="icon"
							/>
							<p>Burger</p>
						</div>
						<div className="col-1 text-center">
							<img
								src={'/noodlesIcon.png'}
								width={70}
								height={70}
								alt={'nooldesicon'}
								className="icon"
							/>
							<p>Noodles</p>
						</div>
						<div className="col-1 text-center">
							<img
								src={'/sandwichIcon.png'}
								width={70}
								height={70}
								alt={'sandwichicon'}
								className="icon"
							/>
							<p>Sandwich</p>
						</div>
						<div className="col-1 text-center">
							<img
								src={'/cupcakeIcon.png'}
								width={70}
								height={70}
								alt={'cupcakeicon'}
								className="icon"
							/>
							<p>Cupcake</p>
						</div>
						<div className="col-1 text-center">
							<img
								src={'/icecreamIcon.png'}
								width={70}
								height={70}
								alt={'icecreamicon'}
								className="icon"
							/>
							<p>Ice Cream</p>
						</div>
						<div className="col-1 text-center">
							<img
								src={'/drinkIcon.png'}
								width={70}
								height={70}
								alt={'drinkicon'}
								className="icon"
							/>
							<p>Drinks</p>
						</div>
					</div>
				</div>
			</section>
			<section>
				<h2 className="heading1">Our Most Popular Recipes</h2>
				<div className="product-layout-container">
					{products.map((product) => (
						<ProductLayout key={product._id} product={product} />
					))}
				</div>
			</section>
			<section className="testimonials-container">
				<h2 className="heading1">Client Testimonials</h2>
				<div className="d-flex justify-content-center gx-0 ">
					<div className="col-md-5">
						<div className="testimonial">
							<img
								src={'/Client.png'}
								width={300}
								height={300}
								alt={'client-avatar'}
								className="client-avatar img-fluid rounded"
							/>
						</div>
					</div>
					<div className="col-md-7">
						<div className="testimonial ">
							<p className="testimonial-text">
								"As a busy professional, I rely on ByteBurst to
								satisfy my cravings without sacrificing quality.
								Their wide variety of cuisines and easy ordering
								process make it my go-to choice for convenient
								and tasty meals."
							</p>
							<p className="client-name">- Emily Watson</p>
						</div>
					</div>
				</div>
			</section>
			<section className="aboutusPara3 alignLeft">
				<div className="terms">
					<div className="col-md-3 col-12">
						<div className="picturebox2 logo dd">
							<img
								src={'/delievery.png'}
								width={165}
								height={166}
								alt={'logo'}
								className="termimg"
							/>

							<h1 className="head2">
								Free shipping on first order
							</h1>
							<p className="para2">
								Sign up for updates and get free shipping
							</p>
						</div>
					</div>
					<div className="col-md-3 col-12">
						<div className="picturebox2 logo dd">
							<img
								src={'/timer.png'}
								width={165}
								height={166}
								alt={'logo'}
								className="termimg"
							/>

							<h1 className="head2">30 minutes delivery</h1>
							<p className="para2">
								Everything you order will be quickly delivered
								to your
							</p>
						</div>
					</div>
					<div className="col-md-3 col-12">
						<div className="picturebox2 logo dd">
							<img
								src={'/burger.png'}
								width={165}
								height={166}
								alt={'logo'}
								className="termimg"
							/>

							<h1 className="head2">Best quality guarantee</h1>
							<p className="para2">
								We use only the best ingredients to cook the
								tasty fresh food for you.
							</p>
						</div>
					</div>
					<div className="col-md-3 col-12">
						<div className="picturebox2 logo dd">
							<img
								src={'/combo.png'}
								width={165}
								height={166}
								alt={'logo'}
								className="termimg"
							/>

							<h1 className="head2">Variety of dishes</h1>
							<p className="para2">
								In our menu you’ll find a wide variety of
								dishes, desserts, and drinks.
							</p>
						</div>
					</div>
				</div>
			</section>
		</section>
	)
}
