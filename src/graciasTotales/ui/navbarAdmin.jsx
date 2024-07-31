import './navbar.css';
import { UseAuthSlice } from '../../auth/hooks/useAuthStore';
import { Link, } from 'react-router-dom';
import { UseUiStore } from '../hooks/useUiStore';


export const NavbarAdmin = ({ onSidebarOpen }) => {


    const { onQueryClose, sidebarOpen } = UseUiStore();


    const { startlogOut, canjes } = UseAuthSlice();



    const abrirSideBar = () => {
        onSidebarOpen();
        console.log("boton de navbar")
    }
    const logout = () => {
        startlogOut();
        onQueryClose();
    }

    return (
        <>
            <div className={`navbar ${sidebarOpen ? 'FadeOut' : ''}`}>
                <div className="derec">
                    <button className='btn btn-outline' style={{ position: 'absolute' }} id='user'>
                        <i className='fas fa-user  '></i>
                        &nbsp;
                        &nbsp;
                        <span>Administrador</span>
                    </button>
                    <button className='btn btn' style={{ alignItems: 'center', display: `${sidebarOpen ? 'none' : ''}` }} id='menu' onClick={abrirSideBar}>
                        <i className='fa-solid fa-bars'></i>
                        &nbsp;
                        &nbsp;

                    </button>
                </div>
                <div className="derecha">

                    <Link to='/' onClick={onQueryClose}>
                        <button className='btn btn-outline' >
                            <i className='fas fa-home'></i>
                            &nbsp;
                            <span>Inicio</span>
                        </button>
                    </Link>
                    &nbsp;

                    <Link to='/puntos' onClick={onQueryClose}>
                        <button className='btn btn-outline' >
                            <i className='fas fa-qrcode   '></i>
                            &nbsp;
                            <span>Generar puntos</span>
                        </button>
                    </Link>
                    &nbsp;
                    <Link to='/consulta'>
                        <button className='btn btn-outline' >
                            <i className='fas fa-heart'></i>
                            &nbsp;
                            <span>Clientes</span>
                        </button>
                    </Link>
                    &nbsp;
                    <Link to='/sorteo'>
                        <button className='btn btn-outline' >
                            <i className='fas fa-gift'></i>
                            &nbsp;
                            <span>Sorteo</span>
                        </button>
                    </Link>
                    &nbsp;

                    <button className='btn btn-outline' onClick={logout} >
                        <i className='fas fa-sign-out-alt'></i>
                        &nbsp;
                        <span>Salir</span>
                    </button>
                </div>
            </div>
        </>
    )
}
