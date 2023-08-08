'use client'

import Image from 'next/image'
import YouTube from 'react-youtube'
import Spline from '@splinetool/react-spline'
import styles from './BrandHero.module.scss'

const BrandHero = ({ data }) => {

    const altText = data?.heroImage?.altText;
    const sourceUrl = data?.heroImage?.sourceUrl;
    const mediaDetails = data?.heroImage?.mediaDetails;
    const sizes = data?.heroImage?.sizes;
    const containedHero = data?.brandOptions?.containedHero;
    const heroYoutubeVideo = data?.heroYoutubeVideo;
    const heroVideoMp4 = data?.heroVideoMp4?.mediaItemUrl;
    const splineUrl = data?.splineUrl;
    
    return (sourceUrl || heroYoutubeVideo || heroVideoMp4 || splineUrl) ? (
        <div className={`container${!containedHero ? '-fluid g-0' : ''}`}>
            <div className='row'>
                <div className={`col ${styles.featuredImageWrap}`}>
                    {splineUrl ?
                        <div className={styles.iframeWrapper}>
                            <Spline scene={splineUrl} />
                        </div>
                    : heroYoutubeVideo ?
                        <div className={styles.iframeWrapper}>
                            <YouTube videoId={heroYoutubeVideo} />
                        </div>
                    : heroVideoMp4 ?
                        <div className={styles.iframeWrapper}>
                            <video src={heroVideoMp4} loop muted autoPlay webkit-playsinline="true" playsInline />
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