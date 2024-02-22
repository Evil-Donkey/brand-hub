import Image from 'next/image'
import Link from 'next/link'
import styles from './BrandSpotlight.module.scss'

const Spotlight = ({ brandSpotlightCopy, brandSpotlight }) => {
    return brandSpotlight && (
        <div className={styles.spotlightWrap}>
            <div className='container py-5'>
                <div className="row row-cols-1 text-center">
                    <div className='col'>
                        <h2 className='mb-2'>Brand Spotlight</h2>
                    </div>
                    <div className='col mb-5'>
                        <p>{brandSpotlightCopy}</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {brandSpotlight.map((item, i) => {
                        const { id, author, title, brandOptions, slug } = item;
                        const authorName = author.node.authorCustomFields.authorNiceName;
                        const authorSlug = author.node.authorCustomFields.urlSlug;
                        const altText = brandOptions?.spotlightFeaturedImage?.altText;
                        const mediaDetails = brandOptions?.spotlightFeaturedImage?.mediaDetails;
                        const sizes = brandOptions?.spotlightFeaturedImage?.sizes;
                        const sourceUrl = brandOptions?.spotlightFeaturedImage?.sourceUrl;
                        const url = authorSlug + '/' + slug;
                        return (        
                            <Link href={url} className={`${styles.spotlightItem} col-md-4 mb-4 d-flex gap-3 flex-column`} key={id}>
                                {sourceUrl && 
                                    <div className={styles.spotlightImageWrapper}>
                                        <Image src={sourceUrl} width={mediaDetails.width} height={mediaDetails.height} sizes={sizes} alt={altText} />
                                    </div>
                                }
                                <div>
                                    <h3 className='mb-0'>{title}</h3>
                                    {authorName && <p>Agency: {authorName}</p>}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Spotlight;