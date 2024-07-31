import { createSlice } from '@reduxjs/toolkit';

export const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        list: []
    },
    reducers: {
        add: (state, action) => {
            state.list = action.payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { add } = customerSlice.actions;