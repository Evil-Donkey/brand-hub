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
                <div className='col-md-6'>
                    <div className={`${styles.imageWrap} p-3 p-md-4 d-flex flex-column`}>
                        <div>
                            <h2 className='mb-4'>Can I talk to someone?</h2>
                            <div className='row'>
                                <div className='col-lg-8'>
                                    <p>Sure, book a quick 15-minute call to see how we work and have a chat with one of our team.</p>
                                    <a href={bookDemoUrl} className="cta__btn cta__btn--light mt-3" target="_blank">Book a call</a>
                                </div>
                            </div>
                        </div>
                        <div className='align-self-end'>
                            <img src='/images/graphic-faq-2.svg' alt='FAQ Image' />
                        </div>
                    </div>
                </div>
                {data &&
                    <div className='col-md-5 mt-5 mt-md-0'>
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