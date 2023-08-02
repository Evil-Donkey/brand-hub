'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './AssetsDownload.module.scss'

const AssetsDownload = ({ data }) => {
    const [isActive, setIsActive] = useState(false);
    const [activeTool, setActiveTool] = useState(null);
    const assets = data?.assets;

    const downloadClick = (i) => {
        setActiveTool(i);
        if (isActive && activeTool == i) {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    }

    return assets && (
        <div className='row justify-content-end'>
            {assets.map((asset, i) => {
                const { altText, sourceUrl, mediaDetails, sizes } = asset?.previewImage;
                const files = asset?.files;
                return asset && (
                    <div key={i.toString()} className='col-md-5'>
                        <div className={styles.assetImageWrap}>
                            <Image 
                                src={sourceUrl}
                                sizes={sizes}
                                alt={altText}
                                width={mediaDetails?.width}
                                height={mediaDetails?.height}
                            />
                        </div>
                        {files && 
                            <div className={styles.filesWrap}>
                                <h5 className={`${styles.assetsBtn} d-flex gap-2 align-items-center`} onClick={() => downloadClick(i)}>
                                    <span>Download</span>
                                    {(activeTool === i) && isActive ? <svg width="18" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.3125 1.17737L16.9037 1.17737" stroke="#F8F8F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    : <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.10825 1.38171V16.973M1.31262 9.17734L16.9039 9.17734" stroke="#F8F8F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>}
                                </h5>
                                {(activeTool === i) && isActive && 
                                    <ul className='m-0 p-0 list-unstyled'>
                                        {files.map((file, i) => {
                                            const fileUrl = file?.file?.mediaItemUrl;
                                            const fileName = file?.file?.mediaDetails?.file;
                                            return fileUrl && (
                                                <li key={i.toString()}>
                                                    <a className='d-flex gap-2 align-items-center' href={fileUrl} target="_blank">
                                                        <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M7.28571 1.28723V4.43009C7.28571 5.29796 7.98927 6.00152 8.85714 6.00152H12M1 1.28723V15.4301H12V5.2158L8.07143 1.28723H1Z" stroke="#F8F8F8" strokeLinejoin="round"/>
                                                        </svg>
                                                        <span>{fileName && fileName}</span>
                                                    </a>
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
    )
}

export default AssetsDownload;