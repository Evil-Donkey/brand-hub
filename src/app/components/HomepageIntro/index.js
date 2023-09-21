import Link from 'next/link'
import styles from './HomepageIntro.module.scss'

const Intro = ({ content, email, telephone, title }) => {
    return (
        <div className={styles.introContainer}>
            <div className={`${styles.introContainer} container`}>
                <div className='row justify-content-between align-items-end text-center text-md-start'>
                    {title &&
                        <div className='col-md-6 mb-5 mb-md-0'>
                            <h1>{title}</h1>
                        </div>
                    }
                    <div className='col-md-5'>
                        {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
                        <div className={`d-flex flex-column flex-lg-row gap-lg-3 align-items-center ${!content ? 'justify-content-end' : ''}`}>
                            <Link href="#form-request" className="cta__btn mt-3">Request demo</Link>
                            {telephone && <a href={`tel:${telephone}`} className="cta__btn cta__btn--transparent mt-3">Call us</a>}
                            {email && <a href={`mailto:${email}`} className="cta__btn cta__btn--transparent mt-3">Email us</a>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Intro;