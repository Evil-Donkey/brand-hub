import Image from 'next/image'
import styles from './Fonts.module.scss'

const Fonts = ({ data }) => {
    const fonts = data?.fonts;

    return fonts && (
        <div className='row justify-content-end'>
            {fonts.map((font, i) => {
                const { altText, sourceUrl, mediaDetails, sizes } = font?.previewImage;
                const { fontUrl, name } = font;
                return font && (
                    <div key={i.toString()} className='col-md-6'>
                        {name &&
                            <h5 className={`${styles.assetsBtn} mb-3`}>{name}</h5>
                        }
                        {sourceUrl && 
                            <div className={styles.fontsImageWrap}>
                                <Image 
                                    src={sourceUrl}
                                    sizes={sizes}
                                    alt={altText}
                                    width={mediaDetails?.width}
                                    height={mediaDetails?.height}
                                />
                            </div>
                        }
                        {fontUrl && 
                            <div className={styles.filesWrap}>
                                <h5 className={`${styles.assetsBtn} d-flex gap-2 align-items-center`}>
                                    <a className='d-flex gap-2 align-items-center' href={fontUrl} target="_blank">
                                        <span>Download</span>
                                        <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.4307 1.09742L7.03743 10.4907M16.4307 1.09742L16.4308 6.73339M16.4307 1.09742L10.7948 1.09741M7.03746 1.09742H1.40149V16.1267H16.4307V10.4907" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                </h5>
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default Fonts;