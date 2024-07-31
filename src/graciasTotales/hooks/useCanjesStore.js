import { graciasTotalesApi } from "../../api/gt"

export const UseCanjesStore = () => {
    const startUploadCanje = async (body) => {

        try {
            const { data } = await graciasTotalesApi.post('/canjes/crear', { ...body })
            console.log(data);
            if (data.ok) {

                return {
                    ok: true,
                }
            } else {
                console.log(error)
                return {
                    ok: false,
                }
            }
        } catch (error) {

            return {
                ok: false,
            }
        }
    }


    const startLoadCanjeWithId = async (id) => {
        try {
            const { data } = await graciasTotalesApi.post('/canjes/obtenerParticular', { id })
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
        startLoadCanjeWithId,
        startUploadCanje,

    }
}