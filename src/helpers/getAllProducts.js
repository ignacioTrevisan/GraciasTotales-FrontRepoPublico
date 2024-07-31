import { getDocs, collection } from 'firebase/firestore';
import { FireBaseDB } from '../firebase/config';

export const OnGetAllProducts = async () => {
    const collectionRef = collection(FireBaseDB, 'productos');
    const docs = await getDocs(collectionRef);
    const products = [];

    docs.forEach(doc => {
        products.push({ ...doc.data(), id: doc.id });
    })
    return products;
}