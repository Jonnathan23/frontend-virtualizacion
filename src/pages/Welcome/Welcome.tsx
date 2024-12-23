import { useLoaderData } from "react-router-dom"
import { getAllImages } from "../../service/imageService"
import { Image } from "../../types"
import ImageContent from "../../components/ImageContent/ImageContent"
import { useMemo, useState } from "react"
import ImageModal from "../../components/ImageModal/ImageModal"
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
            <h1>Bienvenido</h1>
            <section>
                <h2>Listado de imagenes</h2>
                <p>A continuacion se muestran las imagenes que se encuentran en la base de datos</p>
            </section>

            {isEmpty ? <p>No hay imagenes en la base de datos</p> :
                images.map((image) => (
                    <ImageContent key={image.id} image={image} />
                ))
            }

            <ImageModal modal={modal} setModal={setModal} />


        </>

    )
}