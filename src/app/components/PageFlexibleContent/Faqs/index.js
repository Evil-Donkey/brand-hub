'use client'

import { useState } from 'react';
import styles from './Faqs.module.scss';
import Link from 'next/link';

const Faqs = ({ data }) => {
    const { faqs } = data;
    const [openIndices, setOpenIndices] = useState([]);

    const handleToggle = (index) => {
        if (openIndices.includes(index)) {
            setOpenIndices(openIndices.filter(i => i !== index));
        } else {
            setOpenIndices([...openIndices, index]);
        }
    };

    return (
        <div className={`container ${styles.faqs}`}>
            <div className='row justify-content-between'>
                <div className='col-md-5'>
                    <div className={`${styles.imageWrap} p-3 p-md-4 d-flex flex-column align-items-center text-center`}>
                        <img src='/images/graphic-faq.svg' alt='FAQ Image' />
                        <h2 className='my-4'>Book a 15-minute demo</h2>
                        <Link href="#form-request" className="cta__btn cta__btn--dark">Book a demo</Link>
                    </div>
                </div>
                {faqs &&
                    <div className='col-md-6 mt-5 mt-md-0'>
                        <h2>FAQ:</h2>
                        <ul>
                            {faqs.map((faq, i) => {
                                const { answer, question } = faq;
                                return (
                                    <li key={i.toString()} className={`${openIndices.includes(i) ? styles.open : ''}`}>
                                        <h3 onClick={() => handleToggle(i)}>{question}</h3>
                                        {openIndices.includes(i) && (
                                            <div dangerouslySetInnerHTML={{ __html: answer }} />
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                }
            </div>
        </div>
    );
};

export default Faqs;