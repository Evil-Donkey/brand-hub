'use client'

import handleDownload from '../../../lib/handleDownload'
import styles from './Gallery.module.scss'

const Gallery = ({ data }) => {
    const gallery = data?.gallery;

    return gallery && (
        <div className='row justify-content-end'>
            {gallery.map((image, i) => {
                const mediaItemUrl = image?.mediaItemUrl;
                return mediaItemUrl && (
                    <div key={image.id} className={`col-md-3 mb-4 ${styles.galleryWrap}`}>
                        {mediaItemUrl && 
                            <div className={styles.galleryImageWrap} style={{ 'backgroundImage': 'url(' + mediaItemUrl + ')' }} />
                        }
                        <div className={styles.filesWrap}>
                            <h5 className={`${styles.assetsBtn} d-flex gap-2 align-items-center`}>
                                <div className='d-flex gap-2 align-items-center' onClick={() => handleDownload(mediaItemUrl, 'gallery')}>
                                    <span>Download</span>
                                    <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.67501 14.7716L9.67501 1.56396M9.67501 14.7716L5.27246 10.3691M9.67501 14.7716L14.0776 10.3691" stroke="#F8F8F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <line x1="1.51001" y1="19.9648" x2="17.8403" y2="19.9648" stroke="#F8F8F8" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                </div>
                            </h5>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Gallery;