import React, { useEffect } from 'react'
import { UseAuthSlice } from '../../auth/hooks/useAuthStore';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from '../ui/navbar';
import { UseProducts } from '../hooks/useProducts';
import { ClientRoutes } from './clientRoutes';
import { AdminRoutes } from './adminRoutes';
import { Sidebar } from '../ui/sidebar';
import { UseUiStore } from '../hooks/useUiStore';
import { SidebarAdmin } from '../ui/sidebarAdmin';
import { SaveUserFirebase } from '../hooks/useUserFirestore';

export const GraciasRoutes = () => {


    const { user, setPointsUser, startGetPoints, startGetCanjes, startlogOut } = UseAuthSlice();


    const { getProducts, products } = UseProducts();
    const { onSidebarOpen, onSidebarClose, onLoadModalOpen, onLoadModalclose } = UseUiStore();

    //Funcion para cargar puntos
    const getdata = async () => {
        console.log(user.uid)
        let data = await startGetPoints(user.uid);
        setPointsUser(data.cantidad);
    }

    useEffect(() => {

        iniciar();

    }, [])
    const iniciar = async () => {
        try {
            onLoadModalOpen();
            // Se traen los productos disponibles para canjear
            await getProducts();

            // Cargo puntos de usuario
            await getdata();
            // Obtengo los canjes del usuario
            await startGetCanjes(user.uid);
        } catch (error) {
            console.error("Error durante la inicialización:", error);
        } finally {
            onLoadModalclose();
        }
    }

    //Funcion para cargar el usuario a la base de datos de firebase



    useEffect(() => {
        if (products.length > 0) {
            //Se buscan los canjes del usuario
            startGetCanjes(user.uid);
        }
    }, [products])





    return (
        <>

            {user.modo === 'admin'
                ?
                <>
                    <SidebarAdmin />

                    <Routes>

                        <Route
                            path='/*'
                            element={<AdminRoutes />}
                        />
                    </Routes>

                </>
                :
                <>

                    <Sidebar />

                    <Navbar onSidebarOpen={onSidebarOpen} />
                    <Routes>

                        <Route path='/*' element={<ClientRoutes onSidebarClose={onSidebarClose} />} />

                    </Routes>
                </>
            }

        </>
    )
}
