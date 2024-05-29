'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import styles from './HomepageIntro.module.scss'
// import { trackEvent } from '../GoogleTagManager'

const Intro = ({ 
    c1,
    c2,
    backgroundColor, 
    color, 
    content,
    featuredImage, 
    homepageRotatingList,
    isHome, 
    isPricing,
    title }) => {

    // const trackDemo = () => {
    //     trackEvent({
    //       event: 'demoClick'
    //     });
    // };
    // const trackCall = () => {
    //     trackEvent({
    //       event: 'callClick'
    //     });
    // };
    // const trackEmail = () => {
    //     trackEvent({
    //       event: 'emailClick'
    //     });
    // };

    const rotatingListRef = useRef(null);
    const image = featuredImage ? featuredImage.node : null;


    useEffect(() => {
        if (homepageRotatingList && homepageRotatingList.length > 0) {
            const elements = rotatingListRef.current.children;
            const tl = gsap.timeline({ repeat: -1 });
    
            gsap.set(elements, { opacity: 0, x: 50 });
    
            for (let i = 0; i < elements.length; i++) {
                const nextIndex = (i + 1) % elements.length;
    
                tl.to(elements[i], { opacity: 1, x: 0, duration: .5, ease: 'power2.inOut' })
                  .to(elements[i], { opacity: 0, x: 50, duration: .5, ease: 'power2.inOut' }, '+=.5')
                  .to(elements[nextIndex], { opacity: 1, x: 0, duration: .5, ease: 'power2.inOut' }, '-=0.5');
            }
        }
    }, [homepageRotatingList]);

    return (
        <div className={styles.introContainer} style={{backgroundColor: backgroundColor, color: color}}>
            <div className='container'>
                <div className='row justify-content-between align-items-center'>
                    {title &&
                        <div className={`col-lg-${c1 ? c1 : '5'} mb-5 mb-lg-0`}>
                            <h1 className={`m-0 ${isHome ? styles.heroGraphic : ``}`}>{title}</h1>
                            {isPricing && <img className="mt-3" src='/images/graphic-pricing.png' width="300" alt='Pricing Graphic' />}
                        </div>
                    }
                    <div className={`col-lg-${c2 ? c2 : '5'} d-flex flex-column justify-content-between ${featuredImage ? `align-items-center align-items-lg-end` : ``}`}>
                        {homepageRotatingList &&
                            <div className={`row ${styles.rotatingList}`}>
                                <div className='col'>
                                    <h2>Brand Hub = 
                                        <div ref={rotatingListRef}>
                                            {homepageRotatingList.map((item, i) => (
                                                <span key={i.toString()}>{item.text}</span>
                                            ))}
                                        </div>
                                    </h2>
                                </div>
                            </div>
                        }
                        {content &&
                            <div className='row'>
                                <div className='col-10 col-md-9 col-lg-12 col-xl-9'>
                                    <div dangerouslySetInnerHTML={{ __html: content }} />
                                </div>
                            </div>
                        }
                        {featuredImage && <Image src={image.mediaItemUrl} width={image.mediaDetails.width} height={image.mediaDetails.height} alt={image.altText} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Intro;