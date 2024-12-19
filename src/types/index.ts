import { InferOutput, object, string } from "valibot";

//Schemas - valibot
export const LoginUserSchema = object({
    us_email: string(),
    us_password: string()
})

export const RegisterUserSchema = object({
    us_email: string(),
    us_password: string(),
    us_ci: string(),
    us_name: string(),
    us_lastname: string(),
    us_address: string(),
    us_phone: string(),
})


//Types
export type LoginUser = InferOutput<typeof LoginUserSchema>
export type RegisterUser = InferOutput<typeof RegisterUserSchema>