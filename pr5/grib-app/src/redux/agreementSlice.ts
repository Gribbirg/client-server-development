import { createSlice } from '@reduxjs/toolkit';

interface AgreementState {
  accepted: boolean;
  submitted: boolean;
}

const initialState: AgreementState = {
  accepted: false,
  submitted: false,
};

export const agreementSlice = createSlice({
  name: 'agreement',
  initialState,
  reducers: {
    setAccepted: (state, action) => {
      state.accepted = action.payload;
    },
    setSubmitted: (state, action) => {
      state.submitted = action.payload;
    },
  },
});

export const { setAccepted, setSubmitted } = agreementSlice.actions;
export default agreementSlice.reducer; 