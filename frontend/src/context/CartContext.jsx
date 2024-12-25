import React, { createContext, useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";

// Create the context
export const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { axiosInstance } = useAxios();
  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("buchhandlung_cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("buchhandlung_cart", JSON.stringify(cart));
  }, [cart]);

  // Add a book ID
  const addToCart = (bookId) => {
    if (!cart.includes(bookId)) {
      setCart((prevCart) => [...prevCart, bookId]);
    }
  };

  // Remove a book ID
  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((id) => id !== bookId));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Get cart data (IDs only)
  const getCart = () => cart;

  // Fetch books data based on IDs in the cart
  const fetchBooksFromCart = async () => {
    try {
      const response = await axiosInstance.get("/books");
      const books = response.data;
      return books.filter((book) => cart.includes(book._id));
    } catch (error) {
      console.error("Failed to fetch books:", error);
      return [];
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getCart,
        fetchBooksFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
