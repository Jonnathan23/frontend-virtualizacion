import axios from "axios"
import { safeParse } from "valibot"
import { AllImagesSchema, DraftImage, DraftImageForm, DraftImageSchema } from "../types"

export async function uploadImage(data: DraftImageForm) {
    try {
        const dataForm: DraftImage = { ...data, email: localStorage.getItem('email') as string, contrasenia: localStorage.getItem('password') as string }
        const result = safeParse(DraftImageSchema, dataForm);

        console.log(result)
        console.log(dataForm)
        if (!result.success) {
            console.log(result.issues);
            throw new Error('Validación fallida');
        }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/subir_imagen/`, result.output, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        if (response.status === 201) {           
            return { success: true, data: response.data };
        }



    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error) && error.response) {
            const { status, data } = error.response;
            if (status === 401 || status === 404) {
                return { success: false, error: data.error }; // Error controlado del backend
            }
        }
        throw new Error('Hubo un error')
    }
}

export const getAllImages = async () => {
    const url = `${import.meta.env.VITE_API_URL}/lista_imagenes/`
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