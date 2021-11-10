import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Service } from '../../types';

// Add Product, when Product is defined in types.
interface CartState {
  services: {
    id: string;
    data: Service;
  }[];
  // products: {
  //   id: string;
  //   product: Product;
  // }[];
}

const initialState: CartState = {
  services: [],
  //products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add Product to types, when Product is defined in types.
    addToCart: (
      state,
      action: PayloadAction<{ isService: boolean; item: Service }>
    ) => {
      if (action.payload.isService) {
        state.services.push({
          id: action.payload.item._id,
          data: action.payload.item,
        });
      }
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ isService: boolean; id: string }>
    ) => {
      if (action.payload.isService) {
        state.services = state.services.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
