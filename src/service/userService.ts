import { safeParse } from "valibot"
import { LoginUserSchema, RegisterUserSchema } from "../types"
//import axios from "axios"


type ProductData = {
    [k: string]: FormDataEntryValue
}

export const signUpUser = async (data: ProductData) => {
    try {

        const result = safeParse(RegisterUserSchema, {
            nombre: data.name as string,
            apellido: data.lastname as string,
            tipo_sangre: data.blood as string,
            email: data.email as string,
            contrasenia: data.password as string,
        })

        console.log(`data.password -> ${data.password}`)
        console.log(`confirm_data.password -> ${data.confirm_password}`)
        console.log(`data.password !== data.confirm_password -> ${data.password !== data.confirm_password}`)
        if (data.password !== data.confirm_password) {
            throw new Error('Las contraseñas no coinciden')
        }

        console.log(result)
        if (result.success) {
            console.log('Registrado correctamente')

            /**
             * TODO:
                const url = `${import.meta.env.VITE_API_URL}/crear_persona/`
                const response = await axios.post(url, {
                    email: result.output.email,
                    password: result.output.password,
                    ci: result.output.ci,
                    name: result.output.name,
                    lastname: result.output.lastname,
                    address: result.output.address,
                    phone: result.output.phone
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
        email: data.email as string,
        contrasenia: data.password as string,
    })

    console.log('result')
    console.log(result)

    if (result.success) {
        console.log('Logeado exitosamente')

        /**
         * TODO:
            const url = `${import.meta.env.VITE_API_URL}/login/`
            const response = await axios.post(url, {
                    email: result.output.email,
                    password: result.output.password,
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