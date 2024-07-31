import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            // displayName:
            // email:
            // uid:
            // photoURL
        },
        status: 'checking',
        errorMessage: undefined,
        points: 0,
        modo: '',
        canjes: [],

    },
    reducers: {
        checking: (state, /* action */) => {
            state.status = 'checking'
        },
        logIn: (state, action) => {
            state.status = 'Authenticated',
                state.user = action.payload,
                state.errorMessage = undefined;
            if (action.payload.email === 'nachotizii988@gmail.com' || action.payload.email === 'admin@gmail.com') {
                state.modo = 'admin'
            } else {

                state.modo = 'cliente'
            }
        },
        logOut: (state, action) => {
            state.status = 'Not-Authenticated',
                state.user = {},
                state.errorMessage = action.payload ? action.payload : undefined
        },
        setPoints: (state, action) => {
            state.points = action.payload
        },
        setCanjes: (state, action) => {
            state.canjes = action.payload
        },
        putCanjes: (state, action) => {
            console.log(action);
            const canjes = state.canjes.map(canje =>
                canje.id === action.payload ? { ...canje, reclamado: true } : canje
            );
            console.log(canjes);
            state.canjes = canjes;
            console.log(state.canjes);
        },
        setInstagram: (state, action) => {
            state.instagram = action.payload
        },
        setTelefono: (state, action) => {
            state.telefono = action.payload
        }

    }

});


// Action creators are generated for each case reducer function
export const { checking, logIn, logOut, setPoints, setCanjes, putCanjes, setInstagram, setTelefono } = authSlice.actions;