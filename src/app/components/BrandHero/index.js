'use client'

import Image from 'next/image'
import YouTube from 'react-youtube'
import Spline from '@splinetool/react-spline'
import styles from './BrandHero.module.scss'

const BrandHero = ({ data }) => {

    const altText = data?.heroImage?.altText;
    const mediaItemUrl = data?.heroImage?.mediaItemUrl;
    const mediaDetails = data?.heroImage?.mediaDetails;
    const containedHero = data?.brandOptions?.containedHero;
    const heroYoutubeVideo = data?.heroYoutubeVideo;
    const heroVideoMp4 = data?.heroVideoMp4?.mediaItemUrl;
    const splineUrl = data?.splineUrl;
    const heroOverlayLogo = data?.heroOverlayLogo;
    
    return (mediaItemUrl || heroYoutubeVideo || heroVideoMp4 || splineUrl) ? (
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
                    : mediaItemUrl ?
                        <div className={styles.imageWrap}>
                            <Image
                                src={mediaItemUrl}
                                width={mediaDetails?.width}
                                height={mediaDetails?.height}
                                alt={altText}
                            />
                        </div>
                    : null}
                    {heroOverlayLogo &&
                        <div className={styles.heroOverlayLogo}>
                            <Image
                                src={heroOverlayLogo.mediaItemUrl}
                                width={heroOverlayLogo.mediaDetails?.width}
                                height={heroOverlayLogo.mediaDetails?.height}
                                alt={heroOverlayLogo.altText}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    ) : null;
}

export default BrandHero;