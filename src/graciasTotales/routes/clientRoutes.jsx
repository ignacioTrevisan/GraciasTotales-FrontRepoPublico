import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PutPoints, Home } from '../pages/'
import { LoadModal } from '../pages/loadModal'
import { UseUiStore } from '../hooks/useUiStore'
import { CanjesPage } from '../pages/canjesPage'

export const ClientRoutes = ({ onSidebarClose }) => {
    const { onLoadModal } = UseUiStore();

    return (
        <>
            {onLoadModal
                ?
                <LoadModal />
                :
                <div onClick={onSidebarClose}>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/canjes' element={<CanjesPage />} />
                        <Route path='/putPoints/:points' element={<PutPoints />} />
                        <Route path='/*' element={<Navigate to='/' />} />
                    </Routes>
                </div>
            }
        </>
    )
}
