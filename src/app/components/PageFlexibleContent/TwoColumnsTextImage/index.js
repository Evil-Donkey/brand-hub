'use client'

import Drop from '../../Drop'
import styles from './TwoColumnsTextImage.module.scss'
import Image from 'next/image'
import Link from 'next/link'

const TwoColumnsTextImage = ({ data }) => {

    const { rows } = data;

    return (
        <>
            {rows.map((row, i) => {
                const { backgroundColour, textColour,dropColour, seoTitle, copy, image, video, buttons, mobileImageBottom, mobileImageTop } = row;

                return (
                    <div key={i.toString()} style={{backgroundColor: backgroundColour, position: 'relative'}}>
                        <div className={`${styles.twoColumnsTextImage} container d-flex`}>
                            <div className='row align-items-center justify-content-center justify-content-md-around'>
                                <div className={`${i % 2 != 0 ? `order-md-last` : `order-md-first`} col-md-7 position-relative align-self-end`}>
                                    {seoTitle && <h2 className="visually-hidden">{seoTitle}</h2>}
                                    {image &&
                                        <Image 
                                            src={image.mediaItemUrl} 
                                            width={image.mediaDetails.width} 
                                            height={image.mediaDetails.height}
                                            alt={image.altText}
                                            className={`${mobileImageTop ? 'd-none d-md-block' : ''}`}
                                        />
                                    }
                                    {mobileImageTop &&
                                        <Image 
                                            src={mobileImageTop.mediaItemUrl} 
                                            width={mobileImageTop.mediaDetails.width} 
                                            height={mobileImageTop.mediaDetails.height}
                                            alt={mobileImageTop.altText}
                                            className='d-md-none'
                                        />
                                    }
                                    {video &&
                                        <div className={styles.iframeWrapper}>
                                            <video src={video.mediaItemUrl} loop muted autoPlay webkit-playsinline="true" playsInline />
                                        </div>
                                    }
                                </div>
                                <div className='col-md-5 d-flex flex-column'>
                                    <div dangerouslySetInnerHTML={{ __html: copy }} style={{color: textColour}} />
                                    {buttons &&
                                        <div className='d-flex flex-column flex-lg-row align-items-lg-center gap-lg-3'>
                                            {buttons.map((button, i) => {
                                                return (
                                                    <Link key={i.toString()} href={button.url} className={`cta__btn cta__btn--${button.style} mb-3 mb-lg-0`}>{button.label ? button.label : 'Find out more'}</Link>
                                                )
                                            })}
                                        </div>
                                    }
                                    {mobileImageBottom &&
                                        <Image 
                                            src={mobileImageBottom.mediaItemUrl} 
                                            width={mobileImageBottom.mediaDetails.width} 
                                            height={mobileImageBottom.mediaDetails.height}
                                            alt={mobileImageBottom.altText}
                                            className={`${styles.mobileImageBottom} mt-5 d-md-none ${i % 2 != 0 ? 'align-self-end' : 'align-self-start'}`}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                        {dropColour && <div className='d-none d-md-block'><Drop colour={dropColour} /></div>}
                    </div>
                );
            })}
        </>
    );
}

export default TwoColumnsTextImage;