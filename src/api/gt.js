import axios from "axios";
import { GetEnv } from "../helpers/getEnv";


const { VITE_API_URL } = GetEnv();

export const graciasTotalesApi = axios.create({
    baseURL: VITE_API_URL
})
