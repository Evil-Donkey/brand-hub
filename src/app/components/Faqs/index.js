'use client'

import { useState } from 'react';
import styles from './Faqs.module.scss';

const Faqs = ({ data, bookDemoUrl }) => {

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
                        <a href={bookDemoUrl} className="cta__btn cta__btn--dark" target="_blank">Book a demo</a>
                    </div>
                </div>
                {data &&
                    <div className='col-md-6 mt-5 mt-md-0'>
                        <h2>FAQ:</h2>
                        <ul>
                            {data.map((faq, i) => {
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