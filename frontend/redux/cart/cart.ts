import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, Service } from '../../types';

// Add Product, when Product is defined in types.
interface CartState {
  services: {
    id: string;
    data: Service;
    count: number;
  }[];
  products: {
    id: string;
    data: Product;
    count: number;
  }[];
}

const initialState: CartState = {
  services: [],
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add Product to types, when Product is defined in types.
    addToCart: (
      state,
      action: PayloadAction<{
        isService: boolean;
        item: Service | Product;
        count: number;
      }>
    ) => {
      if (action.payload.isService) {
        let index = state.services.findIndex(
          (s) => s.id === action.payload.item._id
        );
        if (index === -1) {
          state.services.push({
            id: action.payload.item._id,
            data: action.payload.item,
            count: action.payload.count,
          });
        } else {
          state.services[index].count += action.payload.count;
        }
      } else {
        let index = state.products.findIndex(
          (s) => s.id === action.payload.item._id
        );
        if (index === -1) {
          state.products.push({
            id: action.payload.item._id,
            data: action.payload.item,
            count: action.payload.count,
          });
        } else {
          state.products[index].count += action.payload.count;
        }
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
      } else {
        state.products = state.products.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    changeCartCount: (
      state,
      action: PayloadAction<{
        isService: boolean;
        id: string;
        newCount: number;
      }>
    ) => {
      if (action.payload.isService) {
        let index = state.services.findIndex((s) => s.id === action.payload.id);

        state.services[index].count = action.payload.newCount;
      } else {
        let index = state.products.findIndex((s) => s.id === action.payload.id);

        state.products[index].count = action.payload.newCount;
      }
    },
    resetCart: (state) => {
      state.services = [];
      state.products = [];
    },
  },
});

export const { addToCart, removeFromCart, changeCartCount, resetCart } =
  cartSlice.actions;

export default cartSlice.reducer;
