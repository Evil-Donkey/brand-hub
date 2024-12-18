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
                const { backgroundColour, dropColour, copy, image, video, buttonLabel, buttonUrl } = row;

                return (
                    <div key={i.toString()} style={{backgroundColor: backgroundColour, position: 'relative'}}>
                        <div className={`${styles.twoColumnsTextImage} container d-flex`}>
                            <div className='row align-items-center justify-content-center justify-content-md-around gap-3 gap-md-5'>
                                <div className={`${i % 2 == 0 ? `order-md-last` : `order-md-first`} col-10 col-md-5 position-relative align-self-end`}>
                                    {image &&
                                        <Image 
                                            src={image.mediaItemUrl} 
                                            width={image.mediaDetails.width} 
                                            height={image.mediaDetails.height}
                                            alt={image.altText}
                                        />
                                    }
                                    {video &&
                                        <div className={styles.iframeWrapper}>
                                            <video src={video.mediaItemUrl} loop muted autoPlay webkit-playsinline="true" playsInline />
                                        </div>
                                    }
                                </div>
                                <div className='col-md-6 col-lg-5 text-center text-md-start'>
                                    <div dangerouslySetInnerHTML={{ __html: copy }} />
                                    {buttonUrl && <Link href={buttonUrl} className="cta__btn mt-3">{buttonLabel ? buttonLabel : 'Find out more'}</Link>}
                                </div>
                            </div>
                        </div>
                        {dropColour && <Drop colour={dropColour} />}
                    </div>
                );
            })}
        </>
    );
}

export default TwoColumnsTextImage;