'use client'

import Image from 'next/image'
import YouTube from 'react-youtube'
import styles from './BrandHero.module.scss'

const BrandHero = ({ data }) => {

    const altText = data?.heroImage?.altText;
    const sourceUrl = data?.heroImage?.sourceUrl;
    const mediaDetails = data?.heroImage?.mediaDetails;
    const sizes = data?.heroImage?.sizes;
    const containedFeaturedImage = data?.brandOptions?.containedFeaturedImage;
    const heroYoutubeVideo = data?.heroYoutubeVideo;
    const heroVideoMp4 = data?.heroVideoMp4?.mediaItemUrl;
    
    return (sourceUrl || heroYoutubeVideo || heroVideoMp4) ? (
        <div className={`container${!containedFeaturedImage ? '-fluid g-0' : ''}`}>
            <div className='row'>
                <div className={`col ${styles.featuredImageWrap}`}>
                    {heroYoutubeVideo ?
                        <div className={styles.iframeWrapper}>
                            <YouTube videoId={heroYoutubeVideo} />
                        </div>
                    : heroVideoMp4 ?
                        <div className={styles.iframeWrapper}>
                            <video src={heroVideoMp4} controls />
                        </div>
                    : sourceUrl ?
                        <Image
                            src={sourceUrl}
                            width={mediaDetails?.width}
                            height={mediaDetails?.height}
                            sizes={sizes}
                            alt={altText}
                        />
                    : null}
                </div>
            </div>
        </div>
    ) : null;
}

export default BrandHero;