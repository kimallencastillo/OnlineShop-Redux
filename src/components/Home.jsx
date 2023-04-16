import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllProductsQuery } from "../features/productsApi";
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../templates/loading";
const Home = () => {
  // const { items, status } = useSelector((state) => state.products);
  const { data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const [selectedCategory, setSelectedCategory] = useState("");

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <p>An error Occured</p>;
  }

  const filteredData = data?.filter(
    (product) =>
      selectedCategory === "" || product.category === selectedCategory
  );

  return (
    <div className="home-container">
      <h2>New Arrivals</h2>
      <div className="category-div">
        <label htmlFor="category-select">Select a category:</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="office">Office</option>
          <option value="living room">Living Room</option>
          <option value="kitchen">Kitchen</option>
          <option value="bedroom">Bedroom</option>
          <option value="dining">Dining</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div className="products">
        {filteredData?.map((product) => (
          <div
            key={product.id}
            className="product"
            onClick={() => navigate(`/details/${product.id}`)}
          >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <h4>₱{product.price.toLocaleString()}</h4>
            <button
              onClick={(event) => {
                event.stopPropagation();
                handleAddToCart(product);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-cart"
                viewBox="0 1 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />{" "}
              </svg>
              Add Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
