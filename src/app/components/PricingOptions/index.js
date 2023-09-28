'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './PricingOptions.module.scss'

const pricingTabNav = [
    'Monthly',
    'Annual'
]

const PricingOptions = ({ pricingOptions }) => {

    const [activeNav, setActiveNav] = useState(1);
    const handleOnClick = (i) => {
        setActiveNav(i);
    }

    return pricingOptions && (
        <div className={styles.pricingOptionstWrap}>
            <div className='container py-5'>
                {pricingTabNav &&
                    <div className='row justify-content-center mb-5'>
                        <div className='col-auto'>
                            <ul className={`m-0 p-0 list-unstyled d-flex ${styles.pricingTabNav}`}>
                                {pricingTabNav.map((nav, i) => (
                                    <li key={i.toString()} className={activeNav === i ? styles.active : ''} onClick={() => handleOnClick(i)}>{nav}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                }
                <div className="row justify-content-center">
                    {pricingOptions.map((option, i) => {
                        const { backgroundColor, included, name, textColor, image, imageMonthly } = option;
                        
                        const url = activeNav == 0 && imageMonthly ? imageMonthly.mediaItemUrl : image.mediaItemUrl;
                        const width = activeNav == 0 && imageMonthly ? imageMonthly.mediaDetails.width : image.mediaDetails.width;
                        const height = activeNav == 0 && imageMonthly ? imageMonthly.mediaDetails.height : image.mediaDetails.height;
                        const altText = activeNav == 0 && imageMonthly ? imageMonthly.altText : image.altText;
                        
                        return (        
                            <div className='col-lg-3 mb-5' key={i.toString()}>
                                <div className={`p-5 px-md-4 rounded-3 ${styles.pricingOption} ${textColor == 'dark' ? styles.pricingOptionDark : ''}`} style={{ backgroundColor: backgroundColor, color: textColor == 'dark' ? '#393939' : '#ffffff' }}>
                                    <h2 className='text-center'>{name}</h2>
                                    <div className={`${styles.pricingImage} d-flex align-items-center justify-content-center`}>
                                        <figure>
                                            <Image src={url} width={width} height={height} alt={altText} />
                                        </figure>
                                    </div>
                                    {included &&
                                        <div className='mt-3 mt-md-5'>
                                            <p>Included:</p>
                                            <div dangerouslySetInnerHTML={{ __html: included }} />
                                        </div>
                                    }
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default PricingOptions;