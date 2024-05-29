import styles from './TwoColumnsTextImage.module.scss'
import Image from 'next/image'

const TwoColumnsTextImage = ({ data }) => {

    const { backgroundColor, rows, textColor } = data;

    return (
        <div style={{backgroundColor: backgroundColor, color: textColor}}>
            <div className={`${styles.twoColumnsTextImage} container d-flex flex-column align-items-center justify-content-center`}>
                {rows.map((row, i) => {
                    const { copy, image, video } = row;

                    return (
                        <div key={i.toString()} className='row align-items-center justify-content-center justify-content-md-around gap-3 gap-md-5'>
                            <div className={`${i % 2 == 0 ? `order-md-last` : `order-md-first`} col-10 col-md-5 position-relative`}>
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
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TwoColumnsTextImage;