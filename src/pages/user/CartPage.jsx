import { useCart } from '../../contexts/CartContext';
import CartItem from '../../components/cart/CartItem';
import EmptyCart from '../../components/cart/EmptyCart';
import CheckoutButton from '../../components/cart/CheckoutButton';
import './CartPage.css';

const CartPage = () => {
  const { cart, cartCount, getTotalPrice, clearCart } = useCart();

  if (cartCount === 0) return <EmptyCart />;

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Your Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})</h1>
        <button 
          onClick={clearCart}
          className="clear-cart-btn"
          aria-label="Clear entire cart"
        >
          Clear All
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${getTotalPrice()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${getTotalPrice()}</span>
          </div>
          <CheckoutButton />
        </div>
      </div>
    </div>
  );
};

export default CartPage;