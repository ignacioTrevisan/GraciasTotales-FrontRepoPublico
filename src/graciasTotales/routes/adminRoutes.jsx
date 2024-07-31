import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AddPoints } from '../pages/addPoints'
import { NavbarAdmin } from '../ui/navbarAdmin'
import { Home } from '../pages'
import { QueryPage } from '../pages/queryPage'
import { useDispatch } from 'react-redux'
import { add } from '../../store/customer/customerSlice'
import { loadUserFirebase } from '../hooks/useUserFirestore'
import { UseUiStore } from '../hooks/useUiStore'
import { Sidebar } from '../ui/sidebar'
import { Llottery } from '../pages/lottery'

export const AdminRoutes = () => {
    const { onSidebarOpen } = UseUiStore();
    const dispatch = useDispatch();
    const cargaInicial = async () => {
        const lista = await loadUserFirebase();
        dispatch(add(lista));
    }
    useEffect(() => {
        cargaInicial();
    }, [])

    return (
        <>
            <NavbarAdmin onSidebarOpen={onSidebarOpen} />
            <Routes>
                <Route path='/' element={<Home />} />

                <Route path='/puntos' element={<AddPoints />} />
                <Route path='/sorteo' element={<Llottery />} />
                <Route path='/consulta' element={<QueryPage />} />
                <Route path='/*' element={<Navigate to='/' />} />
            </Routes>
        </>
    )
}
