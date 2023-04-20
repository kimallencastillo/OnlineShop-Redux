import { addToCart } from "../features/cartSlice";

export const handleAddToCart = (product, navigate, dispatch) => {
  dispatch(addToCart(product));
  navigate("/cart");
};
