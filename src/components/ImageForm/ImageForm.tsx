import { ChangeEvent, useState } from "react"
import { ActionFunctionArgs, Form, redirect, useActionData } from "react-router-dom"
import styles from './ImageForm.module.css'
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import { uploadImage } from "../../services/imageService"

export async function action({ request }: ActionFunctionArgs) {
    console.log('action welcome')
    const data = Object.fromEntries(await request.formData())
    data.email = localStorage.getItem('email')!
    data.contrasenia = localStorage.getItem('password')!

    let error = ''

    if (Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }

    if (error.length) {
        return error
    }
    await uploadImage(data)

    return redirect('/virtual/welcome')
}



export default function ImageForm() {
    const defaultImage = '../../../public/selectImage.jpg';

    const [imageForm, setImageForm] = useState(defaultImage);
    const error = useActionData() as string;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageForm(URL.createObjectURL(file));
        } else {
            setImageForm(defaultImage);
        }
    };

    return (
        <Form
            method="POST"
            className="form"
        >
            <div className={styles.field__image__container}>
                <img className={styles.field__image} src={imageForm} alt="image_form" />
            </div>

            <div className={styles.field}>
                <label htmlFor="title">Titulo</label>
                <input className={styles.field__text} type="text" name="title" placeholder="Ej. Foto en la playa" />
            </div>

            <div className={styles.field}>
                <label htmlFor="description">Descripcion</label>
                <input className={styles.field__text} type="text" name="description" placeholder="Ej. Foto en la playa en las vacaciones de verano ..." />
            </div>

            <div className={styles.field}>
                <label htmlFor="image">Seleccione imagen</label>
                <input className={styles.field__button} onChange={handleChange} type="file" name="file" id="file" />
            </div>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <input type="submit" value={'Guardar imagen'} />

        </Form>
    )
}