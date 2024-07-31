import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { FireBaseDB } from "../../firebase/config";



export const SaveUserFirebase = async (uid, displayName) => {
    const documento = {
        uid, displayName
    };
    console.log(documento)
    try {
        const docRef = doc(FireBaseDB, "usuarios", uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {

            await setDoc(docRef, documento);

            return { ok: true };
        } else {

            return {
                ok: true,
                datos: docSnap.data(),
            };
        }
    } catch (error) {
        console.error("Error creando documento:", error);
        return { ok: false, error: error.message };
    }
};


export const loadUserFirebase = async () => {
    const collectionRef = collection(FireBaseDB, `/usuarios`);
    const docs = await getDocs(collectionRef);
    const notes = [];
    docs.forEach(doc => {
        notes.push({ id: doc.id, displayName: doc.data().displayName });
    });
    return notes;
}


export const loadLotteryUser = async () => {
    const collectionRef = collection(FireBaseDB, `/sorteo`);
    const docs = await getDocs(collectionRef);
    const notes = [];
    docs.forEach(doc => {
        notes.push({ displayName: doc.data().instagram, telefono: doc.data().numero });
    });
    return notes;
}