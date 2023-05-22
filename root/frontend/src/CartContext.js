import React, { createContext, useState } from 'react';

// Create the cart context
export const CartContext = createContext();

// Create a provider component for the cart context
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  console.log(cart);

  // Function to add a product to the cart
  const addToCart = (product) => {
    const newProduct = {
      ...product,
      count: 1,
    };
    setCart([...cart, newProduct]);
  };

  // Function to remove a product from the cart

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  const decreaseQuantity = (productID) => {
    setCart((prevState) => {
      const itemIndex = prevState.findIndex((item) => item._id === productID);

      if (itemIndex !== -1) {
        prevState[itemIndex].count -= 1;
      }

      if (prevState[itemIndex].count === 0) {
        prevState.splice(itemIndex, 1);
      }

      return [...prevState];
    });
  };

  const increaseQuantity = (productID) => {
    setCart((prevState) => {
      const itemIndex = prevState.findIndex((item) => item._id === productID);

      if (itemIndex !== -1) {
        prevState[itemIndex].count += 1;
      }

      return [...prevState];
    });
  };

  // Value object to be provided to consuming components
  const cartContextValue = {
    cart,
    addToCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
