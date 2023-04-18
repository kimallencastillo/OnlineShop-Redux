import React from "react";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// redux
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer, { productsFetch } from "./features/productsSlice";
import cartReducer, { getTotals } from "./features/cartSlice";
import { productsApi } from "./features/productsApi";
import productDetailsReducer from "./features/productDetailsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    productDetails: productDetailsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  },
});

store.dispatch(productsFetch());
store.dispatch(getTotals());
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
