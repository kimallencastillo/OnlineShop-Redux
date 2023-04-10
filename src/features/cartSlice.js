import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  carTotalQuantity: 0,
  cartTotalAmount: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      // using findIndex() to check if we already have the item that we are trying to add in cart Items
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      // using itemIndex to determine whether to push the product to cart or increment the cart quantity
      if (itemIndex >= 0) {
        // increment(carTotalQuantity) the particular item
        state.cartItems[itemIndex].cartQuantity += 1;

        // using pop up notif when added same product
        toast.info(
          `Increased ${state.cartItems[itemIndex].name} product quantity`,
          {
            position: "top-right",
          }
        );
      } else {
        // item is not existing in the cart so add as new item
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        // using pop up notif when added a new product
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name} to cart`, {
          position: "top-right",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // removing an item from Cart
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = nextCartItems;
      // update the localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      // Add a Toast Message
      toast.error(`${action.payload.name} remove from cart`, {
        position: "top-right",
      });
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
