'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import Drop from '../Drop'
import styles from './HomepageIntro.module.scss'

const HomeIntro = ({ 
    backgroundColor, 
    color,
    featuredImage,
    hasDrop,
    hasButtons,
    mobileFeaturedImage,
    title,
    themeColour
}) => {

    const image = featuredImage ? featuredImage.node : null;
    const mobileImage = mobileFeaturedImage ? mobileFeaturedImage : null;

    const imageRef = useRef(null);

    useEffect(() => {
        const onMouseMove = (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const posX = (clientX - centerX) / centerX;
            const posY = (clientY - centerY) / centerY;

            const maxRotation = 3; // Max rotation in degrees
            const rotateX = posY * maxRotation;
            const rotateY = posX * maxRotation;

            gsap.to(imageRef.current, {
                rotationX: rotateX,
                rotationY: -rotateY,
                transformPerspective: 1000,
                ease: 'none',
            });
        };

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <div className={styles.introContainer} style={{backgroundColor: backgroundColor, color: color}}>
            <div className='container-fluid'>
                {title && <h1 className="visually-hidden">{title}</h1>}
                {image && (
                    <div className='row justify-content-center'>
                        <div className='col-auto'>
                            {mobileImage && (
                                <img ref={imageRef} src={mobileImage.mediaItemUrl} alt={mobileImage.altText} className="d-md-none img-fluid" />
                            )}
                            {image && (
                                <img ref={imageRef} src={image.mediaItemUrl} alt={image.altText} className={`${mobileImage ? 'd-none d-md-block' : ''} img-fluid`} />
                            )}
                        </div>
                    </div>
                )}
            </div>
            {hasButtons && (
                <div className={styles.buttonsContainer}>
                    <div className='row justify-content-center'>
                        <div className='col-9 col-lg-auto'>
                            <div className='d-flex flex-column flex-lg-row align-items-lg-center gap-lg-3'>
                                <Link href='/pricing' className={`cta__btn cta__btn--${themeColour} mb-3 mb-lg-0`}>See our plans</Link>
                                <Link href='/our-work' className={`cta__btn cta__btn--light mb-3 mb-lg-0`}>View our showreel</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {hasDrop && <Drop colour="#ffffff" />}
        </div>
    );
}

export default HomeIntro;