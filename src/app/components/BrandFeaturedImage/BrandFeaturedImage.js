import Image from 'next/image'
import styles from './BrandFeaturedImage.module.scss'

const BrandFeaturedImage = ({ data }) => {
    
    const title = data?.title;
    const sourceUrl = data?.featuredImage?.node?.sourceUrl;
    const mediaDetails = data?.featuredImage?.node?.mediaDetails;
    const sizes = data?.featuredImage?.node?.sizes;
    const containedFeaturedImage = data?.brandOptions?.containedFeaturedImage;
    
    return sourceUrl ? (
        <div className={`container${!containedFeaturedImage ? '-fluid g-0' : ''}`}>
            <div className='row'>
                <div className={`col ${styles.featuredImageWrap}`}>
                    <Image
                        src={sourceUrl}
                        width={mediaDetails?.width}
                        height={mediaDetails?.height}
                        sizes={sizes}
                        alt={title}
                    />
                </div>
            </div>
        </div>
    ) : null;
}

export default BrandFeaturedImage;