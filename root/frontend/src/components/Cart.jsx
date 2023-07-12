import React, { useContext, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { CartContext } from '../CartContext';

import '../style/Cart.css';

function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, clearCart } =
    useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCartClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) =>
          total +
          (item.price - item.price * (item.discount / 100)) * item.count,
        0
      )
      .toFixed(2);
  };

  const handleCheckout = async () => {
    const response = await axios
      .post('/api/v1/checkout', { items: cart })
      .then((res) => window.location.assign(res.data.url));
    console.log(response);
    localStorage.removeItem('cart');
  };

  return (
    <div>
      <button className="navbar-button" onClick={handleCartClick}>
        My Cart
      </button>
      {isModalOpen && (
        <Modal closeModal={handleCloseModal}>
          <div className="cart-header">
            <h2 className="cart-title">My Cart</h2>
            {cart.length > 0 && (
              <button className="clearCart" onClick={() => clearCart()}>
                Clean your Cart
              </button>
            )}
          </div>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-details">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">
                    €
                    {item.count > 0 &&
                      (
                        (item.price - item.price * (item.discount / 100)) *
                        item.count
                      ).toFixed(2)}
                  </p>
                </div>
                <div className="cart-item-count">
                  <button
                    className="cart-item-count-decreaseBtn"
                    onClick={() => decreaseQuantity(item._id)}
                  >
                    -
                  </button>
                  {!(
                    item.hasOwnProperty('maxGroupSize') &&
                    item.count >= item.maxGroupSize
                  ) &&
                    !(
                      item.hasOwnProperty('stock') && item.count >= item.stock
                    ) && (
                      <>
                        <p className="cart-item-count-number">{item.count}</p>
                        <button
                          className="cart-item-count-increaseBtn"
                          onClick={() => increaseQuantity(item._id)}
                        >
                          +
                        </button>
                      </>
                    )}
                  {item.hasOwnProperty('maxGroupSize') &&
                    item.count >= item.maxGroupSize && (
                      <p>{`Max Group Size (${item.maxGroupSize}) reached`}</p>
                    )}
                  {item.hasOwnProperty('stock') && item.count >= item.stock && (
                    <p>{`Stock size (${item.stock}) reached`}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            {cart.length > 0 ? (
              <>
                <p className="cart-total">Total: €{calculateTotal()}</p>
                <button className="checkoutBtn" onClick={handleCheckout}>
                  Checkout
                </button>
              </>
            ) : (
              <p className="emptyCartNotif">Your cart is empty</p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Cart;
