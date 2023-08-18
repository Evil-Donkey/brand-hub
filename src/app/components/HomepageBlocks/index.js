import Image from 'next/image'
import styles from './HomepageBlocks.module.scss'

const Blocks = ({ sections }) => {
    return sections && (
        <>
            {sections.map((section, i) => {
                console.log(section);
                const { copy, ctaLabel, ctaUrl, image } = section;
                return (
                    <div key={i.toString()} className={`d-flex flex-wrap align-items-center justify-content-center ${styles.sectionWrap} ${i % 2 == 0 ? styles.sectionWrapLight : ''}`}>
                        <Image 
                            className={`${styles.sectionImage} ${i % 2 == 0 ? styles.sectionImageRight : ''}`} 
                            src={image.mediaItemUrl} 
                            width={image.mediaDetails.width} 
                            height={image.mediaDetails.height}
                            alt={image.altText}
                        />
                        <div className='container py-5'>
                            <div className={`row align-items-center ${i % 2 != 0 ? 'justify-content-end' : ''}`}>
                                <div className='col-md-5'>
                                    <div dangerouslySetInnerHTML={{ __html: copy }} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default Blocks;