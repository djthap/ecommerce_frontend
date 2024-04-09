import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuCard from './MenuCard';
import '../css/MenuList.css';

function MenuList({loading,setloading}) {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchMenuItems(); // Fetch all menu items initially
        fetchCategories();
    }, []);

    const fetchMenuItems = async (categoryId = '') => {
        try {
            let url = '/api/menuItem';
            if (categoryId) {
                url = `/api/menuItem/category/${categoryId}`;
            }
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch menu items');
            }
            const data = await response.json();
            setMenuItems(data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    return (
        <div className='menu-list-container'>
            <h2>Menu</h2>
            <div className="all-menu-items22">
                <div className="category-list">
                    <h2>Categories</h2>
                    <ul>
                        <li>
                            <button className='menu-categories-button' onClick={() => fetchMenuItems()}>All Products</button>
                        </li>
                        {categories.map((category) => (
                            <li key={category._id}>
                                <button className='menu-categories-button' onClick={() => fetchMenuItems(category._id)}>
                                    {category.category_name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="menu-item-list22 row gx-0">
                    {menuItems.map((menuItem) => (
                        <div className={`col-md-${Math.floor(12 / Math.min(menuItems.length, 4))}`} key={menuItem._id}>
                            <MenuCard menuItem={menuItem}  loading={loading} setloading={setloading}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MenuList;
