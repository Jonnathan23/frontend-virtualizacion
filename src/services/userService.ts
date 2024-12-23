import { safeParse } from "valibot"
import { LoginUser, LoginUserSchema, RegisterUserSchema } from "../types"
import axios from "axios"
//import axios from "axios"


type ProductData = {
    [k: string]: FormDataEntryValue
}

const saveInLocalStorage = (user: LoginUser) => {
    localStorage.setItem('email', user.email)
    localStorage.setItem('password', user.contrasenia)
}

export const signUpUser = async (data: ProductData) => {
    try {
        const result = safeParse(RegisterUserSchema, {
            nombre: data.name as string,
            apellido: data.lastname as string,
            tipo_sangre: data.blood as string,
            email: data.email as string,
            contrasenia: data.password as string,
        });

        if (!result.success) {
            throw new Error('Datos inválidos');
        }

        if (data.password !== data.confirm_password) {
            throw new Error('Las contraseñas no coinciden');
        }

        const url = `${import.meta.env.VITE_API_URL}/crear_persona/`;

        const response = await axios.post(url, {
            nombre: result.output.nombre,
            apellido: result.output.apellido,
            tipo_sangre: result.output.tipo_sangre,
            email: result.output.email,
            contrasenia: result.output.contrasenia,
        });

        // Verifica respuesta del servidor
        if (response.status !== 200 || response.data.status === 'error') {
            throw new Error(response.data.message || 'Error desconocido en el servidor');
        }

        return { success: true, data: response.data };
    } catch (error: any) {
        
        if (axios.isAxiosError(error) && error.response) {
            const { status, data } = error.response;
            if (status === 401 || status === 404) {
                return { success: false, error: data.error }; // Error controlado del backend
            }
        }
        return { success: false, error: error.message || 'Error desconocido' };
    }
}

export const loginUser = async (data: ProductData) => {
    const result = safeParse(LoginUserSchema, {
        email: data.email as string,
        contrasenia: data.password as string,
    })

    console.log('result')
    console.log(result)

    if (result.success) {

        const url = `${import.meta.env.VITE_API_URL}/login/`
        try {
            const response = await axios.post(url, {
                email: result.output.email,
                contrasenia: result.output.contrasenia,
            })

            if (response.status === 200) {
                const user: LoginUser = result.output;
                saveInLocalStorage(user);

                return { success: true, data: response.data };
            }

        } catch (error) {

            if (axios.isAxiosError(error) && error.response) {
                const { status, data } = error.response;
                if (status === 401 || status === 404) {
                    return { success: false, error: data.error }; // Error controlado del backend
                }
            }

            throw new Error('Error al conectarse al servidor');
        }
    } else {
        throw new Error('Datos inválidos')
    }
}