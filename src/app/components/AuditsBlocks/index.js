'use client'

import Image from 'next/image'
import styles from './AuditsBlocks.module.scss'

const AuditsBlocks = ({ features }) => {
    
    return features && (
        <div className="container">
            <div className="row">
                {features.map((feature, i) => {
                    const { description, graphic, title } = feature;
                    return (
                        <div key={i.toString()} className={`col-md-4 d-flex flex-column justify-content-between ${styles.featureWrap}`}>
                            {graphic &&
                                <div className="d-flex align-items-center justify-content-center justify-contene-md-start mb-4">
                                    <Image
                                        src={graphic.mediaItemUrl} 
                                        width={graphic.mediaDetails.width} 
                                        height={graphic.mediaDetails.height}
                                        alt={graphic.altText}
                                    />
                                </div>
                            }
                            <div>
                                {title && <h2>{title}</h2>}
                                {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AuditsBlocks;