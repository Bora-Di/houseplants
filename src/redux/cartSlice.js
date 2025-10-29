import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},      // each plant keyed by id
  totalItems: 0,
  totalPrice: 0
};

const recalc = (state) => {
  let items = 0, price = 0;
  Object.values(state.items).forEach(p => {
    items += p.qty;
    price += p.qty * p.price;
  });
  state.totalItems = items;
  state.totalPrice = price;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const p = action.payload;
      if (!state.items[p.id]) state.items[p.id] = { ...p, qty: 1 };
      recalc(state);
    },
    increaseQty(state, action) {
      const id = action.payload;
      state.items[id].qty++;
      recalc(state);
    },
    decreaseQty(state, action) {
      const id = action.payload;
      if (--state.items[id].qty <= 0) delete state.items[id];
      recalc(state);
    },
    deleteItem(state, action) {
      delete state.items[action.payload];
      recalc(state);
    },
    clearCart(state) {
      state.items = {};
      state.totalItems = 0;
      state.totalPrice = 0;
    }
  }
});

export const { addItem, increaseQty, decreaseQty, deleteItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
