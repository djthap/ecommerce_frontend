import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import '../css/Product.css';

function Product() {
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const { id } = useParams();

    useEffect(() => {
        fetch(`/api/menuItem/${id}`)
            .then((response) => response.json())
            .then((data) => setProduct(data))
            .catch((error) => console.error('Error fetching product:', error));
    }, [id]);

    useEffect(() => {
        // Set selectedSize to the first available size when product changes
        if (product && product.sizes && product.sizes.length > 0) {
            setSelectedSize(product.sizes[0]);
        }
    }, [product]);

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error('Please select a size.');
            return;
        }

        let totalPrice = product.basePrice + selectedSize.price;
        selectedToppings.forEach((topping) => {
            totalPrice += topping.price;
        });

        const cartItem = {
            product: product,
            selectedSize: selectedSize,
            selectedToppings: selectedToppings,
            totalPrice: totalPrice,
            quantity: quantity
        };

        const existingCart = JSON.parse(sessionStorage.getItem('cart')) || [];
        existingCart.push(cartItem);
        sessionStorage.setItem('cart', JSON.stringify(existingCart));

        toast.success(
            `Added ${product.name} to cart. Total price: $${totalPrice.toFixed(2)}`
        );
    };

    const handleSizeSelection = (size) => {
        setSelectedSize(size);
    };

    const handleToppingToggle = (topping) => {
        const isSelected = selectedToppings.some((t) => t.name === topping.name);
        if (isSelected) {
            setSelectedToppings(
                selectedToppings.filter((t) => t.name !== topping.name)
            );
        } else {
            setSelectedToppings([...selectedToppings, topping]);
        }
    };

    const handleQuantityChange = (increment) => {
        if (quantity + increment > 0) {
            setQuantity(quantity + increment);
        }
    };

    return (
        <div className="product-page-container">
            {product && (
                <div className="product-page-content">
                    <div className="product-page-image-container">
                        <img
                            src={product.image}
                            alt={product.name}
                            height={220}
                            width={220}
                            className="product-page-image"
                        />
                    </div>
                    <div className="product-details">
                        <h2 className="product-page-name">{product.name}</h2>
                        <p className="product-page-price">
                            ${product.basePrice.toFixed(2)}
                        </p>
                        <p className="product-page-description">
                            {product.description}
                        </p>
                        <hr></hr>
                        <p className="product-page-category">
                            Category: {product.category?.category_name}
                        </p>

                        <div className="product-page-sizes">
                            {product.sizes && product.sizes.length > 0 && (
                                <div>
                                    <h5>Select Size:</h5>
                                    <ul className="product-page-size-list">
                                        {product.sizes.map((size, index) => (
                                            <li
                                                key={index}
                                                className="product-page-size-item"
                                            >
                                                <label htmlFor={`size-${index}`} className="product-page-size-label">
                                                    {size.name}

                                                    <input
                                                        type="radio"
                                                        id={`size-${index}`}
                                                        name="size"
                                                        value={size.name}
                                                        onChange={() => handleSizeSelection(size)}
                                                        checked={selectedSize && selectedSize.name === size.name}
                                                    />

                                                </label>
                                                <span className="size-price">+${size.price.toFixed(2)}</span>
                                                <hr />
                                            </li>

                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="product-page-toppings">
                            {product.extraIngredientPrices &&
                                product.extraIngredientPrices.length > 0 && (
                                    <div>
                                        <h5>Select Extra Ingredients:</h5>
                                        <ul className="product-page-toppings-list">
                                            {product.extraIngredientPrices.map(
                                                (ingredient, index) => (
                                                    <li
                                                        key={index}
                                                        className={
                                                            selectedToppings.some(
                                                                (t) =>
                                                                    t.name ===
                                                                    ingredient.name
                                                            )
                                                                ? 'selected'
                                                                : ''
                                                        }
                                                    >
                                                        <label htmlFor={`ingredient-${index}`} className="product-page-size-label">
                                                            {ingredient.name}

                                                            <input
                                                                type="checkbox"
                                                                id={`ingredient-${index}`}
                                                                value={ingredient.name}
                                                                onChange={() =>
                                                                    handleToppingToggle(
                                                                        ingredient
                                                                    )
                                                                }
                                                                checked={
                                                                    selectedToppings.some(
                                                                        (t) =>
                                                                            t.name ===
                                                                            ingredient.name
                                                                    )
                                                                }
                                                            />

                                                        </label>
                                                        <span className="size-price">+${ingredient.price.toFixed(2)}</span>
                                                        <hr />
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                        </div>

                        <div className="product-page-actions">
                            <div className="quantity-control">
                                <button className="decrement" onClick={() => handleQuantityChange(-1)}>-</button>
                                <span className="quantity">{quantity}</span>
                                <button className="increment" onClick={() => handleQuantityChange(1)}>+</button>
                            </div>
                            <button
                                className="add-to-cart-button"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default Product;
