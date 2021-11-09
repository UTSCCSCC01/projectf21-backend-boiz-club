import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Service } from '../../types';

// Add Product, when Product is defined in types.
interface CartState {
  items: {
    id: string;
    item: Service | number;
  }[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add Product to types, when Product is defined in types.
    addToCart: (state, action: PayloadAction<Service>) => {
      state.items.push({ id: action.payload._id, item: action.payload });
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
