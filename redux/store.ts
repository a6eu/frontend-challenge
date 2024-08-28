import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import productReducer from '@/redux/slices/productSlice';
import basketReducer from '@/redux/slices/basketSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        basket: basketReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();