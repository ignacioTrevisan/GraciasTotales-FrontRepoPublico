import React, { useEffect, useState } from 'react';
import './canjePage.css';
import { UseAuthSlice } from '../../auth/hooks/useAuthStore';
import './canjesPages.css';
import { Canje } from '../components/canje';
import { ArrowBackIos, ArrowBackIosNew, ArrowCircleLeft, ArrowForward, ArrowForwardIos } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export const CanjesPage = () => {
    const { canjes } = UseAuthSlice();
    const [paginacion, setPaginacion] = useState(0);


    const [width, setWidth] = useState(window.innerWidth);




    useEffect(() => {
        const container = document.getElementById('containerCanje');

        const products = document.querySelectorAll('.canjeProduct');
        setWidth(container.clientWidth);

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            threshold: [0.5]
        });

        products.forEach(product => {
            observer.observe(product);
        });


        return () => {
            products.forEach(product => {
                observer.unobserve(product);
            });
        };
    }, []);

    const scrollDerecha = () => {

        const container = document.getElementById('containerCanje');
        if (container) {
            container.scrollBy({
                left: container.clientWidth,
                behavior: 'smooth'
            });

            setWidth(container.clientWidth);
            setPaginacion(paginacion + 1);
        }
    };

    const scrollIzquierda = () => {
        const container = document.getElementById('containerCanje');
        if (container) {
            container.scrollBy({
                left: -container.clientWidth,
                behavior: 'smooth'
            });
            setWidth(container.clientWidth);

            setPaginacion(paginacion - 1);
        }
    };


    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>


            <IconButton sx={{ color: 'black', position: 'absolute', display: `${paginacion > 0 ? 'flex' : 'none'}`, left: `calc(50% - ${width / 2}px)`, transform: 'translateX(-100%)' }} onClick={scrollIzquierda}>
                <ArrowBackIosNew className='flechas' sx={{ fontSize: '90px', zIndex: '90', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }} />
            </IconButton>



            <div id="containerCanje" style={{ display: 'flex', overflowX: 'auto' }}>
                {canjes.map((c, index) => (
                    <div key={index} className="canjeProduct">

                        <Canje c={c} />
                    </div>
                ))}
            </div>

            {
                paginacion < canjes.length - 1 && <IconButton sx={{ color: 'black', position: 'absolute', left: `calc(50% + ${width / 2}px)` }} onClick={scrollDerecha}>
                    <ArrowForwardIos className='flechas' sx={{ fontSize: '90px', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%' }} />
                </IconButton>
            }

        </div >
    );
};
