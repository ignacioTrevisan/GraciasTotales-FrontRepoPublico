import { graciasTotalesApi } from "../../api/gt";

export const UsePoints = () => {
    const startLoadPoints = async (points) => {
        console.log(points)
        try {
            const { data } = await graciasTotalesApi.post('/points/crear', { cantidad: points.puntos, codigo: points.codigo });
            console.log(data);
            return {
                ok: true
            }

        } catch (error) {
            console.log(error)
            return {
                ok: false,
                error
            }
        }
    }

    const startLoadAllPoints = async () => {
        try {
            const { data } = await graciasTotalesApi.get('/points/ver', {});
            return {
                ok: true,
                data,
            }
        } catch (error) {
            console.log(error)
            return {
                ok: false,
                error
            }
        }
    }

    return {
        startLoadPoints,
        startLoadAllPoints
    }
}