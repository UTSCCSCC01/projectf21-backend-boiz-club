import { configureStore, createReducer } from '@reduxjs/toolkit';
import { counterReducer } from './counter';
import { userCredentialReducer } from './userCredential';
import { cartReducer } from './cart';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    userCredential: userCredentialReducer,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
