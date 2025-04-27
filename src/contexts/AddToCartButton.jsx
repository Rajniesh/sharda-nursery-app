import { useCart } from '../contexts/CartContext';

function AddToCartButton({ plant }) {
  const { addToCart } = useCart();

  return (
    <button onClick={() => addToCart(plant)}>
      Add to Cart
    </button>
  );
}