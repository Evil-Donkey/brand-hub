'use client'

import Drop from '../Drop'
import styles from './HomepageIntro.module.scss'

const HomeIntro = ({ 
    backgroundColor, 
    color, 
    content,
    featuredImage,
    title }) => {

    const image = featuredImage ? featuredImage.node : null;

    return (
        <div className={styles.introContainer} style={{backgroundColor: backgroundColor, color: color}}>
            <div className='container'>
                <div className='row mb-4'>
                    <div className='col'>
                        <h2 className={styles.introHeading1}>Looking for</h2>
                    </div>
                </div>

                {content &&
                    <div className='row'>
                        <div className='col'>
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                    </div>
                }
                
                
                <div className='row justify-content-center align-items-end mt-4'>
                    <div className='col-md-5 order-last order-md-first'>
                        {image && <img src={image.mediaItemUrl} alt={image.altText} />}
                    </div>
                    <div className="col-md-6">
                        {title &&
                            <div className='row justify-content-md-end'>
                                <div className='col-auto'>
                                    <h2 className={styles.introHeading2} dangerouslySetInnerHTML={{ __html: title }} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Drop colour="#ffffff" />
        </div>
    );
}

export default HomeIntro;