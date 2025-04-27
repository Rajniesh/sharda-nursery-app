import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <div className="empty-cart-content">
        <i className="bi bi-cart-x"></i>
        <h2>Your cart is empty</h2>
        <p>Browse our plants to find something you'll love!</p>
        <Link to="/shop" className="shop-btn">
          Start Shopping
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;