import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../features/productDetailsSlice";
import { addToCart } from "../features/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProductDetails from "../templates/productDetails";
import Loading from "../templates/loading";

const Details = () => {
  const params = useParams();
  const { productId } = params;
  const { item, status, error } = useSelector((state) => state.productDetails);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    const itemIndex = cart.findIndex((item) => item.id === product.id);
    if (itemIndex === -1) {
      // If the product is not already in the cart, add it
      dispatch(addToCart(product));
    } else {
      // If the product is already in the cart, increase its quantity
      const updatedCart = [...cart];
      updatedCart[itemIndex].quantity += 1;
      dispatch(setCart(updatedCart));
    }
    navigate("/cart");
  };
  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "rejected") {
    return <p>{error} ERROR</p>;
  }
  if (item) {
    //console.log("images : ", item.images);
    const image = item.image;
    console.log("images ", image);

    return (
      <div>
        <ProductDetails
          key={productId}
          id={productId}
          image={item.image}
          alt={item.name}
          name={item.name}
          price={item.price}
          reviews={item.reviews}
          description={item.description}
          handleAddToCart={handleAddToCart}
        />
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default Details;
