import Image from 'next/image'
import styles from './HomepageIntro.module.scss'

const Intro = ({ content }) => {
    return (
        <div className={styles.introContainer}>
            <div className={`${styles.introContainer} container py-5`}>
                <div className='row justify-content-between'>
                    <div className='col-md-5 mb-5'>
                        <Image src="/images/bh-logo.svg" alt="Brand Hub - Logo white" width="300" height="255" />
                    </div>
                    <div className='col-md-5'>
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Intro;