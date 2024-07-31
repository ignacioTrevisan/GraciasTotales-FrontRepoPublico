import React, { useEffect, useState } from 'react'
import { AutocompleteItem } from '../components/autoComplete'
import './queryPage.css'
import 'animate.css';
import { Box, Typography } from '@mui/material';
import { UseUiStore } from '../hooks/useUiStore';
import Swal from 'sweetalert2';
import { UseAuthSlice } from '../../auth/hooks/useAuthStore';
import { useSelector } from 'react-redux'; // Importa useSelector

export const QueryPage = () => {
    const { queryOpen } = UseUiStore();
    const { startAlterCanjeWithId } = UseAuthSlice();
    const canjes = useSelector(state => state.auth.canjes); // Selecciona los canjes del estado de Redux

    const [user, setUser] = useState({
        displayName: '',
        uid: '',
        puntos: 0,
        sorteo: false,
        canjes: [],
    });
    const [tamaño, setTamaño] = useState(0)
    useEffect(() => {
        setUser(prevUser => ({
            ...prevUser,
            canjes
        }));

    }, [canjes]);

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success btn-spacing",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    const marcarReclamado = async (id) => {
        swalWithBootstrapButtons.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Continuar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                confirmarModificacion(id);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Se canceló la acción correctamente",
                    icon: "success"
                });
            }
        });
    }

    const confirmarModificacion = async (id) => {
        const resp = await startAlterCanjeWithId(id);
        if (resp.ok === true) {
            swalWithBootstrapButtons.fire({
                title: "¡Modificado!",
                text: 'El estado del canje fue modificado exitosamente',
                icon: "success"
            });
        } else {
            swalWithBootstrapButtons.fire({
                title: "¡Ups... :(",
                text: 'Ha ocurrido un error, vuelve a intentarlo más tarde',
                icon: "warning"
            });
        }
    }

    return (
        <div className="containerQuery animate__animated animate__fadeIn" >
            <Box sx={{ position: 'absolute', zIndex: '40', top: '120px' }} className={`${queryOpen === true ? 'animate__animated animate__fadeIn animate__delay-1s dos' : ''}`}>
                <AutocompleteItem setUser={setUser} user={user} />
            </Box>
            <Box className={`userContainer ${queryOpen === true ? 'flexedQuery' : ''}`}>
                <Box component="ul">
                    {queryOpen === true &&
                        <div className='animate__animated animate__fadeIn animate__delay-1s uno' >
                            <Typography variant="h5" component="li" sx={{ fontSize: '34px', marginBottom: '10px' }}>
                                <strong>Nombre de usuario:</strong>  <span style={{ textDecoration: 'underline' }}>{user.displayName}</span>
                            </Typography>
                            <Typography variant="h6" component="li" sx={{ fontSize: '34px', marginBottom: '10px' }}>
                                <strong>Identificador:</strong> <span style={{ textDecoration: 'underline' }}>{user.uid}</span>
                            </Typography>
                            <Typography variant="h6" component="li" sx={{ fontSize: '34px', marginBottom: '10px' }}>
                                <strong>Puntos de usuario:</strong> <span style={{ textDecoration: 'underline' }}>{user.puntos}</span>
                            </Typography>
                            <Typography variant="h6" component="li" sx={{ fontSize: '34px', marginBottom: '10px' }}>
                                <strong>Participa de sorteo:</strong> <span style={{ textDecoration: 'underline' }}>No</span>
                            </Typography>
                            <Typography variant="subtitle1" component="li" sx={{ fontSize: '34px', marginBottom: '10px' }}>
                                <strong>Canjes:</strong>
                            </Typography>
                            <Box component="ul">
                                {user.canjes.length > 0 ? user.canjes.map((canje) => (
                                    <Typography component="li" key={canje.id}>
                                        <strong>Título:</strong> {canje.titulo} - <strong>ID:</strong> {canje.id} - <strong>Reclamado:</strong> {canje.reclamado ? 'Sí' : 'No'} {!canje.reclamado ? <button className='btn btn-outline-info' id='marcarComoReclamado' onClick={() => marcarReclamado(canje.id)}> <i className="fa-solid fa-check" style={{ color: '#17a2b8' }}>    &nbsp;</i>Marcar como reclamado </button> : <></>}
                                    </Typography>
                                ))
                                    : <Typography>Ninguno</Typography>
                                }
                            </Box>
                        </div >
                    }
                </Box>
            </Box>
        </div>
    )
}
