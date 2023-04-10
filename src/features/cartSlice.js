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
    // Add Item to Cart
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
    // Decrease Cart Quantity
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );

      // Create a condition that when a quantity is greater than 1 decrease its quantity but when quantity is 1 then remove the product from the cart
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        // Add a Toast Message
        toast.info(`Decreased ${action.payload.name} cart quantity`, {
          position: "top-right",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartItems;

        // Add a Toast Message
        toast.error(`${action.payload.name} remove from cart`, {
          position: "top-right",
        });
      }
      // update the localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // Empty the Cart Array
    clearCart(state, action) {
      state.cartItems = [];

      // Add a Toast Message
      toast.error(`Cart Cleared`, {
        position: "top-right",
      });
      // update the localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // get the total
    getTotals(state, action) {
      // using reduce array method
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.carTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
