import { Image } from "../../types"
import styles from "./ImageContent.module.css"
type ImageContentProps = {
    image: Image
}


export default function ImageContent({ image }: ImageContentProps) {

    return (
        <div className={styles.container_image}>
            <div className={styles.container_text}>
                <h3>{image.titulo}</h3>
                <p>{image.descripcion}</p>

            </div>
            <div className={styles.cont_img}>
                <img src={image.url} alt={image.titulo} />
            </div>
        </div>

    )
}