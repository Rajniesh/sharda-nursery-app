import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
const CheckoutButton = () => {
  const { cartCount } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!currentUser) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    navigate('/checkout');
  };

  return (
    <button
      onClick={handleCheckout}
      className="checkout-btn"
      disabled={cartCount === 0}
      aria-label="Proceed to checkout"
    >
      Proceed to Checkout
    </button>
  );
};

export default CheckoutButton;