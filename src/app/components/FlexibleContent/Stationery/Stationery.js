'use client'

import Image from 'next/image'
import handleDownload from '../../../lib/handleDownload'
import styles from './Stationery.module.scss'

const Stationery = ({ data }) => {
    const assets = data?.assets;

    return assets && (
        <div className='row justify-content-end'>
            <div className='col-md-10'>
                <div className='row justify-content-end'>
                    {assets.map((asset, i) => {
                        const { altText, sourceUrl, mediaDetails, sizes } = asset?.previewImage;
                        const files = asset?.files;
                        const heading = asset?.heading;
                        return asset && (
                            <div key={i.toString()} className='col-md-4 d-flex flex-column'>
                                <div className={styles.stationeryImageWrap}>
                                    <Image 
                                        src={sourceUrl}
                                        sizes={sizes}
                                        alt={altText}
                                        width={mediaDetails?.width}
                                        height={mediaDetails?.height}
                                    />
                                </div>
                                {(files || heading) && 
                                    <div className={`${styles.filesWrap} p-4 d-flex flex-column gap-2 flex-grow-1`}>
                                        {heading &&
                                            <h5 className={`${styles.assetsBtn} mb-2`}>{heading}</h5>
                                        }
                                        {files &&
                                            <ul className='m-0 p-0 list-unstyled'>
                                                {files.map((file, i) => {
                                                    const fileUrl = file?.file?.mediaItemUrl;
                                                    const fileName = file?.fileLabel;
                                                    return fileUrl && (
                                                        <li key={i.toString()}>
                                                            <div className='d-flex gap-2 align-items-center' onClick={() => handleDownload(fileUrl, fileName)}>
                                                            <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6.49462 1.28711V4.42997C6.49462 5.29784 7.14756 6.00139 7.95299 6.00139H10.8697M0.661133 1.28711V15.43H10.8697V5.21568L7.22381 1.28711H0.661133Z" stroke="#2B2B2B" strokeLinejoin="round"/>
                                                            </svg>
                                                                <span>{fileName && fileName}</span>
                                                            </div>
                                                        </li>
                                                    )
                                                })} 
                                            </ul>
                                        }
                                    </div>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Stationery;