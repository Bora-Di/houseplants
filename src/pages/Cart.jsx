import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increaseQty, decreaseQty, deleteItem } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(state => Object.values(state.cart.items));
  const totalItems = useSelector(state => state.cart.totalItems);
  const totalPrice = useSelector(state => state.cart.totalPrice);

  return (
    <div className="cart container">
      <h2>Shopping Cart</h2>
      <p>Total items: {totalItems}</p>
      <p>Total cost: ${totalPrice.toFixed(2)}</p>

      {items.length === 0 ? (
        <Link to="/products" className="btn">Continue Shopping</Link>
      ) : (
        <>
          {items.map(it => (
            <div key={it.id} className="cart-item">
              <img src={it.image} alt={it.name} />
              <div className="info">
                <h4>{it.name}</h4>
                <p>${it.price}</p>
              </div>
              <div className="controls">
                <button onClick={() => dispatch(increaseQty(it.id))}>+</button>
                <span>{it.qty}</span>
                <button onClick={() => dispatch(decreaseQty(it.id))}>-</button>
                <button onClick={() => dispatch(deleteItem(it.id))}>Delete</button>
              </div>
            </div>
          ))}
          <div>
            <button onClick={() => alert('Coming Soon')}>Checkout</button>
            <Link to="/products" className="btn">Continue Shopping</Link>
          </div>
        </>
      )}
    </div>
  );
}
