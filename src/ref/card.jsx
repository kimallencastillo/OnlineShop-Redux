import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../features/productsApi";

const Home = () => {
  const { item, status } = useSelector((state) => state.products);
  const { data, error, isLoading } = useGetAllProductsQuery();
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
      <div>
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
            <button>Add To Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

/* 
  <img
          key={productId}
          style={{ width: "400px" }}
          src={item.images[0].url}
          alt={item.name}
        />
        <h2>{item.id}</h2>
        <h2>{item.name}</h2>
        <p>{item.price}</p>
        <p>{item.company}</p>
        <p>{item.description}</p>

              <MyCard
        imageUrl="https://via.placeholder.com/150"
        title="Card Title"
        description="Some quick example text to build on the card title and make up the bulk of the card's content."
        linkUrl="https://example.com"
        linkText="Go somewhere"
      />

        */
