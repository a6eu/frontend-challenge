import { IProduct } from '@/models/IProduct';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import $api from '@/http';
import { RootState } from '@/redux/store';

const initialState: ProductsState = {
    items: [],
    selectedProduct: null,
    status: 'idle',
    error: null,
    total: 0,
};

interface ProductsState {
    items: IProduct[];
    selectedProduct: IProduct | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    total: number;
}

export const fetchProducts = createAsyncThunk<
    { items: IProduct[]; total: number },
    string | undefined,
    { rejectValue: string }
>(
    'products/fetchProducts',
    async (params, { rejectWithValue }) => {
        try {
            const response = await $api.get(`/products?limit=100&${params}`);
            return {
                items: response.data.products, // почему то не смог прикрепить generic AxiosResponse
                total: response.data.total,
            };
        } catch (error) {
            return rejectWithValue('Something went wrong');
        }
    },
);

export const fetchProductById = createAsyncThunk<IProduct, number, { rejectValue: string }>(
    'products/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await $api.get(`/products/${id}`);
            return response.data as IProduct;
        } catch (error) {
            return rejectWithValue('Something went wrong');
        }
    },
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearSelectedProduct(state) {
            state.selectedProduct = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProducts.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<{ items: IProduct[]; total: number }>) => {
                state.status = 'succeeded';
                state.items = action.payload.items; // Change this line
                state.total = action.payload.total; // Change this line
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Something went wrong';
            })
            .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<IProduct>) => {
                state.status = 'succeeded';
                state.selectedProduct = action.payload; 
            })
    },
});

export default productSlice.reducer;
export const {clearSelectedProduct} = productSlice.actions;
export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectTotal = (state: RootState) => state.products.total;
