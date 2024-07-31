import React, { useEffect } from 'react'
import './products.css'
import { UseProducts } from '../hooks/useProducts';
import { Product } from './product';
import { UseAuthSlice } from '../../auth/hooks/useAuthStore';
import { UseUiStore } from '../hooks/useUiStore';

export const ProductContainer = () => {
    const { products } = UseProducts();
    const { modo } = UseAuthSlice();
    const { onModalOpen, isNotEditing } = UseUiStore();
    const isModalOpen = () => {
        onModalOpen();
        isNotEditing();
    }
    return (
        <>
            <div className="boxProduct">


                {
                    products.map((p, index) => (
                        p.disponible === true ? (
                            <Product product={p} key={index} />
                        ) : null
                    ))
                }

                {

                }{
                    modo === 'admin'
                        ?
                        < div className="addButon">
                            <i className="fa fa-plus-circle" aria-hidden="true" onClick={isModalOpen}></i>

                        </div>
                        : <>
                        </>
                }
            </div >

        </>
    )
}
