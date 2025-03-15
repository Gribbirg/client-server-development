import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAccepted: false
};

const agreementSlice = createSlice({
    name: 'agreement',
    initialState,
    reducers: {
        setAccepted: (state, action) => {
            state.isAccepted = action.payload;
        }
    }
});

export const {setAccepted} = agreementSlice.actions;
export default agreementSlice.reducer;
