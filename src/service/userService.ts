import { safeParse } from "valibot"
import { LoginUserSchema, RegisterUserSchema } from "../types"
import axios from "axios"


type ProductData = {
    [k: string]: FormDataEntryValue
}

export const signUpUser = async (data: ProductData) => {
    try {

        const result = safeParse(RegisterUserSchema, {
            us_email: data.us_email as string,
            us_password: data.us_password as string,
            us_ci: data.us_ci as string,
            us_name: data.us_name as string,
            us_lastname: data.us_lastname as string,
            us_address: data.us_address as string,
            us_phone: data.us_phone as string
        })

        console.log(result)
        if (result.success) {
            console.log('Registrado correctamente')

            /**
             * TODO:
                const url = `${import.meta.env.VITE_API_URL}/users`
                const response = await axios.post(url, {
                    us_email: result.output.us_email,
                    us_password: result.output.us_password,
                    us_ci: result.output.us_ci,
                    us_name: result.output.us_name,
                    us_lastname: result.output.us_lastname,
                    us_address: result.output.us_address,
                    us_phone: result.output.us_phone
            })
            
            
            
            if (response.data.status === 'error') {
                throw new Error(response.data.message);
            }
            
            const data = response.data
            
            console.log(data);
            */


            return true
        } else {
            throw new Error('Datos inválidos')
        }
    } catch (error) {
        console.log(error)
    }
}

export const loginUser = async (data: ProductData) => {
    const result = safeParse(LoginUserSchema, {
        us_email: data.us_email as string,
        us_password: data.us_password as string,
    })

    console.log('result')
    console.log(result)

    if (result.success) {
        console.log('Logeado exitosamente')

        /**
         * TODO:
            const url = `${import.meta.env.VITE_API_URL}/users`
            const response = await axios.post(url, {
                    us_email: result.output.us_email,
                    us_password: result.output.us_password,
            })
            
            
            
            if (response.data.status === 'error') {
                throw new Error(response.data.message);
            }
            
            const data = response.data
            
            console.log(data);
        */

        return true
    } else {
        throw new Error('Datos inválidos')
    }
}