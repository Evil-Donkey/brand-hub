import styles from './SingleColumn.module.scss'
import Link from 'next/link'
import ThemeColor from '@/app/lib/ThemeColor'

const SingleColumn = ({ data, themeColour }) => {

    const { darkMode, heading, copy, buttons } = data;

    const thColour = ThemeColor({ themeColour });

    return (
        <div className={`${styles.singleColumn} ${darkMode ? styles.darkMode : styles.lightMode}`}>
            <div className={`${styles.singleColumn} container`}>
                <div className='row'>
                    <div className='col-md-10'>
                        {heading && <h2 className={styles.heading} style={{color: thColour}}>{heading}</h2>}
                        {copy && <div dangerouslySetInnerHTML={{ __html: copy }} />}
                        {buttons &&
                            <div className='d-flex flex-column flex-lg-row align-items-lg-center gap-lg-3 mt-5'>
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

export default SingleColumn;