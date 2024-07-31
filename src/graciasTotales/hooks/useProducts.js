import { useDispatch, useSelector } from "react-redux";
import { OnGetAllProducts } from "../../helpers/getAllProducts";
import { addProduct, deleteProduct, loadProducts, setActive } from "../../store/products/productsSlice";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { FireBaseDB } from "../../firebase/config";
import { UploadingPhotos } from "../helpers/uploadingPhotos";

export const UseProducts = () => {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products)


    const getProducts = async () => {
        const productos = await OnGetAllProducts();
        dispatch(loadProducts(productos))
    }

    const onSetActive = (payload) => {
        dispatch(setActive(payload))
    }

    const startUploadProduct = async ({ formState, Imagenes }) => {
        console.log(formState)
        const photoURL = await UploadingPhotos(Imagenes);

        const body = {
            Imagenes: photoURL,
            titulo: formState.title,
            valor: formState.value,
            descripcion: formState.description,
            disponible: true,
        };
        const productosRef = collection(FireBaseDB, 'productos');
        const nuevoDocRef = await addDoc(productosRef, body);
        console.log("Documento creado con ID: ", nuevoDocRef.id);
        dispatch(addProduct({ ...body, id: nuevoDocRef.id }))
    }

    const startDeleteProduct = async (id) => {
        const docRef = doc(FireBaseDB, `/productos/${id}`);
        await updateDoc(docRef, {
            disponible: false
        });
        dispatch(deleteProduct(id));
    }
    const selectProduct = (id) => {
        const p = products.find(pr => pr.id === id);
        return p;
    }



    return {
        getProducts,
        startDeleteProduct,
        onSetActive,
        startUploadProduct,
        selectProduct,
        products
    }
}