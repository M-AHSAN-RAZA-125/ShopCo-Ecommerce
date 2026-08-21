import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("shopping_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cart));
  }, [cart]);

  // Safe Add to Cart Function
  const addToCart = (product, quantity, size, color) => {
    if (!product) return;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          String(item.id) === String(product.id) &&
          item.size === size &&
          item.color === color
      );

      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: Number(product.price) || 0,
            image: product.image || (product.images && product.images[0]) || "",
            quantity: Number(quantity) || 1,
            size: size || "Standard",
            color: color || "Default",
          },
        ];
      }
    });
  };

  // Quantity Modifier
  const updateQuantity = (id, size, color, type) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (
          String(item.id) === String(id) &&
          item.size === size &&
          item.color === color
        ) {
          const newQty =
            type === "increase" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: Math.max(1, newQty) };
        }
        return item;
      })
    );
  };

  // Remove Item Function
  const removeFromCart = (id, size, color) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            String(item.id) === String(id) &&
            item.size === size &&
            item.color === color
          )
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);