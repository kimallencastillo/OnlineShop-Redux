import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetAllProductsQuery } from "../features/productsApi";
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { item, status } = useSelector((state) => state.products);
  const { data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const [selectedCategory, setSelectedCategory] = useState("");

  if (isLoading) {
    return <p>Loading....</p>;
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
          <div key={product.id} className="product">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <h4>₱{product.price.toLocaleString()}</h4>
            <div className="details">
              <span>{product.description}</span>
            </div>
            <button onClick={() => handleAddToCart(product)}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
