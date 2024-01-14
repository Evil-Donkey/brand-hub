import Image from "next/image"
import Link from "next/link"

const BranderHero = ({ content, featuredImage, title }) => {
    
    return (content || title) ? (
        <div className='my-5 container'>
            <div className='row mb-5'>
                {title &&
                    <div className='col-md-8'>
                        <h1>{title}</h1>
                    </div>
                }
            </div>
            <div className='row justify-content-between'>
                <div className="col-md-5">
                    <Link href="/branders">
                        <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
                        <rect x="-0.00683594" width="42.4888" height="42.4888" rx="5" fill="white"/>
                        <path d="M24.8682 11L15.1181 21.0001L24.8682 31.0002" stroke="#231F20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>
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
    ) : null;
}

export default BranderHero;