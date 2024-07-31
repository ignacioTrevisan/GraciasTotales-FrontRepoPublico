import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';
import { UseAuthSlice } from '../../auth/hooks/useAuthStore';
import { UsePoints } from '../hooks/usePoints';
import { UseUiStore } from '../hooks/useUiStore';

export const AutocompleteItem = ({ setUser, user }) => {
    const { queryOpen, onQueryrOpen, onQueryClose } = UseUiStore();

    const { list } = useSelector(state => state.customer)
    const { startGetCanjes, startGetPoints } = UseAuthSlice();

    const opciones = list.map(item => ({
        label: item.displayName,
        id: item.id
    }));



    const handleChange = async (event, value) => {
        try {
            onQueryClose();
            const canjesUid = await startGetCanjes(value.id);
            const points = await startGetPoints(value.id);
            setUser({ ...user, displayName: value.label, uid: value.id, puntos: points.cantidad, canjes: canjesUid.busqueda })
            setTimeout(() => {
                console.log("hola")
                onQueryrOpen();
            }, 100);
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={opciones}

            sx={{
                width: {
                    xs: '50vw', // Ancho para pantallas pequeñas
                    sm: '40vw', // Ancho para pantallas medianas
                    md: '30vw', // Ancho para pantallas grandes
                    lg: '20vw', // Ancho para pantallas muy grandes
                },
                '.MuiInputBase-root': {
                    color: 'white',

                },
                '.MuiInputLabel-root': {
                    color: `${queryOpen ? 'white' : '#333333'}`,
                },
                '.MuiOutlinedInput-notchedOutline': {
                    borderColor: `${queryOpen ? 'white' : '#333333'}`,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: `${queryOpen ? 'white' : '#333333'}`,
                },

            }}
            renderInput={(params) => <TextField {...params} label="Usuario" />}
            isOptionEqualToValue={(option) => option.label}
            renderOption={(props, option) => (
                <li {...props} key={option.id}>
                    {option.label}
                </li>
            )}
            onChange={handleChange} // Agregar el manejador de eventos onChange
        />
    );
}

