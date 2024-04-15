import React from 'react';

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
};

const cancelContainerStyle = {
    textAlign: 'center',
};

const headerStyle = {
    color: '#FF5722',
    fontSize: '48px',
    marginBottom: '20px',
    textTransform: 'uppercase',
};

const messageStyle = {
    fontSize: '24px',
    marginBottom: '20px',
};

const Cancel = () => {
    return (
        <div style={containerStyle}>
            <div style={cancelContainerStyle}>
                <h1 style={headerStyle}>Payment Canceled</h1>
                <p style={messageStyle}>Your payment has been canceled.</p>
                <p style={messageStyle}>Please try again or contact support if you have any questions.</p>
            </div>
        </div>
    );
};

export default Cancel;
