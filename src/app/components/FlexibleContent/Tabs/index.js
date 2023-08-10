'use client'

import { useState } from 'react'
import Image from 'next/image'
import YouTube from 'react-youtube'
import Spline from '@splinetool/react-spline'
import handleDownload from '../../../lib/handleDownload'
import styles from './Tabs.module.scss'

const Tabs = ({ data }) => {
    
    const [isActive, setIsActive] = useState(0);
    const tabs = data?.tabs;
    const nav = data?.withTabbedNav;
    const tabActiveColour = data?.tabActiveColour;

    const tabsHandle = (i) => {
        setIsActive(i);
    }

    return tabs && (
        <div className='row row-cols-1'>
            
            {nav &&
                <div className='col mb-4'>
                    <ul className={`col m-0 p-0 list-unstyled d-flex ${styles.tabsNav}`}>
                        {tabs.map((tab, i) => {
                            const { tabLabel } = tab;
                            return (
                                <li style={{ backgroundColor: isActive == i ? tabActiveColour : '' }} className={isActive == i ? styles.tabNavActive : ''} key={i.toString()} onClick={() => tabsHandle(i)}>{tabLabel}</li>
                            )
                        })}
                    </ul>
                </div>
            }

            {tabs.map((tab, i) => {
                const { copy, assets } = tab;

                return tab && isActive === i && (
                    <div key={i.toString()} className='col-12'>
                        <div className={`row ${copy ? `justify-content-between` : 'justify-content-end'}`}>
                            {copy &&
                                <div className='col-md-3'>
                                    <div dangerouslySetInnerHTML={{ __html: copy }} />
                                </div>
                            }
                            {assets && 
                                <div className='col-md-8'>
                                    {assets.map((asset, i) => {
                                        const { heading, file, image, youtubeVideo, videoMp4, splineUrl } = asset;
                                        return (
                                            <div key={i.toString()} className='row mb-4 justify-content-end'>
                                                {(image || youtubeVideo || videoMp4 || splineUrl) &&
                                                    <div className='col d-flex flex-column align-items-end justify-content-end'>
                                                        {heading &&
                                                            <h5 className={styles.assetsBtn}>{heading}</h5>
                                                        }
                                                        {splineUrl &&
                                                            <div className={styles.iframeWrapper}>
                                                                <Spline scene={splineUrl} />
                                                            </div>
                                                        }
                                                        {youtubeVideo && 
                                                            <div className={styles.iframeWrapper}>
                                                                {/* <div dangerouslySetInnerHTML={{ __html: vimeoyoutubeVideo }} /> */}
                                                                <YouTube videoId={youtubeVideo} />
                                                            </div>
                                                        }
                                                        {videoMp4 &&
                                                            <div className={styles.iframeWrapper}>
                                                                <video src={videoMp4} controls />
                                                            </div>
                                                        }
                                                        {image && <div className={styles.assetImageWrap}>
                                                            <Image 
                                                                src={image?.mediaItemUrl}
                                                                sizes={image?.sizes}
                                                                alt={image?.altText}
                                                                width={image?.mediaDetails?.width / 2}
                                                                height={image?.mediaDetails?.height / 2}
                                                            />
                                                        </div>}
                                                        {file && 
                                                            <div className={`${styles.filesWrap} d-flex justify-content-end`}>
                                                                <h5 className={styles.assetsBtn}>
                                                                    <div className='d-flex gap-2 align-items-center' onClick={() => handleDownload(file.mediaItemUrl, 'asset')}>
                                                                        <span>Download</span>
                                                                        <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M9.67501 14.7716L9.67501 1.56396M9.67501 14.7716L5.27246 10.3691M9.67501 14.7716L14.0776 10.3691" stroke="#F8F8F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                            <line x1="1.51001" y1="19.9648" x2="17.8403" y2="19.9648" stroke="#F8F8F8" strokeWidth="1.5" strokeLinecap="round"/>
                                                                        </svg>
                                                                    </div>
                                                                </h5>
                                                            </div>
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            } 
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Tabs;