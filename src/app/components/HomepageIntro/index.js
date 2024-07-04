'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ReactPlayer from 'react-player'
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
    isComparising,
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

    const pb = isHome ? '20rem' : '3rem';


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
        <>
            <div className={styles.introContainer} style={{backgroundColor: backgroundColor, color: color, paddingBottom: pb}}>
                <div className='container'>
                    <div className='row justify-content-between align-items-center'>
                        {title &&
                            <div className={`col-lg-${c1 ? c1 : '5'} mb-5 mb-lg-0`}>
                                <h1 className={`m-0 ${isHome ? styles.heroGraphic : ``}`} dangerouslySetInnerHTML={{ __html: title }} />
                                {isPricing && <img className="mt-3" src='/images/graphic-pricing.png' width="300" alt='Pricing Graphic' />}
                                {isComparising && 
                                    <div className="row mt-4">
                                        <div className='col-md-7'>
                                            <div dangerouslySetInnerHTML={{ __html: content }} />
                                        </div>
                                    </div>
                                }
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
                            {!isComparising && content &&
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

            {isHome &&
                <div className={styles.introVideo}>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-md-8'>
                                <div className={styles.videoWrapper}>
                                    <ReactPlayer
                                        url="https://www.youtube.com/watch?v=Pw7YlFP5tq8"
                                        playing
                                        muted
                                        controls
                                        width="100%"
                                        height="100%"
                                        config={{
                                            youtube: {
                                                playerVars: {
                                                    cc_load_policy: 1, // Enable closed captions
                                                    cc_lang_pref: 'en', // Preferred language for captions
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='row justify-content-center mt-4'>
                            <div className='col-auto text-center d-flex flex-column gap-3'>
                                <Image src='/images/logo-trustpilot.png' width={335} height={45} alt='Trustpilot score' />
                                <a className='text-decoration-underline' href='https://it.trustpilot.com/review/brand-hub.co' target='_blank'>Read our Trustpilot reviews</a>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default Intro;