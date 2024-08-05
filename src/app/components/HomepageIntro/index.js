'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import styles from './HomepageIntro.module.scss'

const HomeIntro = ({ 
    backgroundColor, 
    color, 
    content,
    featuredImage, 
    homepageRotatingList,
    title }) => {

    const rotatingListRef = useRef(null);
    const image = featuredImage ? featuredImage.node : null;

    useEffect(() => {
        if (homepageRotatingList && homepageRotatingList.length > 0) {
            const elements = rotatingListRef.current.children;
            const tl = gsap.timeline({ repeat: -1 });
    
            gsap.set(elements, { opacity: 0, x: 50 });
    
            for (let i = 0; i < elements.length; i++) {
                const nextIndex = (i + 1) % elements.length;
    
                tl.to(elements[i], { opacity: 1, x: 0, duration: 1, ease: 'power2.inOut' })
                  .to(elements[i], { opacity: 0, x: 50, duration: 1, ease: 'power2.inOut' }, '+=.5')
                  .to(elements[nextIndex], { opacity: 1, x: 0, duration: 1, ease: 'power2.inOut' }, '-=0.5');
            }
        }
    }, [homepageRotatingList]);

    return (
        <>
            <div className={styles.introContainer} style={{backgroundColor: backgroundColor, color: color}}>
                <div className='container'>
                    <div className='row mb-4 mb-md-5'>
                        <div className='col mb-4'>
                            <h1 className={styles.introHeading1}>Looking for</h1>
                        </div>
                    </div>

                    {homepageRotatingList &&
                        <div className={`row ${styles.rotatingList}`}>
                            <div className='col'>
                                <h2>
                                    <div ref={rotatingListRef}>
                                        {homepageRotatingList.map((item, i) => (
                                            <span key={i.toString()}>{item.text}</span>
                                        ))}
                                    </div>
                                </h2>
                            </div>
                        </div>
                    }
                    
                    
                    <div className='row justify-content-center align-items-end mt-4 mt-md-5'>
                        <div className='col-md-5 order-last order-md-first'>
                            {image && <img src={image.mediaItemUrl} alt={image.altText} />}
                        </div>
                        <div className="col-md-6 mt-5">
                            {title &&
                                <div className='row justify-content-md-end mt-5'>
                                    <div className='col-auto'>
                                        <h1 className={styles.introHeading2} dangerouslySetInnerHTML={{ __html: title }} />
                                    </div>
                                </div>
                            }
                            {content &&
                                <div className='row mt-4'>
                                    <div className='col-md-10'>
                                        <div dangerouslySetInnerHTML={{ __html: content }} />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            
            
            <div className='container mt-5'>
                <div className='row justify-content-center'>
                    <div className='col-auto text-center d-flex flex-column gap-3'>
                        <Image src='/images/logo-trustpilot.png' width={335} height={45} alt='Trustpilot score' />
                        <a className='text-decoration-underline' href='https://it.trustpilot.com/review/brand-hub.co' target='_blank'>Read our Trustpilot reviews</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeIntro;