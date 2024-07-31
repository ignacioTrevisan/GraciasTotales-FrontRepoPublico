import React, { useEffect } from 'react'
import { Link as LinkRouter, useParams } from 'react-router-dom'
import { UseAuthSlice } from '../../auth/hooks/useAuthStore';
import { Link } from '@mui/material';
import Swal from 'sweetalert2';
import { Navbar } from '../ui/navbar';
import { AddAtLlotery, deleteCode, verifyCode } from '../helpers/addAtLlotery';
import { OnGetAllProducts } from '../../helpers/getAllProducts';

export const PutPoints = () => {


    const { startPutPoints, status, user, setPointsUser, startGetPoints } = UseAuthSlice();


    const getdata = async () => {
        let data = await startGetPoints(user.uid);
        setPointsUser(data.cantidad);
    }

    useEffect(() => {
        if (status === 'Authenticated') {

            //Se traen los productos disponibles para canjear
            OnGetAllProducts();
            //Cargo puntos de usuario
            getdata();
        }

    }, [])

    const params = useParams();
    console.log(user.uid);

    const pedirInstagramTelefono = async (value) => {

        const enviar = async (numero, instagram) => {
            const resp = await AddAtLlotery(numero, instagram);
            if (value !== 'yaHuboComprajaZOLS3pN2ccUQAx1HsZ') {
                await deleteCode(value);
            }
            if (resp.ok) {
                Swal.fire({
                    title: "Anotado correctamente",
                    text: '¡Fuiste anotado al sorteo correctamente!',
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Ups...",
                    text: resp.msg,
                    icon: "warning"
                });
            }
        }


        Swal.fire({
            title: "Ingrese su Instagram y número de teléfono para participar de nuestro sorteo mensual",
            html:
                '<input id="swal-input1" class="swal2-input" placeholder="Instagram">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Número de teléfono">' +
                '<div id="extra-link-container" style="margin-top: 20px; display: none;" >' +
                '<p id="extra-link" style="text-decoration:underline; cursor:pointer;"></p>' + // Enlace para mostrar
                '</div>',
            focusConfirm: false,
            confirmButtonText: "Confirmar",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const input1 = document.getElementById('swal-input1').value;
                const input2 = document.getElementById('swal-input2').value;

                if (!input1 || !input2) {
                    Swal.showValidationMessage('Por favor, rellene ambos campos');
                    return;
                }

                localStorage.setItem('instagram', input1);
                localStorage.setItem('telefono', input2);

                enviar(input2, input1);
            },
            didOpen: () => {
                const input1 = document.getElementById('swal-input1');
                const input2 = document.getElementById('swal-input2');
                const extraLinkContainer = document.getElementById('extra-link-container');
                const extraLink = document.getElementById('extra-link');

                const cachedInstagram = localStorage.getItem('instagram');
                const cachedTelefono = localStorage.getItem('telefono');

                if (cachedInstagram && cachedTelefono) {
                    extraLink.innerHTML = `Usar ${cachedInstagram} y ${cachedTelefono}`;
                    extraLinkContainer.style.display = 'block';
                }

                function updateExtraLink() {


                    if (cachedTelefono && cachedTelefono) {
                        extraLink.innerHTML = `Usar ${cachedInstagram} y ${cachedTelefono}`;
                        extraLinkContainer.style.display = 'block';
                    } else {
                        extraLinkContainer.style.display = 'none';
                    }
                }




                extraLink.addEventListener('click', () => enviar(localStorage.getItem('instagram'), localStorage.getItem('telefono')));

                updateExtraLink();
            }
        });
    };
    const probando = () => {
        console.log('probnaod');
    }
    const confirmarCodigoParaSorteo = async (codigo) => {
        const resp = await verifyCode(codigo);
        if (resp === true) {
            pedirInstagramTelefono(codigo);
        } else {
            Swal.fire({
                title: "¡Ups...!",
                text: 'El codigo ingresado no es correcto, por favor, vuelva a intentarlo',
                icon: "warning",
                confirmButtonText: 'OK'
            }).then(() => {
                pediCodigoParaSorteo();
            });
        }
    }

    const pediCodigoParaSorteo = () => {
        Swal.fire({
            title: "Pidale el codigo de confirmación al encargado",
            input: "text",
            inputAttributes: {
                autocapitalize: "off"
            },
            confirmButtonText: "Confirmar",
            showLoaderOnConfirm: true,
            preConfirm: (value) => {
                if (!value) {
                    Swal.showValidationMessage(
                        'Debe ingresar un código para continuar'
                    );
                }
                return value;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                confirmarCodigoParaSorteo(result.value)
            }
        });
    }


    if (params.points === 'sorteo') {
        pediCodigoParaSorteo();
    } else {
        if (status === 'Authenticated') {
            const body = {
                uid: user.uid,
                cantidad: params.points,
                tipo: 'suma'
            }
            Swal.fire({
                title: "Pidale el codigo de confirmación al encargado",
                input: "text",
                inputAttributes: {
                    autocapitalize: "off"
                },

                confirmButtonText: "Confirmar",
                showLoaderOnConfirm: true,
                preConfirm: async () => {

                },

            }).then((result) => {
                if (result.isConfirmed) {

                    confirmar({ body, value: result.value })

                }
            });

        } else {
            Swal.fire({
                title: "¡Ups...!",
                text: 'Para agregar puntos a tu cuenta es necesario que inicies sesión!',
                icon: "warning",
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = 'http://localhost:5173/auth/login';
                }
            });
        }

    }

    const confirmar = async ({ body, value }) => {
        const data = await startPutPoints(body, value)
        if (data.ok) {
            console.log("ok")
            Swal.fire({
                title: "¡Canjeado!",
                text: 'Felicidades, los puntos fueron agreados correctamente a tu cuenta!',
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    pedirInstagramTelefono('yaHuboComprajaZOLS3pN2ccUQAx1HsZ');
                }
            })
        }
    }



    return (
        <>
            <Navbar />
            <p style={{ position: 'absolute', right: '0px', bottom: '0px' }}>¿Aún no tienes cuenta? <Link component={LinkRouter} to='/home' color='inherit'>Registrate </Link></p>
        </>
    )
}
