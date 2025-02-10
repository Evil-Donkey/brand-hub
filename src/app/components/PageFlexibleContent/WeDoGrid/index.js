import styles from './WeDoGrid.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import ThemeColor from '@/app/lib/ThemeColor'

const WeDoGrid = ({ data, themeColour }) => {

    const { cards, buttons } = data;

    const thColour = ThemeColor({ themeColour });

    return (
        <div className={`${styles.weDoGrid}`}>
            <div className='container'>

                {cards &&
                    <div className='row justify-content-center'>
                        {cards.map((card, i) => {
                            const { heading, copy, image } = card;
                            return (
                                <div key={i.toString()} className='col-10 col-md-6 col-lg-4 mb-5'>
                                    <div className={styles.card}>
                                        {image && <div className={styles.cardImage} style={{backgroundImage: `url(${image.mediaItemUrl})`}} />}
                                        {heading && <h3 style={{color: thColour}}>{heading}</h3>}
                                        {copy && <p>{copy}</p>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                }
        
                <div className='row justify-content-center'>
                    <div className='col-9 col-lg-auto'>
                        {buttons &&
                            <div className='d-flex flex-column flex-lg-row align-items-lg-center gap-lg-3'>
                                {buttons.map((button, i) => {
                                    return (
                                        <Link key={i.toString()} href={button.url} className={`cta__btn cta__btn--${button.style} mb-3 mb-lg-0`}>{button.label ? button.label : 'Find out more'}</Link>
                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeDoGrid;