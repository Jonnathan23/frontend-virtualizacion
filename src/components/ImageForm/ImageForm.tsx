import { ChangeEvent, useState } from "react"

import styles from './ImageForm.module.css'
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import { useForm } from "react-hook-form";
import { DraftImageForm } from "../../types";
import { uploadImage } from "../../services/imageService";


export default function ImageForm() {
    const defaultImage = '../../../public/selectImage.jpg';

    const [imageForm, setImageForm] = useState(defaultImage);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<DraftImageForm>()



    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setImageForm(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
            setImageForm(defaultImage);
        }
    };

    const registerImage = async (data: DraftImageForm) => {
        if (!selectedFile) {
            throw new Error('Hubo un error')
        }

        data.archivo = selectedFile
        await uploadImage(data);

    }

    return (
        <form
            className={styles.form}
            noValidate
            onSubmit={handleSubmit(registerImage)}
        >
            <div className={styles.field__image__container}>
                <img className={styles.field__image} src={imageForm} alt="image_form" />
            </div>

            <div className={styles.cont__field}>
                <div className={styles.container__fields}>
                    <div className={styles.field}>
                        <label htmlFor="titulo">Titulo</label>
                        <input className={styles.field__text} type="text" id="titulo" placeholder="Ej. Foto en la playa"
                            {...register('titulo', {
                                required: "El titulo es requerido"
                            })}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.field__label} htmlFor="archivo">Seleccione imagen</label>
                        <input
                            className={styles.field__file}
                            type="file"
                            id="archivo"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    {errors.titulo && <ErrorMessage>{errors.titulo.message}</ErrorMessage>}
                    {errors.archivo && <ErrorMessage>{errors.archivo.message}</ErrorMessage>}
                </div>
            </div>

            <div className={styles.cont__field}>
                <div className={styles.field}>
                    <label htmlFor="descripcion">Descripcion</label>
                    <input className={styles.field__text} type="text" id="descripcion" placeholder="Ej. Foto en la playa en las vacaciones de verano ..."
                        {...register('descripcion', {
                            required: "La descripcion es requerida"
                        })}
                    />
                </div>
                {errors.descripcion && <ErrorMessage>{errors.descripcion.message}</ErrorMessage>}
            </div>

            <input className={styles.field__button} type="submit" value={'Guardar imagen'} />

        </form>
    )
}