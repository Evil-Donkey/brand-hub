'use client'

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import styles from './Pricing.module.scss';
import Link from 'next/link';
import ThemeColor from '../../../lib/ThemeColor';
import IconDesignBorder from '@/app/components/Icons/IconDesignBorder';
import IconCodeBorder from '@/app/components/Icons/IconCodeBorder';
import IconDesignCodeBorder from '@/app/components/Icons/IconDesignCodeBorder';
import IconCheckmark from '@/app/components/Icons/IconCheckmark';
const Pricing = ({ data, allFeatures, allServices }) => {

    const cardRefs = useRef([]);

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

            cardRefs.current.forEach(card => {
                if (card) {
                    gsap.to(card, {
                        rotationX: rotateX,
                        rotationY: -rotateY,
                        transformPerspective: 1000,
                        ease: 'none',
                    });
                }
            });
        };

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    const { options, codeHubPrice, codeHubSignUpUrl, designCodeHubPrice, designCodeHubSignUpUrl, designHubPrice, designHubSignUpUrl } = data;

    return (
        <div className={styles.pricingWrapper}>
            <div className='container pt-5 pt-md-0'>

                <div className='row justify-content-center'>
                    <div className='col-md-8 col-lg-7'>
                        <div className='row'>
                            <div className='col-md-6 mb-5'>
                                <div ref={el => cardRefs.current[0] = el} className={`p-4 pt-5 py-md-5 rounded-2 d-flex flex-column h-100 position-relative ${styles.pricingOption} ${styles.pricingOptionDark}`}>
                                    <div className={styles.pricingOptionIcon}>
                                        <IconDesignBorder />
                                    </div>
                                    <h2 className='mb-md-4 text-center'>Design Hub</h2>
                                    {designHubPrice && <h3 className={`mb-4 text-center`}>
                                        £{designHubPrice}<span>/month</span>
                                    </h3>}
                                    {designHubSignUpUrl && (
                                        <div className='align-self-center'>
                                            <Link href={designHubSignUpUrl} target="_blank" className={`cta__btn cta__btn--purple`}>Sign Up now</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='col-md-6 mb-5'>
                                <div ref={el => cardRefs.current[1] = el} className={`p-4 pt-5 py-md-5 rounded-2 d-flex flex-column h-100 position-relative ${styles.pricingOption} ${styles.pricingOptionDark}`}>
                                    <div className={styles.pricingOptionIcon}>
                                        <IconCodeBorder />
                                    </div>
                                    <h2 className='mb-md-4 text-center'>Code Hub</h2>
                                    {codeHubPrice && <h3 className={`mb-4 text-center`}>
                                        £{codeHubPrice}<span>/month</span>
                                    </h3>}
                                    {codeHubSignUpUrl && (
                                        <div className='align-self-center'>
                                            <Link href={codeHubSignUpUrl} target="_blank" className={`cta__btn cta__btn--blue`}>Sign Up now</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 col-lg-5 mb-5'>
                        <div ref={el => cardRefs.current[2] = el} className={`p-4 pt-5 py-md-5 rounded-2 d-flex flex-column h-100 position-relative ${styles.pricingOption} ${styles.pricingOptionLight}`}>
                            <div className={styles.pricingOptionIcon}>
                                <IconDesignCodeBorder />
                            </div>
                            <h2 className='mb-md-4 text-center'>Design Hub + Code Hub</h2>
                            {designCodeHubPrice && <h3 className={`mb-4 text-center`}>
                                £{designCodeHubPrice}<span>/month</span>
                            </h3>}
                            {designCodeHubSignUpUrl && (
                                <div className='align-self-center'>
                                    <Link href={designCodeHubSignUpUrl} target="_blank" className={`cta__btn cta__btn--dark`}>Sign Up now</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='row mb-5'>
                    <div className='col text-center'>
                        <p>For individual projects, we also offer one-off hourly blocks. <Link href='/contact'><b><u>Get in contact for more details.</u></b></Link></p>
                    </div>
                </div>

                <div className='row justify-content-center'>
                    <div className='col-12'>
                        <h2 className='mb-3 text-uppercase'>What&apos;s included?</h2>
                    </div>

                    <div className='col-12'>
                        <table className={`${styles.pricingTable} table`}>
                            <thead>
                                <tr>
                                    <th>Services</th>
                                    <th className='text-center'>
                                        <IconDesignBorder />
                                        <h3 className="text-uppercase">Design Hub</h3>
                                    </th>
                                    <th className='text-center'>
                                        <IconCodeBorder />
                                        <h3 className="text-uppercase">Code Hub</h3>
                                    </th>
                                    <th className={`${styles.pricingTableThLast} text-center`}>
                                        <IconDesignCodeBorder />
                                        <h3 className="text-uppercase">Design Hub + Code Hub</h3>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {allServices.map((service, i) => (
                                    <tr key={`service-${i}`}>
                                        <td>{service}</td>
                                        {options.map((option, j) => {
                                            const { style } = option;
                                            const themeColour = style;
                                            const colour = ThemeColor({ themeColour });
                                            return (
                                                <td key={`service-${i}-option-${j}`} className='text-center'>
                                                    {option.services.includes(service) &&
                                                        <IconCheckmark style={colour} />
                                                }
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                                <tr className={styles.pricingTableTrLast}>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        
                            <thead>
                                <tr>
                                    <th>Features</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {allFeatures.map((feature, i) => (
                                    <tr key={`feature-${i}`}>
                                        <td>{feature}</td>
                                        {options.map((option, j) => {
                                            const { style } = option;
                                            const themeColour = style;
                                            const colour = ThemeColor({ themeColour });
                                            return (
                                                <td key={`feature-${i}-option-${j}`} className='text-center'>
                                                    {option.features.includes(feature) &&
                                                        <IconCheckmark style={colour} />
                                                    }
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;