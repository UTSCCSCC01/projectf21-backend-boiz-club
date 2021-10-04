import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserCredentialState {
  userToken: string | null;
}

const initialState: UserCredentialState = {
  userToken: null,
};

export const userCredentialSlice = createSlice({
  name: 'userCredential',
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<UserCredentialState>) => {
      state.userToken = action.payload.userToken;
    },
    clearToken: (state) => {
      state.userToken = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToken, clearToken } = userCredentialSlice.actions;

export default userCredentialSlice.reducer;
