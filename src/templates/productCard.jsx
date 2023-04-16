import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions, Button } from "@mui/material";

export default function ActionAreaCard(details) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const handleAddToCart = (product) => {
  //   dispatch(addToCart(product));
  //   navigate("/cart");
  // };
  // onClick={() => handleAddToCart(product)}
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
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={details.image}
          alt={details.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {details.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {details.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
