import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';
import requestReducer from './Slices/requestSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        request: requestReducer,
    },
});

export default store;