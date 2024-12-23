import { useLoaderData } from "react-router-dom"
import { getAllImages } from "../../services/imageService"
import { Image } from "../../types"
import ImageContent from "../../components/ImageContent/ImageContent"
import { useMemo, useState } from "react"
import ImageModal from "../../components/ImageModal/ImageModal"
import { prototypeImage } from "../../data"
import styles from "./Welcome.module.css"

export async function loader() {
    const images = await getAllImages()

    return images ?? []
}


export default function Welcome() {
    const images = useLoaderData() as Image[]
    const isEmpty = useMemo(() => images.length === 0, [images]);
    const [modal, setModal] = useState(false)

    return (
        <>
            <section className={styles.container__title}>
                <h2>Listado de imagenes</h2>
                <p>A continuacion se muestran las imagenes que se encuentran en la base de datos</p>
            </section>

            {/*
            isEmpty ? <p>No hay imagenes en la base de datos</p> :
                images.map((image) => (
                    <ImageContent key={image.id} image={image} />
                ))
                */
            }
            <div className={styles.container__images}>
                {
                    prototypeImage.map((image) => (
                        <ImageContent key={image.id} image={image} />
                    ))
                }

            </div>
            
            <div className={styles.modal__content}>
                <ImageModal modal={modal} setModal={setModal} />
            </div>


        </>

    )
}