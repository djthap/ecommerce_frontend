import React, { useState, useEffect } from 'react';
import '../css/Restaurants.css';
import { Link } from 'react-router-dom';

export default function AllRestaurants() {
  const [restaurantUsers, setRestaurantUsers] = useState([]);

  useEffect(() => {
    const fetchRestaurantUsers = async () => {
      try {
        const response = await fetch('/api/auth/restaurants');
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant users');
        }
        const data = await response.json();
        setRestaurantUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurantUsers();
  }, []);

  return (
    <div className="restaurants-container">
      <h2 className="heading"> Restaurants</h2>
      <div className="restaurant-list">
        {restaurantUsers.map((user) => (
          <div className="restaurant-card" key={user._id}>
            <div className="card-content">
              <img className="restaurant-image" src={user.image} alt={user.name} />
              <h3 className="restaurant-name">{user.name}</h3>
              <p className="restaurant-location">
                {user.city}, {user.country}
              </p>
            </div>
            <div className="overlay">
              <Link  to={`/menu/${user._id}`} className="restaurent-btn">View Menu</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
