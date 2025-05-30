import { createSlice } from '@reduxjs/toolkit';

interface AgreementState {
  accepted: boolean;
}

const initialState: AgreementState = {
  accepted: false,
};

export const agreementSlice = createSlice({
  name: 'agreement',
  initialState,
  reducers: {
    setAccepted: (state, action) => {
      state.accepted = action.payload;
    },
  },
});

export const { setAccepted } = agreementSlice.actions;
export default agreementSlice.reducer; 