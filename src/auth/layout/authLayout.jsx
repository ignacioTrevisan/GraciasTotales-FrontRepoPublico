import React from 'react'
import './layout.css'



export const AuthLayout = ({ children, title = '' }) => {
    return (
        <>
            <div className="box">

                <div className="containerBox">
                    <h1 style={{ marginTop: '20px', color: 'white' }} id='subtitulo'>{title}</h1>
                    {children}
                </div>
            </div>
        </>
    );
}
