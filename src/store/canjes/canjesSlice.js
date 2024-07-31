import { createSlice } from '@reduxjs/toolkit';

export const canjesSlice = createSlice({
    name: 'canjes',
    initialState: {
        products: []
    },
    reducers: {
        loadProducts: (state, { payload }) => {
            state.products = payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { loadProducts } = canjesSlice.actions;