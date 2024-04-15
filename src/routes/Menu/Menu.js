import React from 'react';
import { useParams } from 'react-router-dom'; 
import MenuList from '../../components/MenuList';

function Menu({ loading, setloading }) {
  // Accessing route parameters
  const { Restaurant } = useParams();

  return (
    <div>
   
      <MenuList loading={loading} setloading={setloading} restaurant={Restaurant} />
    </div>
  );
}

export default Menu;
