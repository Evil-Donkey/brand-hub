import Image from "next/image"
import styles from './LargeImage.module.scss'

const LargeImage = ({ data }) => {
    const image = data?.image;
    const { altText, mediaItemUrl, mediaDetails, sizes } = image;

    return image && (
        <div className="row justify-content-end">
            <div className={`col ${styles.largeImageWrap}`}>
                <Image 
                    src={mediaItemUrl}
                    alt={altText}
                    width={mediaDetails?.width}
                    height={mediaDetails?.height}
                    sizes={sizes}
                />
            </div>
        </div>
    )
}

export default LargeImage;