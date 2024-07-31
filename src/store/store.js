import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { productsSlice } from "./products/productsSlice";
import { canjesSlice } from "./canjes/canjesSlice";
import { uiSlice } from "./ui/uiSlice";
import { customerSlice } from "./customer/customerSlice";

export const Store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        products: productsSlice.reducer,
        canjes: canjesSlice.reducer,
        ui: uiSlice.reducer,
        customer: customerSlice.reducer,
    }
})