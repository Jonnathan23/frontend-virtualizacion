import { array, file, InferOutput, object, string } from "valibot";

//Schemas - valibot
export const LoginUserSchema = object({
    email: string(),
    contrasenia: string()
})

export const RegisterUserSchema = object({
    nombre: string(),
    apellido: string(),
    tipo_sangre: string(),
    email: string(),
    contrasenia: string()
})

export const DraftImageSchema = object({
    email: string(),
    contrasenia: string(),
    archivo: file(),
    titulo: string(),
    descripcion: string()
})

export const ImageSchema = object({
    id: string(),
    titulo: string(),
    descripcion: string(),
    url: string(),
    fecha_subida: string()
})

export const AllImagesSchema = array(ImageSchema)

//Types
export type LoginUser = InferOutput<typeof LoginUserSchema>
export type RegisterUser = InferOutput<typeof RegisterUserSchema>
export type Image = InferOutput<typeof ImageSchema>
export type DraftImageSchema = InferOutput<typeof DraftImageSchema>