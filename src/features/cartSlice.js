import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
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
        state.cartItems[itemIndex].carTotalQuantity += 1;
      } else {
        // item is not existing in the cart so add as new item
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
