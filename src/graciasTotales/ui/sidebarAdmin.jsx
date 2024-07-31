import React, { useEffect } from 'react'
import './sidebar.css'
import { UseUiStore } from '../hooks/useUiStore';
import { Link } from 'react-router-dom';
import { UseAuthSlice } from '../../auth/hooks/useAuthStore';
import { Box } from '@mui/material';
export const SidebarAdmin = () => {
    const { sidebarOpen, onSidebarOpen, onSidebarClose } = UseUiStore();
    const { startlogOut } = UseAuthSlice();

    const salir = () => {
        onSidebarClose();
        startlogOut();
    }
    const cerrar = () => {
        onSidebarClose();
    }


    return (


        <div className={`sidebarContainer ${sidebarOpen ? 'flexed' : ''}`}>
            <button className='btn btnsd' style={{ alignItems: 'center', top: '0px' }} onClick={cerrar}>
                <i className='fa-solid fa-bars'></i>
                &nbsp;
                &nbsp;
            </button>

            <button className='btn btn-outline-info btns'>
                <i className='fas fa-user '></i>
                &nbsp;
                &nbsp;
                <span>Admin</span>
            </button>
            <Link to='/'>
                <button className='btn btn-outline-info btns' onClick={onSidebarClose}>
                    <i className='fas fa-home '></i>
                    &nbsp;
                    &nbsp;
                    <span>Inicio</span>
                </button>
            </Link>
            <Link to='/puntos'>

                <button className='btn btn-outline-info btns' onClick={onSidebarClose}>
                    <i className='fas fa-qrcode'></i>
                    &nbsp;
                    &nbsp;
                    <span>Generar puntos</span>
                </button>
            </Link>
            <Link to='/consulta'>
                <button className='btn btn-outline-info btns' onClick={onSidebarClose}>
                    <i className='fas fa-heart '></i>
                    &nbsp;
                    &nbsp;
                    <span>Clientes</span>
                </button>
            </Link>
            <Link to='/sorteo'>
                <button className='btn btn-outline-info btns' >
                    <i className='fas fa-gift'></i>
                    &nbsp;
                    <span>Sorteo</span>
                </button>
            </Link>
            &nbsp;
            <button className='btn btn-outline-info btns' onClick={salir}>
                <i className='fas fa-user '></i>
                &nbsp;
                &nbsp;
                <span>Salir</span>
            </button>

        </div>

    )
}
