import Link from 'next/link'
import styles from './HomepageIntro.module.scss'

const Intro = ({ content, telephone, title }) => {
    return (
        <div className={styles.introContainer}>
            <div className={`${styles.introContainer} container`}>
                <div className='row justify-content-between align-items-end'>
                    {title &&
                        <div className='col-md-6 mb-5 mb-md-0'>
                            <h1>{title}</h1>
                        </div>
                    }
                    <div className='col-md-5'>
                        {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
                        <div className={`d-flex gap-3 align-items-center ${!content ? 'justify-content-end' : ''}`}>
                            <Link href="#form-request" className="cta__btn mt-3 mb-4">Request demo</Link>
                            {telephone && <a href={`tel:${telephone}`} className="cta__btn cta__btn--transparent mt-3 mb-4">{telephone}</a>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Intro;