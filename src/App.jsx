
import { Navigate, Route, Routes } from "react-router-dom";

import { AuthRoutes } from "./auth/routes/authRoutes";
import { GraciasRoutes } from "./graciasTotales/routes/graciasRoutes";
import { UseAuthSlice } from "./auth/hooks/useAuthStore";
import { useEffect } from "react";
import { PutPoints } from "./graciasTotales/pages";
import { LoadModal } from "./graciasTotales/pages/loadModal";



function App() {

  const { checkStatus, status } = UseAuthSlice();

  useEffect(() => {
    checkStatus();
  }, [])







  return (status === 'checking')
    ? <LoadModal />
    :
    <>
      <Routes>
        {status === 'Not-Authenticated' ? (
          <>
            <Route path='/auth/*' element={<AuthRoutes />} />
            <Route path='/*' element={<Navigate to={'/auth'} />} />
          </>
        ) : (
          <>
            <Route path='/*' element={<GraciasRoutes />} />
          </>
        )}
        <Route path='/putPoints/:points' element={<PutPoints />} />

      </Routes>

    </>

}

export default App
