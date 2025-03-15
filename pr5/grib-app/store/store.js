import {configureStore} from '@reduxjs/toolkit';
import agreementReducer from './agreementSlice';

export const store = configureStore({
    reducer: {
        agreement: agreementReducer
    }
});
