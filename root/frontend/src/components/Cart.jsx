import React, { useContext, useState } from 'react';
import Modal from './Modal';
import { CartContext } from '../CartContext';

import '../style/Cart.css';

function Cart() {
  const { cart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCartClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.count, 0);
  };

  return (
    <div>
      <button className="navbar-button" onClick={handleCartClick}>
        My Cart
      </button>
      {isModalOpen && (
        <Modal closeModal={handleCloseModal}>
          <h2 className="cart-title">My Cart</h2>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">€{item.price}</p>
                </div>
                <div className="cart-item-count">
                  <button
                    className="cart-item-count-increaseBtn"
                    onClick={() => decreaseQuantity(item._id)}
                  >
                    -
                  </button>
                  <p className="cart-item-count-number">{item.count}</p>
                  <button
                    className="cart-item-count-decreaseBtn"
                    onClick={() => increaseQuantity(item._id)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <p className="cart-total">Total: €{calculateTotal()}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Cart;
