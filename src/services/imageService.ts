import axios from "axios"
import { safeParse } from "valibot"
import { AllImagesSchema, DraftImageSchema } from "../types"

interface ImageData {
    [k: string]: FormDataEntryValue
}

export async function uploadImage(data: ImageData) {
    try {

        console.log(data.email)
        console.log(data.contrasenia)
        console.log(data)

        const result = safeParse(DraftImageSchema, {
            email: data.email as string,
            contrasenia: data.contrasenia as string,
            archivo: data.file as File,
            titulo: data.title as string,
            descripcion: data.description as string
        })
        console.log(result)
        if (result.success) {
            console.log('Imagen subida correctamente')
        }

    } catch (error) {
        throw new Error('Hubo un error')
    }
}

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