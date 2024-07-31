import React, { useState } from 'react'
import { AuthLayout } from '../layout/authLayout'
import { Button, IconButton, Link, TextField, Typography } from '@mui/material'
import { Facebook, GitHub, Google } from '@mui/icons-material'
import { Link as LinkRouter } from 'react-router-dom'
import { UseForm } from '../../hook/useForm'
import Swal from 'sweetalert2'
import { UseAuthSlice } from '../hooks/useAuthStore'
import { SaveUserFirebase } from '../../graciasTotales/hooks/useUserFirestore'

const formdata = {
    Nombre: '',
    Email: '',
    Contraseña: '',
    ContraseñaRepetida: ''
}
const formValidations = {
    Nombre: [(value) => value.length > 0, 'El nombre es obligatorio'],
    Email: [(value) => (value.includes('@gmail') || value.includes('@hotmail') || value.includes('@outlook')) && value.includes('.'), 'Ingrese un correo electronico valido'],
    Contraseña: [(value) => value.length > 0, 'Ingrese una contrasña'],
    ContraseñaRepetida: [(value) => value.length > 0, 'Ingrese una contrasña']
}
export const RegisterPage = () => {

    const [enviado, setEnviado] = useState(false)
    const {
        Nombre, Email, Contraseña, ContraseñaRepetida, OnInputchange,
        NombreValid, EmailValid, ContraseñaValid, ContraseñaRepetidaValid,
        isFormValid,
    } = UseForm(formdata, formValidations);

    const { startRegisterWithEmailAndPassword, startlogOut, startSignInWithGoogle } = UseAuthSlice();

    const submit = async (event) => {
        setEnviado(true)
        event.preventDefault();
        if (isFormValid) {
            if (Contraseña === ContraseñaRepetida) {
                const datos = await startRegisterWithEmailAndPassword(Email, Contraseña, Nombre);
                const resp = await SaveUserFirebase(datos.uid, datos.DisplayName)
                if (!resp.ok) startlogOut();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: 'Asegurese de que las contraseñas coincidan',
                });
            }
        }
    }
    return (
        <AuthLayout title='Crear cuenta'>

            <div className="containerInput">
                <form onSubmit={submit}>

                    <TextField
                        label="Nombre"
                        sx={{

                            width: '60%',
                            alignSelf: 'center',
                            '& .MuiInputBase-input': {
                                height: '40px',
                                padding: '0 14px',
                                color: 'white',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '14px',
                                lineHeight: '10px',
                                color: 'white'
                            },
                        }}
                        name='Nombre'
                        value={Nombre}
                        onChange={OnInputchange}
                        error={NombreValid !== null && enviado ? true : false}
                        helperText={enviado && NombreValid ? NombreValid : ""}
                    />
                    <TextField
                        label="Email@google.com"
                        sx={{
                            marginTop: '10px',
                            width: '60%',
                            alignSelf: 'center',
                            '& .MuiInputBase-input': {
                                height: '40px',
                                padding: '0 14px',
                                color: 'white',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '14px',
                                lineHeight: '10px',
                                color: 'white'
                            },
                        }}
                        type='email'
                        name='Email'
                        value={Email}
                        onChange={OnInputchange}
                        error={EmailValid !== null && enviado ? true : false}
                        helperText={enviado && EmailValid ? EmailValid : ""}
                    /><TextField
                        label="Contraseña"
                        sx={{
                            marginTop: '10px',
                            width: '60%',
                            alignSelf: 'center',
                            '& .MuiInputBase-input': {
                                height: '40px',
                                padding: '0 14px',
                                color: 'white',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '14px',
                                lineHeight: '10px',
                                color: 'white'
                            },
                        }}
                        name='Contraseña'
                        value={Contraseña}
                        onChange={OnInputchange}
                        type='password'
                        error={ContraseñaValid !== null && enviado ? true : false}
                        helperText={enviado && ContraseñaValid ? ContraseñaValid : ""}
                    /><TextField
                        label="Repita la contraseña"
                        sx={{
                            marginTop: '10px',
                            width: '60%',
                            alignSelf: 'center',
                            '& .MuiInputBase-input': {
                                height: '40px',
                                padding: '0 14px',
                                color: 'white',
                            },
                            '& .MuiInputLabel-root': {
                                fontSize: '14px',
                                lineHeight: '10px',
                                color: 'white'
                            },
                        }}
                        name='ContraseñaRepetida'
                        value={ContraseñaRepetida}
                        onChange={OnInputchange}

                        error={ContraseñaRepetidaValid !== null && enviado ? true : false}
                        helperText={enviado && ContraseñaRepetidaValid ? ContraseñaRepetidaValid : ""}
                        type='password'
                    /><div className="button-form">
                        <div>
                            <Button
                                variant='contained'
                                fullWidth
                                type='submit'
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
                                <Google /><Typography sx={{ ml: 1 }}>Registrar</Typography>
                            </Button>
                        </div>

                    </div>
                    <div className="icon-form" >

                    </div>
                </form>
            </div>
            <p style={{ position: 'absolute', right: '0px', bottom: '0px' }}>¿Ya tienes cuenta? <Link component={LinkRouter} to='/auth/login' color='inherit'>Iniciar sesión </Link></p>
        </AuthLayout >
    )
}
