import React from 'react'

export const UploadingPhotos = async (files) => {
    const fileUploadPromises = [];
    for (const file of files) {
        fileUploadPromises.push(FilesUpload(file));
    }
    const photoURL = await Promise.all(fileUploadPromises);
    return photoURL
}
export const FilesUpload = async (file) => {

    if (!file) throw new Error('No se encontro ningun archivo para subir');
    const cloudURL = 'https://api.cloudinary.com/v1_1/nachoTrevisan/upload';
    const formData = new FormData();

    formData.append('upload_preset', 'graciasTotales-mern');
    formData.append('file', file);


    try {
        const resp = await fetch(cloudURL,
            {
                method: 'POST',
                body: formData,
            });

        if (!resp.ok) {
            throw new Error('No se pudo subir ninguna imagen');
        } else {
            const cloudResp = await resp.json();

            return cloudResp.secure_url;
        }
    } catch (error) {
        console.log('e', error)
        throw new Error(error.message);
    }
}