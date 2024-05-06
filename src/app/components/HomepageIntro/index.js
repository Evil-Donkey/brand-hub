'use client'

import Link from 'next/link'
import styles from './HomepageIntro.module.scss'
// import { trackEvent } from '../GoogleTagManager'

const Intro = ({ backgroundColor, color, content, isHome, title }) => {

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

    console.log(isHome)

    return (
        <div className={styles.introContainer} style={{backgroundColor: backgroundColor, color: color}}>
            <div className={`${styles.introContainer} container`}>
                <div className='row justify-content-between text-center text-md-start'>
                    {title &&
                        <div className='col-md-5 mb-5 mb-md-0'>
                            <h1 className={`m-0 ${isHome ? styles.heroGraphic : ``}`}>{title}</h1>
                        </div>
                    }
                    <div className='col-md-5 d-flex flex-column justify-content-between'>
                        {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
                        <div className={`d-flex flex-column flex-lg-row gap-lg-3 align-items-center ${!content ? 'justify-content-end' : ''}`}>
                            <Link href="#form-request" className="cta__btn mt-3">Book a demo</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Intro;