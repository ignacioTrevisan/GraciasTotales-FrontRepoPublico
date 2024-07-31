import { useDispatch, useSelector } from "react-redux";
import { LogInWithEmailPassword, RegisterWithEmailPassword, signWitFacebook, signWithGoogle } from "../../firebase/provider";
import { checking, logIn, logOut, putCanjes, setCanjes, setInstagram, setPoints, setTelefono } from "../../store/auth/authSlice";
import { FireBaseAuth } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { graciasTotalesApi } from "../../api/gt";
import { UseProducts } from "../../graciasTotales/hooks/useProducts";

export const UseAuthSlice = () => {

    const dispatch = useDispatch();
    const { user, status, points, canjes, modo } = useSelector(state => state.auth)

    const { products } = UseProducts();
    const startSignInWithGoogle = async () => {
        const data = await signWithGoogle();
        if (data.ok) {
            dispatch(logIn(data.user))
            return data;
        } else {
            dispatch(logOut(data.errorMessage))
        }
    }

    const startSignInWithFacebook = async () => {
        const data = await signWitFacebook();
        if (data.ok) {
            dispatch(logIn(data.user))
        } else {
            dispatch(logOut(data.errorMessage))
        }
    }

    const setPointsUser = (puntos) => {
        dispatch(setPoints(puntos))
    }

    const startlogOut = async () => {
        await FireBaseAuth.signOut();
        dispatch(logOut())
    }
    const checkStatus = () => {
        dispatch(checking());

        onAuthStateChanged(FireBaseAuth, async (user) => {
            if (!user) return dispatch(logOut());
            let modo = 'cliente';
            if (user.email === 'nachotizii988@gmail.com' || user.email === 'admin@gmail.com') {
                modo = 'admin'
            }
            dispatch(logIn({
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
                email: user.email,
                errorMessage: null,
                modo
            }))
        })

        return { status };

    }


    const startPutPoints = async (body, codigo = '66984b741c55041f49095bf8') => {
        console.log(body, codigo)
        try {
            const { data } = await graciasTotalesApi.put('/puntosUsuarios/cargar', { ...body, codigo });
            console.log(data)
            if (data.usuario) {
                dispatch(setPoints(data.usuario.cantidad));
            }
            if (!data.usuario) {
                dispatch(setPoints(data.cantidad));
            }
            return {
                data,
                ok: true
            }

        } catch (error) {

            console.log(error)
            return {
                ok: false
            }
        }
    }
    const startGetPoints = async (uid) => {
        console.log(uid)
        try {
            const { data } = await graciasTotalesApi.post('/puntosUsuarios/obtener', { uid }

            );
            console.log(data);
            return data;

        } catch (error) {


            console.log(error)

        }

    }
    const startGetCanjes = async (uid) => {
        try {
            const { data } = await graciasTotalesApi.post('/canjes/obtenerPorUsuario', {
                uid: uid
            });


            data.busqueda.forEach(element => {
                element.producto = products.find(p => p.id === Number(element.idProducto))
            });
            dispatch(setCanjes(data.busqueda))
            return data;

        } catch (error) {


            console.log(error)

        }
    }



    const startRegisterWithEmailAndPassword = async (Email, Password, DisplayName) => {
        dispatch(checking());
        const resp = await RegisterWithEmailPassword(Email, Password, DisplayName);
        resp.displayName = DisplayName;
        if (resp.ok) {
            dispatch(logIn(resp));
            return {
                uid: resp.uid, DisplayName
            }
        } else {
            dispatch(logOut());
        }
    }

    const startLoginWithEmailAndPassword = async (Email, Password) => {
        dispatch(checking());
        const resp = await LogInWithEmailPassword(Email, Password);
        console.log(resp)
        if (resp.ok) {
            dispatch(logIn(resp));
        } else {
            dispatch(logOut(resp.errorMessage));
        }
    }

    const startAlterCanjeWithId = async (id) => {
        try {
            const { data } = await graciasTotalesApi.put('/canjes/modificar', { id })
            dispatch(putCanjes(id));
            return {
                ok: true,
                data,
            }
        } catch (error) {
            console.log(error)
            return {
                ok: false,
            }
        }
    }



    return {
        startSignInWithGoogle,
        startSignInWithFacebook,
        startRegisterWithEmailAndPassword,
        setPointsUser,
        startlogOut,
        checkStatus,
        startPutPoints,
        startGetPoints,
        startGetCanjes,
        startLoginWithEmailAndPassword,
        startAlterCanjeWithId,
        points,
        user,
        status,
        canjes,
        modo,


    }
}
