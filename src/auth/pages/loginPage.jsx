import React, { useState } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import { Button, Grid, IconButton, Link, TextField, Typography } from '@mui/material';
import { DockSharp, Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/authLayout';
import { UseAuthSlice } from '../hooks/useAuthStore';
import { UseForm } from '../../hook/useForm';
import { SaveUserFirebase } from '../../graciasTotales/hooks/useUserFirestore';

const formdata = {
    Email: '',
    Contraseña: '',
}
const formValidations = {
    Email: [(value) => (value.includes('@gmail') || value.includes('@hotmail') || value.includes('@outlook')) && value.includes('.'), 'Ingrese un correo electronico valido'],
    Contraseña: [(value) => value.length > 0, 'Ingrese una contrasña'],
}

export const LoginPage = () => {

    const { startSignInWithGoogle, startLoginWithEmailAndPassword, startSignInWithFacebook } = UseAuthSlice();

    const [enviado, setEnviado] = useState(false);
    const { Email, Contraseña, EmailValid, ContraseñaValid, isFormValid, OnInputchange, formState } = UseForm(formdata, formValidations);

    const submit = (event) => {
        setEnviado(true);
        event.preventDefault();
        if (!isFormValid) return;
        startLoginWithEmailAndPassword(Email, Contraseña);
    }
    const google = async () => {
        const { user } = await startSignInWithGoogle();
        const uid = user.uid;
        const displayName = user.displayName;

        SaveUserFirebase(uid, displayName)
    }
    return (

        <AuthLayout title='Iniciar' >

            <div className="containerInput">
                <form onSubmit={submit}>

                    <TextField
                        sx={{
                            marginTop: '20px',
                            width: '60%',
                            alignSelf: 'center',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                            '& .MuiInputBase-input': {
                                color: 'white',
                            },
                            '& .MuiInputLabel-root': {
                                color: 'lightgray', // Cambia 'lightgray' por el color que prefieras
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'white', // Color del label cuando el TextField está enfocado
                            },
                        }}
                        label="Email"
                        value={Email}
                        name="Email"
                        onChange={OnInputchange}
                        error={EmailValid !== null && enviado ? true : false}
                        helperText={enviado && EmailValid ? EmailValid : ""}
                    />
                    <TextField
                        sx={{
                            marginTop: '20px', width: '60%', alignSelf: 'center', boxShadow: ' 0 4px 8px rgba(0, 0, 0, 0.5)',
                            '& .MuiInputLabel-root': {
                                color: 'lightgray', // Cambia 'lightgray' por el color que prefieras
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: 'white', // Color del label cuando el TextField está enfocado
                            },
                        }}
                        label="Contraseña"
                        type='password'
                        value={Contraseña}
                        name='Contraseña'
                        onChange={OnInputchange}
                        error={ContraseñaValid !== null && enviado ? true : false}
                        helperText={enviado && ContraseñaValid ? ContraseñaValid : ""}
                    />
                    <div className="button-form">

                        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} xs={8}>
                            <Grid item xs={12} sm={6} >
                                <Button
                                    variant='contained'
                                    type='submit'
                                    fullWidth
                                    className='boton'
                                    sx={{
                                        backgroundColor: 'white',
                                        color: '#333333',
                                        '&:hover': {
                                            backgroundColor: '#333333',
                                            color: 'white',
                                        },
                                    }}
                                >
                                    Login
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6} >
                                <Button
                                    variant='contained'
                                    onClick={google}
                                    fullWidth
                                    className='boton'
                                    sx={{
                                        backgroundColor: 'white',
                                        color: '#333333',
                                        '&:hover': {
                                            backgroundColor: '#333333',
                                            color: 'white',
                                        },
                                    }}
                                >
                                    <Google /><Typography sx={{ ml: 1 }}>Google</Typography>
                                </Button>
                            </Grid>

                            <Grid container direction='row' justifyContent='end' sx={{ mt: 2 }} xs={12}>
                                <Link variant='button' component={LinkRouter} to='/auth/register' color='inherit'>
                                    Crear una cuenta
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </form>
            </div>
        </AuthLayout>

    )
}
