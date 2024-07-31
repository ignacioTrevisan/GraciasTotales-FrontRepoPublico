import React, { useEffect, useMemo } from 'react'
import './sidebar.css'
import { UseUiStore } from '../hooks/useUiStore';
import { Link } from 'react-router-dom';
import { UseAuthSlice } from '../../auth/hooks/useAuthStore';
export const Sidebar = () => {
    const { sidebarOpen, onSidebarOpen, onSidebarClose } = UseUiStore();
    const { user, points, startlogOut, canjes } = UseAuthSlice();

    const cantidad = useMemo(() => {
        return canjes.filter(c => c.reclamado === false)
    }, [canjes])

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
                <span>{user.displayName} : {points} puntos</span>
            </button>
            <Link to='/'>
                <button className='btn btn-outline-info btns' onClick={onSidebarClose}>
                    <i className='fas fa-user '></i>
                    &nbsp;
                    &nbsp;
                    <span>Inicio</span>
                </button>
            </Link>
            <Link to='/canjes'>

                <button className='btn btn-outline-info btns' onClick={onSidebarClose}>
                    <i className='fas fa-user '></i>
                    &nbsp;
                    &nbsp;
                    <span>Tus canjes ({cantidad.length})</span>
                </button>
            </Link>
            <button className='btn btn-outline-info btns' onClick={onSidebarClose}>
                <i className='fas fa-user '></i>
                &nbsp;
                &nbsp;
                <span>Sobre nosotros</span>
            </button>
            <button className='btn btn-outline-info btns' onClick={salir}>
                <i className='fas fa-user '></i>
                &nbsp;
                &nbsp;
                <span>Salir</span>
            </button>

        </div>
    )
}
