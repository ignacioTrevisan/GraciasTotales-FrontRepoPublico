import React, { useEffect, useState } from 'react';
import { UsePoints } from '../hooks/usePoints';
import Swal from 'sweetalert2';
import './addPoints.css';
import { AddAtLlotery, AddCodeForLlotery, getLloteryCodes } from '../helpers/addAtLlotery';
import { ToastContainer, toast } from 'react-toastify';

export const AddPoints = () => {
    const { startLoadPoints, startLoadAllPoints } = UsePoints();
    const [qrMode, setQrMode] = useState(true);
    const [dataPuntos, setdataPuntos] = useState({ puntos: [] });
    const [isAnimating, setIsAnimating] = useState(false);

    const generarPuntos = (points) => {
        Swal.fire({
            title: "Ingrese un codigo confirmación para el cliente",
            input: "text",
            inputAttributes: {
                autocapitalize: "off"
            },
            customClass: {
                container: 'my-swal-container',
                title: 'my-swal-title',
                content: 'my-swal-content',
                confirmButton: 'my-swal-confirm-button'
            },
            confirmButtonText: "Confirmar",
            showLoaderOnConfirm: true,
            preConfirm: async () => { }
        }).then((result) => {
            if (result.isConfirmed) {
                confirmar({ puntos: points, value: result.value });
            }
        });
    };
    const generarSorteo = () => {
        Swal.fire({
            title: "Ingrese un codigo confirmación para el cliente",
            input: "text",
            inputAttributes: {
                autocapitalize: "off"
            },
            customClass: {
                container: 'my-swal-container',
                title: 'my-swal-title',
                content: 'my-swal-content',
                confirmButton: 'my-swal-confirm-button'
            },
            confirmButtonText: "Confirmar",
            showLoaderOnConfirm: true,
            preConfirm: async () => { }
        }).then((result) => {
            if (result.isConfirmed) {
                ingresarCodigoParaSorteo({ value: result.value });
            }
        });
    };

    const ingresarCodigoParaSorteo = async (value) => {
        const resp = await AddCodeForLlotery(value);
        if (resp.ok === true) {
            Swal.fire({
                title: "¡Genial!",
                text: `Ya se agrego el codigo '${value.value}' y esta disponible para anotarse al sorteo`,
                icon: "success"
            });
        }
    }

    const confirmar = async ({ puntos, value }) => {
        const resp = await startLoadPoints({ puntos, codigo: value });
        if (resp.ok === true) {
            Swal.fire({
                title: "¡Genial!",
                text: `Los ${puntos} puntos ya están disponibles para agregarse, el código es: '${value}'`,
                icon: "success"
            });
        }
    };

    const ingresarManualmente = () => {
        Swal.fire({
            title: "Ingrese su Instagram y número de teléfono ",
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


                const resp = await AddAtLlotery(input2, input1);
                console.log(resp)
                if (resp.ok) {
                    console.log("si")
                    toast.success(`Se agrego correctamente a ${input1}! al sorteo, con el numero de ${input2}.`, {
                        position: "top-center",
                        style: {
                            border: '1px solid #4CAF50',
                            padding: '16px',
                            color: '#4CAF50',
                            borderRadius: '8px',
                        },
                        iconTheme: {
                            primary: '#4CAF50',
                            secondary: '#FFFAEE',
                        },
                    });
                } else {
                    console.log("no")
                    toast.warning(`Ocurrio un error, por favor vuelva a intentarlo`, {
                        position: "top-center",
                        style: {
                            border: '1px solid #AFA24C',
                            padding: '16px',
                            color: '#AFA24C',
                            borderRadius: '8px',
                        },
                        iconTheme: {
                            primary: '#FF0000',
                            secondary: '#FFFAEE',
                        },
                    });
                }
            },

        });
    }

    useEffect(() => {
        const buscar = async () => {
            const { data } = await startLoadAllPoints();
            const info = data.puntos;
            const sorteo = await getLloteryCodes();
            sorteo.map((s) => {
                info.push(s);
            })
            setdataPuntos(info);
            console.log(sorteo)
        };
        buscar();
    }, [qrMode]);

    const handleToggle = () => {
        if (isAnimating) return; // Evitar múltiples clics durante la animación

        const element = document.querySelector('.containerBoxAdmin');
        setIsAnimating(true);

        // Primero, animar opacidad y altura para cerrar
        element.classList.add('collapsed');

        setTimeout(() => {
            // Cambiar qrMode después de la animación de cierre
            setQrMode(!qrMode);

            // Quitar la clase collapsed para reiniciar la altura
            element.classList.remove('collapsed');

            setTimeout(() => {
                // Animar opacidad y altura para abrir después de un pequeño retraso
                setIsAnimating(false);
            }, 100); // Esperar un poco antes de reiniciar la altura
        }, 700); // Tiempo suficiente para completar la animación de cierre
    };

    return (
        <div className="boxAdmin animate__animated animate__fadeIn">
            <h1 style={{ fontFamily: 'Rock Salt, cursive', color: '#333333', fontSize: '24px' }} id='titulo'>Sorteo mensual</h1><ToastContainer />

            <div className="containerBoxAdmin">
                {qrMode ? (
                    < >
                        <h1 style={{ marginBottom: '40px', marginTop: '20px', fontFamily: 'Rock Salt, cursive' }}>Generar QR</h1>
                        <button className='btn btn-outline generateQRDos' onClick={() => generarSorteo()}>
                            <i className='fas fa-qrcode'></i>
                            &nbsp;
                            <span>Solo sorteo</span>
                        </button>
                        <button className='btn btn-outline generateQRDos' onClick={() => generarPuntos(100)}>
                            <i className='fas fa-qrcode'></i>
                            &nbsp;
                            <span>100 puntos</span>
                        </button>
                        <button className='btn btn-outline generateQRDos' onClick={() => generarPuntos(80)}>
                            <i className='fas fa-qrcode'></i>
                            &nbsp;
                            <span>80 puntos</span>
                        </button>
                        <button className='btn btn-outline generateQRDos' onClick={() => generarPuntos(60)}>
                            <i className='fas fa-qrcode'></i>
                            &nbsp;
                            <span>60 puntos</span>
                        </button>
                        <button className='btn btn-outline generateQRDos' onClick={() => generarPuntos(40)}>
                            <i className='fas fa-qrcode'></i>
                            &nbsp;
                            <span>40 puntos</span>
                        </button>
                        <p style={{ textDecoration: 'underline', cursor: 'pointer', position: 'relative', bottom: '0px', marginTop: '20px' }} onClick={handleToggle}>Ver puntos disponibles</p>
                    </>
                ) : (
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
                        <h1 style={{ marginBottom: '40px', position: 'absolute', top: '0px', marginTop: '20px', fontFamily: 'Rock Salt, cursive' }}>Codigos disponibles</h1>
                        {dataPuntos.map((d, index) => (
                            <div style={{ marginTop: '10px' }} key={index}>
                                <li>Cantidad: {d.cantidad}, Código: {d.codigo}</li>
                            </div>
                        ))}
                        <p style={{ textDecoration: 'underline', cursor: 'pointer', position: 'absolute', bottom: '0px' }} onClick={handleToggle}>Generar Qr</p>
                    </div>
                )}
                <div style={{ position: 'absolute', top: '0', left: '0', color: 'white', cursor: 'pointer' }} onClick={ingresarManualmente}>
                    <p>Registrar usuario manualmente al sorteo</p>
                </div>
            </div>
        </div>
    );
};