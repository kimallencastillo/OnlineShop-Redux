import React from "react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../App.css";

const productDetails = (details) => {
  const {
    id,
    image,
    name,
    reviews,
    description,
    price,
    size,
    handleAddToCart,
  } = details;
  return (
    <div className="container" key={id}>
      <div className="card">
        <div className="container-fliud">
          <div className="wrapper row">
            <div className="preview col-md-6">
              <div className="preview-pic tab-content">
                <div className="tab-pane active" id="pic-1">
                  <img src={image} alt={name} />
                </div>
              </div>
            </div>
            <div className="details col-md-6">
              <h3 className="product-title">{name}</h3>
              <div className="rating">
                <div className="stars">
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                </div>
                <span className="review-no">{reviews} reviews</span>
              </div>
              <p className="product-description">{description}</p>
              <h4 className="price">
                ₱ <span>{price}</span>
              </h4>

              <h5 className="sizes">
                sizes:
                <span className="size" data-toggle="tooltip" title="small">
                  {size}
                </span>
              </h5>
              <h5 className="colors">
                colors:
                <span
                  className="color orange "
                  data-toggle="tooltip"
                  title="Not In store"
                ></span>
                <span className="color green"></span>
                <span className="color blue"></span>
              </h5>
              <div className="action">
                <button
                  className="add-to-cart btn-default"
                  type="button"
                  onClick={() => handleAddToCart(details)}
                >
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default productDetails;
