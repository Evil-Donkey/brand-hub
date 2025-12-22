'use client'

import { useEffect, useRef, useState } from 'react';
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
    const sliderTrackRef = useRef(null);
    const isDraggingRef = useRef(false);
    const [selectedHours, setSelectedHours] = useState(2);
    const [isDragging, setIsDragging] = useState(false);

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

    // Calculate price adjustments based on hours (base is 2 hours, add £400 per additional hour)
    const hoursDifference = selectedHours - 2;
    const priceAdjustment = hoursDifference * 400;

    const calculatePrice = (basePrice) => {
        if (!basePrice) return basePrice;
        const numericPrice = parseInt(basePrice.toString().replace(/[£,]/g, ''), 10);
        if (isNaN(numericPrice)) return basePrice;
        return numericPrice + priceAdjustment;
    };

    const formatPrice = (price) => {
        if (typeof price === 'string') return price;
        return price.toLocaleString('en-GB');
    };

    const hours = [2, 3, 4, 5, 6, 7, 8];

    const calculateHourFromPosition = (clientX) => {
        if (!sliderTrackRef.current) return selectedHours;
        const rect = sliderTrackRef.current.getBoundingClientRect();
        const clickX = clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, clickX / rect.width));
        const index = Math.round(percentage * 6); // 6 steps (0-6)
        return Math.max(2, Math.min(8, 2 + index));
    };

    const handleTrackClick = (e) => {
        // Don't handle click if we're dragging or just finished dragging
        if (isDraggingRef.current) return;
        const newHour = calculateHourFromPosition(e.clientX);
        setSelectedHours(newHour);
    };

    const handleThumbMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        isDraggingRef.current = true;
        setIsDragging(true);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDraggingRef.current) return;
            const newHour = calculateHourFromPosition(e.clientX);
            setSelectedHours(newHour);
        };

        const handleMouseUp = () => {
            if (isDraggingRef.current) {
                // Small delay to prevent click event from firing after drag
                setTimeout(() => {
                    isDraggingRef.current = false;
                }, 100);
                setIsDragging(false);
            }
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, selectedHours]);

    return (
        <div className={styles.pricingWrapper}>
            <div className='container pt-5 pt-md-0'>

                {/* Hour Selection Slider */}
                <div className='row mb-5'>
                    <div className='col-12 text-center'>
                        <h2 className='mb-3 text-uppercase'>Hours required:</h2>
                        <p>Select total hours required each business day from our Brand Hub Design and Code teams.</p>
                    </div>
                    <div className='col-12'>
                        <div className={styles.hourSliderWrapper}>
                            <div className={styles.hourSliderContainer}>
                                <div className={styles.hourLabels}>
                                    {hours.map((hour) => {
                                        const position = ((hour - 2) / 6) * 100;
                                        return (
                                            <button
                                                key={hour}
                                                type="button"
                                                className={`${styles.hourLabel} ${selectedHours === hour ? styles.hourLabelActive : ''}`}
                                                onClick={() => setSelectedHours(hour)}
                                                style={{ left: `${position}%` }}
                                            >
                                                {hour}H
                                            </button>
                                        );
                                    })}
                                </div>
                                <div 
                                    ref={sliderTrackRef}
                                    className={styles.sliderTrack}
                                    onClick={handleTrackClick}
                                >
                                    <div 
                                        className={`${styles.sliderFill} ${isDragging ? styles.sliderFillDragging : ''}`}
                                        style={{ width: `${((selectedHours - 2) / 6) * 100}%` }}
                                    />
                                    <div 
                                        className={`${styles.sliderThumb} ${isDragging ? styles.sliderThumbDragging : ''}`}
                                        style={{ left: `${((selectedHours - 2) / 6) * 100}%` }}
                                        onMouseDown={handleThumbMouseDown}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                                        £{formatPrice(calculatePrice(designHubPrice))}<span>/month</span>
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
                                        £{formatPrice(calculatePrice(codeHubPrice))}<span>/month</span>
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
                                £{formatPrice(calculatePrice(designCodeHubPrice))}<span>/month</span>
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