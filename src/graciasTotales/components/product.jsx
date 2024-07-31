import { Dialog, DialogContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { UseAuthSlice } from '../../auth/hooks/useAuthStore';
import './products.css'
import { UseCanjesStore } from '../hooks/useCanjesStore';
import { UseProducts } from '../hooks/useProducts';
import { UseUiStore } from '../hooks/useUiStore';

export const Product = ({ product }) => {

    const { user, points, startPutPoints, startGetCanjes, modo } = UseAuthSlice();
    const { startDeleteProduct } = UseProducts();
    const { onLoadModalOpen, onLoadModalclose } = UseUiStore();


    const [imagen, setImagen] = useState({
        valor: 0,
        activo: false
    })

    const hola = () => {
        return true;
    }


    const showLeft = () => {
        setImagen({ activo: false, valor: imagen.valor - 1 })
    }
    const showRight = () => {
        setImagen({ activo: false, valor: imagen.valor + 1 })
    }



    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success btn-spacing",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    const { startUploadCanje } = UseCanjesStore();


    const confirmCanje = async () => {

        if (modo === 'cliente') {

            onLoadModalOpen();
            const res = await startUploadCanje({ uid: user.uid, idProducto: product.id, reclamado: false, titulo: product.titulo });
            if (!res.ok) {
                swalWithBootstrapButtons.fire({
                    title: "Error",
                    text: "Ocurrio un error, por favor, vuelva a intentarlo mas tarde :(",
                    icon: "warning"
                });
                return;
            }

            const restaPuntos = await startPutPoints({ uid: user.uid, cantidad: product.valor, tipo: "resta" });

            // if !restaPuntos.ok mandar Email de error

            if (res.ok && restaPuntos.ok) {

                swalWithBootstrapButtons.fire({
                    title: "¡Canjeado!",
                    text: 'Felicidades, tu producto fue agregado a la sección "tus canjes", mostrale eso al encargado',
                    icon: "success"
                });
                startGetCanjes(user.uid);
            } else {
                swalWithBootstrapButtons.fire({
                    title: "Error",
                    text: "Ocurrio un error, por favor, vuelva a intentarlo mas tarde :(",
                    icon: "warning"
                });
            }
            onLoadModalclose();

        } else {
            onLoadModalOpen();
            startDeleteProduct(product.id);
            onLoadModalclose();
        }
    }
    const canjear = async () => {



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
                confirmCanje();
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


    return (

        <>

            <div className="product animate__animated animate__fadeIn ">
                <div className="product_image">
                    <img src={product.Imagenes[imagen.valor]} onClick={() => setImagen({ ...imagen, activo: true })} />
                    {
                        imagen.valor !== 0
                            ?
                            <button className='arrow_botton left '>
                                <i className="fas fa-angle-left" onClick={showLeft} ></i>
                            </button>
                            : <>
                            </>
                    }
                    {
                        imagen.valor + 1 < product.Imagenes.length
                            ?
                            <button className='arrow_botton' id='derecha' >
                                <i className="fas fa-angle-right" onClick={showRight}></i>
                            </button>
                            :
                            <></>

                    }
                </div>
                <div className="product_description">
                    <p>{product.titulo}</p>
                    <p>Valor: {product.valor}</p>
                    <button type="button" className={`btn btn-outline bontonBlanco ${Number(points) >= Number(product.valor) || user.modo === 'admin' ? '' : 'disabled'}`} onClick={canjear} >{user.modo === 'admin' ? 'Quitar' : 'Canjear'}</button>

                </div>
            </div>
            <Dialog open={imagen.activo} onClose={() => setImagen({ ...imagen, activo: false })} >
                <DialogContent>

                    <img src={product.Imagenes[imagen.valor]}
                        alt="Imagen ampliada"
                        style={{ width: '800px', height: 'auto' }} />

                </DialogContent>
            </Dialog>
        </>
    )
}
