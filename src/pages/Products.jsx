import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/cartSlice';
import { plants } from '../data/plants';

export default function Products() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // ✅ Define the function that handles adding to cart
  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  // ✅ Group plants by category (for your rubric)
  const categories = [...new Set(plants.map(p => p.category))];

  return (
    <div className="container">
      <h2>Our Plants</h2>

      {categories.map(category => (
        <div key={category}>
          <h3 style={{ marginTop: '2rem' }}>{category}</h3>
          <div className="products">
            {plants
              .filter(p => p.category === category)
              .map(plant => {
                const inCart = cartItems[plant.id];

                return (
                  <div key={plant.id} className="product-card">
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>${plant.price.toFixed(2)}</p>

                    <button
                      disabled={!!inCart}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {inCart ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
it