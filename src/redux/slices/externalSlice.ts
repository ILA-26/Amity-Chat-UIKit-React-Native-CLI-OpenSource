import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ExternalState {
  avatarUrl: string;
  isPostPopUpOpen: boolean;
}
const initialState: ExternalState = {
  avatarUrl: '',
  isPostPopUpOpen: false,
};

const externalSlice = createSlice({
  name: 'externalParams',
  initialState,
  reducers: {
    updateAvatarUrl: (state, action: PayloadAction<string>) => {
      state.avatarUrl = action.payload;
    },
    updatePopUpState: (state, action: PayloadAction<boolean>) => {
      state.isPostPopUpOpen = action.payload;
    },
  },
});

export default externalSlice;
