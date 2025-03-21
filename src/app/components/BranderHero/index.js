import styles from './BranderHero.module.scss'
import Image from "next/image"
import Link from "next/link"
import Share from "../Share"

const BranderHero = ({ content, featuredImage, title }) => {
    
    return (content || title) ? (
        <div className={styles.heroWrapper}>
            <div className='container'>
                <div className='row mb-5'>
                    {title &&
                        <div className='col-md-7'>
                            <h1>{title}</h1>
                        </div>
                    }
                </div>
                <div className='row justify-content-between'>
                    <div className="col-md-5 mb-5 d-flex flex-md-column align-items-start">
                        <Link href="/branders" className={`me-4 me-md-0 mb-md-4 ${styles.ctaButton}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
                            <rect x="-0.00683594" width="42.4888" height="42.4888" rx="5" fill="white"/>
                            <path d="M24.8682 11L15.1181 21.0001L24.8682 31.0002" stroke="#231F20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                        <Share />
                    </div>
                    {content &&
                        <div className='col-md-5'>
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </div>
                    }
                </div>
                {featuredImage &&
                    <div className='row my-5 pb-5'>
                        <div className='col'>
                            <Image
                                src={featuredImage.mediaItemUrl}
                                width={featuredImage.mediaDetails?.width}
                                height={featuredImage.mediaDetails?.height}
                                alt={featuredImage.altText}
                                priority
                            />
                        </div>
                    </div>
                }
            </div>
        </div>
    ) : null;
}

export default BranderHero;