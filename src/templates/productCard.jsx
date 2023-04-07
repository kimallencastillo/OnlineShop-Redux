import React from "react";
import { Card, Button } from "react-bootstrap";
import "./productCard";
const ProductCard = ({ product }) => {
  /*   
  <ProductCard
              key={product.id}
              product={{
                image: product.image,
                name: product.name,
                price: product.price,
                details: product.details,
              }}
            />
            */
  return (
    <Card className="product-card" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={product.image} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>₱{product.price.toLocaleString()}</Card.Text>
        <Card.Text>{product.details}</Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
