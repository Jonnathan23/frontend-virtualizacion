import axios from "axios"
import { safeParse } from "valibot"
import { AllImagesSchema } from "../types"


export const getAllImages = async () => {
    const url = `${import.meta.env.VITE_API_URL}/lista_imagenes`
    try {

        const data = await axios.get(url)
        const result = safeParse(AllImagesSchema, data.data)

        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error')
        }

    } catch (error) {

    }
}