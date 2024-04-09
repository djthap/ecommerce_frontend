import React, { useState } from 'react';
import '../css/MenuItemCard.css';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProductPopup from './ProductPopup';

function MenuCard({ menuItem  ,loading , setloading}) {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

    function truncateDescription(description, maxLength = 200) {
        const words = description.split(' ');
        if (words.length <= maxLength) return description;

        const truncatedWords = words.slice(0, maxLength);
        return truncatedWords.join(' ') + '...';
    }

    return (
        <div className="menu-item-card ">
            <div className="category-name-bookmark">
                {menuItem?.category?.category_name || ''}
            </div>

            <img
                src={menuItem?.image || ''}
                alt={menuItem?.name || ''}
                width={200}
                height={250}
                className="menu-item-image"
            />
            <h4 className="menu-item-title">{menuItem?.name || ''}</h4>

            <div className='menu-price-button'>
                <p className="menu-item-price">
                    Base Price: ${menuItem?.basePrice.toFixed(2) ?? ''}
                </p>

                <button className="menu-button-plus" onClick={togglePopup}>
                    +
                </button>
            </div>


            {showPopup && (
                <div className="custom-popup-overlay">
                    <div className="custom-popup">
                        <ProductPopup productId={menuItem._id}  loading={loading} setloading={setloading} onClose={togglePopup} />
                        <button className="custom-close-btn" onClick={togglePopup}>
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default MenuCard;
