import React from 'react'
import { UseCanjesStore } from '../hooks/useCanjesStore';
import Swal from 'sweetalert2';
import { UseProducts } from '../hooks/useProducts';

export const Canje = ({ c }) => {

    const { startLoadCanjeWithId } = UseCanjesStore();
    const { selectProduct } = UseProducts();
    const productoFind = selectProduct(c.idProducto);
    c = {
        ...c,
        producto: productoFind
    }
    const newTitle = (title) => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title
    }

    const verComprobante = async () => {
        try {

            const { data } = await startLoadCanjeWithId(c.id);
            const { id, reclamado } = data.busqueda

            const linea1 = `Id: ${id}`
            const linea2 = `Reclamado: ${reclamado ? 'Si' : 'No'}`
            console.log(data);
            Swal.fire({
                title: data.busqueda.titulo,
                html: `${linea1}<br>${linea2}`,
                imageUrl: c.imagen,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image"
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'El producto no se encuentra disponible para canjear, pruebe más tarde',

            });
        }
    }

    return (
        <>

            <div className="principal">
                <div className="izquierda">
                    <div className="arribaizquierda">
                        <img src={productoFind.Imagenes[0]} alt="" srcset="" />
                    </div>
                    <div className="abajoIzquierda"  >
                        <div className='imagenesChicas'>
                            {productoFind.Imagenes.map((i) =>
                                <div className="imagenes">
                                    <img src={i} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="derechaC">
                    <div className="arriba">
                        <h1>{newTitle(productoFind.titulo)}</h1>

                        <h4>{productoFind.descripcion}</h4>
                    </div>
                    <div className="abajoDerecha" style={{ justifyContent: 'start' }} >
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>

                            {!c.reclamado === true
                                ?
                                <div style={{ display: 'flex' }}>

                                    <span>Estado: </span><span style={{ textDecoration: 'underline', alignSelf: 'start', color: 'white' }}> Listo para reclamar</span>
                                </div>


                                :
                                <div style={{ display: 'flex' }}>
                                    <span>Estado: </span><span style={{ textDecoration: 'underline', alignSelf: 'start' }}>Reclamado</span>
                                </div>



                            }
                            <button className='btn btn-outline but' onClick={verComprobante} >


                                <span>Generar comprobante</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
