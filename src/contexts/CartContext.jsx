import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('plantCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
      setCartCount(JSON.parse(savedCart).reduce((total, item) => total + item.quantity, 0));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('plantCart', JSON.stringify(cart));
    setCartCount(cart.reduce((total, item) => total + item.quantity, 0));
  }, [cart]);

  const addToCart = (plant) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === plant.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === plant.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      
      return [...prevCart, { ...plant, quantity: 1 }];
    });
  };

  const removeFromCart = (plantId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== plantId));
  };

  const updateQuantity = (plantId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(plantId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === plantId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    ).toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}