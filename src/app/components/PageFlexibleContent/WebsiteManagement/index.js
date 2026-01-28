'use client'

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import styles from './WebsiteManagement.module.scss';
import Link from 'next/link';
import ThemeColor from '../../../lib/ThemeColor';
import IconCoreBorder from '@/app/components/Icons/IconCoreBorder';
import IconCoreContentBorder from '@/app/components/Icons/IconCoreContentBorder';
import IconCoreContentHostingBorder from '@/app/components/Icons/IconCoreContentHostingBorder';
import IconCheckmark from '@/app/components/Icons/IconCheckmark';
import IconQuestionMark from '@/app/components/Icons/IconQuestionMark';

const WebsiteManagement = ({ data, websiteManagementServices }) => {

    const cardRefs = useRef([]);
    const sliderTrackRef = useRef(null);
    const isDraggingRef = useRef(false);
    const hours = [1, 4, 8, 10, 12, 14, 16];
    const [selectedHours, setSelectedHours] = useState(hours[0]);
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

    const { options, 
        contentPrice,
        contentSignUpUrl,
        coreContentPrice,
        coreContentSignUpUrl,
        corePrice,
        coreSignUpUrl } = data;

    // Calculate price adjustments based on hours (base is first hour value, add £60 per step)
    const hoursIndex = hours.indexOf(selectedHours);
    const priceAdjustment = hoursIndex * 60;

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

    const hasHourPattern = (serviceText) => {
        if (!serviceText) return false;
        const hourPattern = /(\d+)\s+(hour|hours)?/gi;
        return hourPattern.test(serviceText);
    };

    const formatServiceText = (serviceText) => {
        if (!serviceText) return serviceText;
        
        // Match patterns like "1 hour", "4 hours", "1 hour of", etc.
        const hourPattern = /(\d+)\s+(hour|hours)?/gi;
        const parts = [];
        let lastIndex = 0;
        let match;
        
        // Reset regex lastIndex
        hourPattern.lastIndex = 0;
        
        while ((match = hourPattern.exec(serviceText)) !== null) {
            // Add text before the match
            if (match.index > lastIndex) {
                parts.push(serviceText.substring(lastIndex, match.index));
            }
            
            // Add the highlighted hour text
            const hourText = `${selectedHours} ${selectedHours === 1 ? 'hour' : 'hours'}${match[3] || ''}`;
            parts.push(
                <span key={`hour-${match.index}`} className={styles.hourHighlight}>
                    {hourText}
                </span>
            );
            
            lastIndex = hourPattern.lastIndex;
        }
        
        // Add remaining text after last match
        if (lastIndex < serviceText.length) {
            parts.push(serviceText.substring(lastIndex));
        }
        
        // If no matches found, return original text
        if (parts.length === 0) return serviceText;
        
        return <>{parts}</>;
    };

    const calculateHourFromPosition = (clientX) => {
        if (!sliderTrackRef.current) return selectedHours;
        const rect = sliderTrackRef.current.getBoundingClientRect();
        const clickX = clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, clickX / rect.width));
        const index = Math.round(percentage * (hours.length - 1)); // Map to 0-5 for 6 steps
        return hours[Math.max(0, Math.min(hours.length - 1, index))];
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
            <div className='container pt-5'>

                {/* Hour Selection Slider */}
                <div className='row mb-5'>
                    <div className='col-12 text-center'>
                        <h2 className='mb-3 text-uppercase'>Monthly support:</h2>
                        <p>Select how many hours of daily support you need. Use this time flexibly across content updates, design, development and fixes.</p>
                    </div>
                    <div className='col-12'>
                        <div className={styles.hourSliderWrapper}>
                            <div className={styles.hourSliderContainer}>
                                <div className={styles.hourLabels}>
                                    {hours.map((hour, index) => {
                                        const position = (index / (hours.length - 1)) * 100;
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
                                        style={{ width: `${(hours.indexOf(selectedHours) / (hours.length - 1)) * 100}%` }}
                                    />
                                    <div 
                                        className={`${styles.sliderThumb} ${isDragging ? styles.sliderThumbDragging : ''}`}
                                        style={{ left: `${(hours.indexOf(selectedHours) / (hours.length - 1)) * 100}%` }}
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
                                        <IconCoreBorder />
                                    </div>
                                    <h2 className='mb-md-4 text-center'>core care</h2>
                                    {corePrice && <h3 className={`mb-4 text-center`}>
                                        £{formatPrice(calculatePrice(corePrice))}<span>/month</span>
                                    </h3>}
                                    {coreSignUpUrl && (
                                        <div className='align-self-center'>
                                            <Link href={coreSignUpUrl} target="_blank" className={`cta__btn cta__btn--yellow`}>Sign Up now</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='col-md-6 mb-5'>
                                <div ref={el => cardRefs.current[1] = el} className={`p-4 pt-5 py-md-5 rounded-2 d-flex flex-column h-100 position-relative ${styles.pricingOption} ${styles.pricingOptionDark}`}>
                                    <div className={styles.pricingOptionIcon}>
                                        <IconCoreContentBorder />
                                    </div>
                                    <h2 className='mb-md-4 text-center'>core + content</h2>
                                    {contentPrice && <h3 className={`mb-4 text-center`}>
                                        £{formatPrice(calculatePrice(contentPrice))}<span>/month</span>
                                    </h3>}
                                    {contentSignUpUrl && (
                                        <div className='align-self-center'>
                                            <Link href={contentSignUpUrl} target="_blank" className={`cta__btn cta__btn--yellow`}>Sign Up now</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 col-lg-5 mb-5 d-flex flex-column gap-3'>
                        <div ref={el => cardRefs.current[2] = el} className={`p-4 pt-5 py-md-5 rounded-2 d-flex flex-column h-100 position-relative ${styles.pricingOption} ${styles.pricingOptionLight}`}>
                            <div className={styles.pricingOptionIcon}>
                                <IconCoreContentHostingBorder />
                            </div>
                            <h2 className='mb-md-4 text-center'>Core + Content + Hosting</h2>
                            {coreContentPrice && <h3 className={`mb-4 text-center`}>
                                ~£{formatPrice(calculatePrice(coreContentPrice))}<span>/month*</span>
                            </h3>}
                            {coreContentSignUpUrl && (
                                <div className='align-self-center'>
                                    <Link href={coreContentSignUpUrl} target="_blank" className={`cta__btn cta__btn--dark`}>Sign Up now</Link>
                                </div>
                            )}
                        </div>
                        <p className={`px-md-4 ${styles.pricingSmallText}`}>*Final pricing for hosting depends on your platform, traffic and the overall scale of your website. We complete a short assessment before confirming your final monthly fee.</p>
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
                                        <IconCoreBorder />
                                        <h3 className="text-uppercase">Core Care</h3>
                                    </th>
                                    <th className={`${styles.pricingTableThSecond} text-center`}>
                                        <IconCoreContentBorder />
                                        <h3 className="text-uppercase">Core + Content</h3>
                                    </th>
                                    <th className={`${styles.pricingTableThLast} text-center`}>
                                        <IconCoreContentHostingBorder />
                                        <h3 className="text-uppercase">Core + Content + Hosting</h3>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {websiteManagementServices.map((service, i) => {
                                    const isHourService = hasHourPattern(service);
                                    return (
                                        <tr key={`service-${i}`}>
                                            <td className={styles.serviceCell}>
                                                <span className={`${styles.serviceTextWrapper} d-flex justify-content-between`}>
                                                    <span>{formatServiceText(service)}</span>
                                                    {isHourService && (
                                                        <span className={styles.tooltipWrapper}>
                                                            <IconQuestionMark />
                                                            <span className={styles.tooltip}>
                                                                Your time can be used flexibly across content updates, design, development and fixes. Requests are acknowledged within 24 hours, with work typically starting within 24 hours, plus instant support for outages during office hours.
                                                            </span>
                                                        </span>
                                                    )}
                                                </span>
                                            </td>
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
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebsiteManagement;