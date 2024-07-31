import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import React from 'react'
import { FireBaseDB } from '../../firebase/config';




export const getLloteryCodes = async () => {
    const collectionRef = collection(FireBaseDB, 'codigosCanjeablesPorSorteo');
    const docs = await getDocs(collectionRef);
    const codigos = [];

    docs.forEach(doc => {
        codigos.push({ ...doc.data(), id: doc.id });
    })
    return codigos;
}

export const AddCodeForLlotery = async ({ value }) => {
    const documento = {
        cantidad: 'sorteo',
        codigo: value
    };
    console.log(value)
    try {
        const docRef = doc(FireBaseDB, "codigosCanjeablesPorSorteo", value);
        await setDoc(docRef, documento);
        console.log("Documento creado con ID:", value);
        return { ok: true, id: value };
    } catch (error) {
        console.error("Error creando documento:", error);
        return { ok: false, error: `Ocurrió un error agregando el documento, por favor, envíale esta captura al dueño` };
    }
}
export const AddAtLlotery = async (numero, instagram) => {
    const documento = {
        instagram,
        numero
    }
    try {
        const docRef = await addDoc(collection(FireBaseDB, "sorteo"), documento);
        console.log("Documento creado con ID:", docRef.id);
        return { ok: true, id: docRef.id };
    } catch (error) {
        console.error("Error creando documento:", error);
        return { ok: false, error: `Ocurrió un error agregando el documento, por favor, envíale esta captura al dueño` };
    }
}
export const verifyCode = async (code) => {
    try {
        console.log(code);

        const docRef = doc(FireBaseDB, "codigosCanjeablesPorSorteo", code);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return true
        } else {
            console.log("El documento no existe.");
            return false
        }
    } catch (error) {
        console.error("Error obteniendo o eliminando el documento:", error);
        return { ok: false, error: error.message };
    }
}

export const deleteCode = async (code) => {
    console.log(code)
    const docRef = doc(FireBaseDB, "codigosCanjeablesPorSorteo", code);
    await deleteDoc(docRef);

}
