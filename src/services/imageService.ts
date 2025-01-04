import { isAxiosError } from "axios"
import { safeParse } from "valibot"
import { AllImagesSchema, DraftImage, DraftImageForm, DraftImageSchema } from "../types"
import api from "../lib/axios";

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
        const response = await api.post('/subir_imagen/', result.output)

        if (response.status === 201) {
            return { success: true, data: response.data };
        }


    } catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            const { status, data } = error.response;
            if (status === 401 || status === 404) {
                return { success: false, error: data.error }; // Error controlado del backend
            }
        }
        throw new Error('Hubo un error')
    }
}

export const getAllImages = async () => {
    try {
        const data = await api.get('/lista_imagenes/');
        const result = safeParse(AllImagesSchema, data.data)

        if (result.success) {
            return result.output
        } else {
            throw new Error('Hubo un error')
        }

    } catch (error) {
        console.log(error)
        if (isAxiosError(error) && error.response) {
            const { status, data } = error.response;
            if (status === 401 || status === 404) {
                return { success: false, error: data.error }; // Error controlado del backend
            }
        }
        throw new Error('Hubo un error')
    }
}