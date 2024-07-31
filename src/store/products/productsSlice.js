import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        active: []
    },
    reducers: {
        loadProducts: (state, { payload }) => {
            state.products = payload;
        },
        setActive: (state, { payload }) => {
            state.active = payload;
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter((p) => p.id !== action.payload);
        },
        addProduct: (state, action) => {
            state.products.push(action.payload)
        }

    }
});


// Action creators are generated for each case reducer function
export const { loadProducts, setActive, deleteProduct, addProduct } = productsSlice.actions;