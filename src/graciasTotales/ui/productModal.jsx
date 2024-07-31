import Modal from 'react-modal'
import { UseUiStore } from '../hooks/useUiStore';
import './modal.css'
import { Button, colors, Grid, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import { UseProducts } from '../hooks/useProducts';
import { UseForm } from '../../hook/useForm';
import { useRef, useState } from 'react';

const formData = {
    title: '',
    description: '',
    image: [],
    value: ''
}

const formValidations = {
    title: [(value) => value.length > 0, 'El titulo es obligatorio'],
    value: [(value) => value > 0, 'Ingrese un valor mayor a 0'],
}
export const ProductModal = () => {

    const [Imagenes, setImagenes] = useState([])
    const fileInputRef = useRef();


    const { modalOpen, onModalClose } = UseUiStore();
    const { startUploadProduct, onSetActive } = UseProducts();
    const { title, description, value, image, OnInputchange, formState, titleValid, valueValid, imageValid, isFormValid } = UseForm(formData, formValidations);

    const [formSubmited, setFormSubmited] = useState(false)
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#333333',
            color: 'white'
        },
    };

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success btn-spacing",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    const submit = (event) => {
        setFormSubmited(true);

        event.preventDefault();
        console.log(Imagenes)
        if (!isFormValid) return;
        swalWithBootstrapButtons.fire({
            title: "¿Estás seguro?",
            text: "Este producto estara disponible para canjear",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Continuar",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                confirmarCreacion();
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Canceado",
                    text: "Se cancelo el canje correctamente",
                    icon: "success"
                });
            }
        });

    }

    const confirmarCreacion = async () => {
        console.log(formState)
        await startUploadProduct({ formState, Imagenes });
        Swal.fire({
            title: "¡Subido!",
            text: 'Producto subido correctamente',
            icon: "success"
        });
        onSetActive([]);
        cerrado();
    }

    const cerrado = () => {
        setFormSubmited(false);
        onModalClose();
    }
    const onFileInputChange = ({ target }) => {
        if (target.files.length === 0) return;

        setImagenes(target.files);

    }

    Modal.setAppElement('#root');

    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={cerrado}
            style={customStyles}
            overlayClassName={'modal-fondo'}
            closeTimeoutMS={500}

        >
            <form onSubmit={submit}>
                <div className="formulario">

                    <h1 >Agregar producto</h1>
                    <TextField
                        sx={{ backgroundColor: 'white', width: '70%', marginTop: '50px' }}
                        value={title}
                        name='title'
                        onChange={OnInputchange}
                        error={formSubmited && !!titleValid ? true : false}
                        helperText={formSubmited ? titleValid : ''}
                        label='Titulo de producto'
                    />
                    <TextField
                        sx={{ backgroundColor: 'white', width: '70%', marginTop: '30px' }}
                        value={description}
                        name='description'
                        onChange={OnInputchange}
                        label='Descripcion'
                    />
                    <TextField
                        sx={{ backgroundColor: 'white', width: '70%', marginTop: '30px' }}
                        value={value}
                        name='value'
                        onChange={OnInputchange}
                        error={formSubmited && !!valueValid ? true : false}
                        helperText={formSubmited ? valueValid : ''}
                        label='Valor (en puntos)'
                    />
                    <IconButton onClick={() => fileInputRef.current.click()}>
                        <Typography sx={{ textDecoration: 'underline', fontStyle: 'italic' }}> Adjuntar...</Typography>
                    </IconButton>
                    <div style={{ width: '60%', alignSelf: 'center', backgroundColor: 'white' }}>

                        <Grid container justifyContent={'space-between'}>

                            {Array.from(Imagenes).length > 0 &&
                                Array.from(Imagenes).map((img, index) => (
                                    <Grid item xs={5}>
                                        <IconButton key={index} >
                                            <Typography sx={{ textDecoration: 'underline', fontStyle: 'italic', fontSize: '0.8rem' }}>{img.name}</Typography>
                                        </IconButton>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </div>
                    <input
                        type={'file'}
                        ref={fileInputRef}
                        multiple
                        onChange={onFileInputChange}
                        style={{ display: 'none' }}
                    />
                    <Button sx={{ marginTop: '20px' }} type='submit'>Confirmar</Button>
                </div>
            </form>
        </Modal>
    )
}
