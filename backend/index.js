/* this uses express nodeman and cors for the backend*/
const express = require("express");
const cors = require("cors");

// import product.js router
const products = require("./routes/products");
// import singeProduct.js router
const singeProduct = require("./routes/singeProduct");

const app = express();

app.use(express.json());
app.use(cors());

// test
app.get("/", (req, res) => {
  res.send("Sample API SEND");
});

// use product.js router
app.use("/products", products);

// use singeProduct.js router
app.use("/singeProduct", singeProduct);

// run it to 5000 port
const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on Port ${port}`));

// run it in terminal using npm run server
