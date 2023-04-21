import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../features/productDetailsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddToCart } from "../utils/utils";
import Loading from "../templates/loading";

const Details = () => {
  const params = useParams();
  const { productId } = params;
  const { item, status, error } = useSelector((state) => state.productDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    const image = item.images[0]?.url;
    return (
      <div>
        <div className="container" key={productId}>
          <div className="card">
            <div className="container-fliud">
              <div className="wrapper row">
                <div className="preview col-md-6">
                  <div className="preview-pic tab-content">
                    <div className="tab-pane active" id="pic-1">
                      <img src={image} alt={item.name} />
                    </div>
                  </div>
                </div>
                <div className="details col-md-6">
                  <h3 className="product-title">{item.name}</h3>
                  <div className="rating">
                    <span className="review-no">{item.reviews} reviews</span>
                  </div>
                  <p className="product-description">{item.description}</p>
                  <h4 className="price">
                    ₱ <span>{item.price.toLocaleString()}</span>
                  </h4>
                  <div className="action">
                    <button
                      className="add-to-cart btn-default"
                      type="button"
                      onClick={() => handleAddToCart(item, navigate, dispatch)}
                    >
                      add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default Details;
