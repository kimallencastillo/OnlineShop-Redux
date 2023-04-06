import { useSelector } from "react-redux";
import { productsApi, useGetAllProductsQuery } from "../features/productsApi";

const Home = () => {
  const { item, status } = useSelector((state) => state.products);
  const { data, error, isLoading } = useGetAllProductsQuery();

  if (isLoading) {
    return <p>Loading....</p>;
  }
  if (error) {
    return <p>An error Occured</p>;
  }
  return (
    <div className="home-container">
      <h2>New Arrivals</h2>
      {data?.map((product) => {
        return (
          <div key={product.id} className="product">
            <h3>{product.name}</h3>
            <h4>{product.price}</h4>
            <img src={product.image} alt={productsApi.name} />
            <div className="details">
              <span>{product.description}</span>
              bn
            </div>
            <button>Add To Cart</button>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
