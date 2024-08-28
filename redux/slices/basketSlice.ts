import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { IProduct } from '@/models/IProduct';

interface BasketState {
    items: IProduct[];
}

const getBasketFromCookies = (): IProduct[] => {
    const basket = Cookies.get('basket');
    return basket ? JSON.parse(basket) : [];
};

const initialState: BasketState = {
    items: getBasketFromCookies(),
};

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<IProduct>) {
            state.items.push(action.payload);
            Cookies.set('basket', JSON.stringify(state.items), { expires: 7 });
        },
        removeItem(state, action: PayloadAction<IProduct>) {
            state.items = state.items.filter(item => item.id !== action.payload.id);
            Cookies.set('basket', JSON.stringify(state.items), { expires: 7 });
        },
        clearBasket(state) {
            state.items = [];
            Cookies.remove('basket');
        },
    },
});

export const { addItem, removeItem, clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
