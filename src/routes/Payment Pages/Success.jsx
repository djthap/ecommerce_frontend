import React, { useEffect } from 'react';

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
};

const successContainerStyle = {
    textAlign: 'center',
};

const headerStyle = {
    color: '#4CAF50',
    fontSize: '48px',
    marginBottom: '20px',
    textTransform: 'uppercase',
};

const subHeaderStyle = {
    color: '#2196F3',
    fontSize: '24px',
    marginBottom: '10px',
    textTransform: 'uppercase',
};

const paragraphStyle = {
    fontSize: '18px',
    marginBottom: '5px',
};

const orderedItemStyle = {
    marginTop: '20px',
    padding: '20px',
    border: '2px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    textAlign: 'left',
};

const imageStyle = {
    maxWidth: '100px',
    maxHeight: '100px',
    marginRight: '20px',
};


const Success = () => {
    const pendingCheckout = JSON.parse(sessionStorage.getItem('pendingCheckout'));

    useEffect(() => {
       
            handleSubmit();
        
    }, []);

    const handleSubmit = async () => {
        try {
            sessionStorage.removeItem('cart');
            const response = await fetch('/api/orderRoutes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${sessionStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    phoneNumber: pendingCheckout.shippingInfo.phoneNumber,
                    cardHolderName: pendingCheckout.shippingInfo.cardHolderName,
                    address: pendingCheckout.shippingInfo.address,
                    email: pendingCheckout.shippingInfo.email,

                    items: pendingCheckout.cartItems.map((item) => item.product._id),
                    totalPrice: pendingCheckout.cartItems.reduce((acc, item) => acc + item.totalPrice, 0),
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to place order');
            }

            console.log('order placed successfully');
            sessionStorage.removeItem('pendingCheckout');
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };
    return (
        <div style={containerStyle}>
            <div style={successContainerStyle}>
                <h1 style={headerStyle}>Payment Successful</h1>
                <h2 style={subHeaderStyle}>Order Details</h2>
                <p style={paragraphStyle}>Phone Number: {pendingCheckout.shippingInfo.phoneNumber}</p>
                <p style={paragraphStyle}>Address: {pendingCheckout.shippingInfo.address}</p>
                <p style={paragraphStyle}>Cardholder Name: {pendingCheckout.shippingInfo.cardHolderName}</p>
                <h2 style={subHeaderStyle}>Ordered Items</h2>
                {pendingCheckout.cartItems.map((item, index) => (
                    <div style={orderedItemStyle} key={index}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={item.product.image} alt={item.product.name} style={imageStyle} />
                            <div>
                                <p style={paragraphStyle}><strong>Product:</strong> {item.product.name}</p>
                                <p style={paragraphStyle}><strong>Size:</strong> {item.selectedSize.name}</p>
                                <p style={paragraphStyle}><strong>Total Price:</strong> ${item.totalPrice.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Success;
