import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../features/productDetailsSlice";
import Loading from "../templates/loading";

const Details = () => {
  const params = useParams();
  const { productId } = params;
  const { item, status, error } = useSelector((state) => state.productDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId]);
  console.log("item -", item);
  if (status === "loading") {
    return <Loading />;
  }
  if (status === "rejected") {
    return <p>{error} ERROR</p>;
  }
  console.log("image: ", item.price);
  return (
    <div>
      <h2>TEST</h2>
      <h2>{item.id}</h2>
      <h2>{item.name}</h2>
      <div className="detail-img">
        <img src={item.image} alt={item.name} />
      </div>

      <p>{item.description}</p>
    </div>
  );
};

export default Details;
