import Modal from 'react-modal'
import { CircularProgress, Grid } from '@mui/material'
import React, { useEffect } from 'react'

export const LoadModal = () => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white', // Mismo color que el fondo de la página con opacidad
            color: 'white',
            border: 'none',

        },

    };
    Modal.setAppElement('#root');


    return (
        <Modal
            isOpen={true}
            style={customStyles}
            overlayClassName={'modal-carga'}
            closeTimeoutMS={500}
        >
        </Modal>
    )
}
