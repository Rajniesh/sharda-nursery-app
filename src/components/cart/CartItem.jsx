import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <Link to={`/plants/${item.id}`} className="item-image">
        <img src={item.image || '/default-plant.jpg'} alt={item.name} />
      </Link>
      
      <div className="item-details">
        <Link to={`/plants/${item.id}`} className="item-name">
          {item.name}
        </Link>
        <p className="item-price">${item.price.toFixed(2)}</p>
        
        <div className="quantity-controls">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span>{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
      
      <button 
        onClick={() => removeFromCart(item.id)}
        className="remove-btn"
        aria-label="Remove item"
      >
        &times;
      </button>
    </div>
  );
};

export default CartItem;