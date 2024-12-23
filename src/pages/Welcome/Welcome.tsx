import { useLoaderData } from "react-router-dom"
import { getAllImages } from "../../services/imageService"
import { allImages, Image } from "../../types"
import ImageContent from "../../components/ImageContent/ImageContent"
import { useMemo, useState } from "react"
import ImageModal from "../../components/ImageModal/ImageModal"
import styles from "./Welcome.module.css"

export async function loader() {
    const allImages = await getAllImages()

    return allImages ?? { imagenes: [] }
}


export default function Welcome() {
    const { imagenes } = useLoaderData() as allImages
    const isEmpty = useMemo(() => imagenes.length === 0, [imagenes]);
    const [modal, setModal] = useState(false)

    return (
        <>
            <section className={styles.container__title}>
                <h2>Listado de imagenes</h2>
                <p>A continuacion se muestran las imagenes que se encuentran en la base de datos</p>
            </section>
            <div className={styles.container__images}>
                {
                    isEmpty ? <p>No hay imagenes en la base de datos</p> :
                        imagenes.map((image) => (
                            <ImageContent key={image.id} image={image} />
                        ))

                }
            </div>
            {/*
            <div className={styles.container__images}>
                {
                    prototypeImage.map((image) => (
                        <ImageContent key={image.id} image={image} />
                    ))
                }

            </div>

            */}

            <div className={styles.modal__content}>
                <ImageModal modal={modal} setModal={setModal} />
            </div>


        </>

    )
}