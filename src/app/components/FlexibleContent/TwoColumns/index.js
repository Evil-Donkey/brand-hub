
import Image from 'next/image'
import styles from './TwoColumns.module.scss'

const TwoColumns = ({ data }) => {
    const blocks = data?.blocks;
    const n = parseInt(blocks.length);
    const colClass = (n % 3 == 0) ? 'col-md-4' : 'col-md-6';

    return blocks && (
        <div className='row justify-content-end'>
            {blocks.map((block, i) => {
                const { altText, mediaItemUrl, mediaDetails, sizes } = block?.image;
                const copy = block?.copy;
                return block && (
                    <div key={i.toString()} className={`${colClass} mb-5`}>
                        {mediaItemUrl &&
                            <div className={styles.assetImageWrap}>
                                <Image 
                                    src={mediaItemUrl}
                                    alt={altText}
                                    width={mediaDetails?.width}
                                    height={mediaDetails?.height}
                                    sizes={sizes}
                                />
                            </div>
                        }
                        {copy && 
                            <div className='row'>
                                <div className='col-md-8'>
                                    <div dangerouslySetInnerHTML={{ __html: copy }} />
                                </div>
                            </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default TwoColumns;