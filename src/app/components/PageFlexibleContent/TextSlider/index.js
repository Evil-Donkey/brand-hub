"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './TextSlider.module.scss'

const TextSlider = ({ data }) => {

    const { style, slider } = data;

    return (
        <div className={`${styles.textSlider} container`}>
            <Swiper
                modules={[Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                watchOverflow={true}
                pagination={{ clickable: true }}
                style={{
                    '--swiper-pagination-color': `var(--colour-${style})`,
                    '--swiper-pagination-bullet-inactive-color': 'var(--colour-white-00)',
                    '--swiper-pagination-bullet-inactive-opacity': '1',
                    '--swiper-pagination-bullet-opacity': '1',
                    '--swiper-pagination-bullet-size': '17px',
                    '--swiper-pagination-bullet-width': '17px',
                    '--swiper-pagination-bullet-height': '17px',
                    '--border-colour': `var(--colour-${style})`,
                }}
            >
                {slider.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className='row justify-content-center'>
                            <div className='col-md-10 text-center'>
                                <h2 dangerouslySetInnerHTML={{ __html: slide.copy }} />
                                <p className={styles.author} style={{ color: `var(--colour-${style})` }}>{slide.author}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default TextSlider;