import { useEffect } from "react";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
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
  if (item && item.images) {
    console.log("images : ", item.images);
    const image = item.images[0]?.url;
    return (
      <div>
        {
          <ProductDetails
            key={productId}
            image={image}
            alt={item.name}
            price={item.price}
            size={item.size}
            reviews={item.reviews}
            description={item.description}
            handleAddToCart={handleAddToCart}
          />
        }
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default Details;
