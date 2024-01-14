import Image from "next/image";
import styles from './BranderContent.module.scss'

const BranderContent = ({ content }) => {

    const { branderName, branderQuote, branderPhoto, copyColumns } = content;
    const { altText, mediaItemUrl, mediaDetails } = branderPhoto;
    
    return (content) ? (
        <div className={styles.branderContent}>
            <div className='py-5 container'>
                <div className="row">
                    {branderPhoto &&
                        <div className="col-md-6">
                            <Image
                                src={mediaItemUrl}
                                width={mediaDetails?.width}
                                height={mediaDetails?.height}
                                alt={altText}
                            />
                        </div>
                    }
                    {branderQuote &&
                        <div className="col-md-6 ps-md-5">
                            <h2>{branderQuote}</h2>
                            <h4>Brander</h4>
                            <h3>{branderName}</h3>
                        </div>
                    }
                </div>

                {copyColumns &&
                    <div className='row'>
                        {copyColumns.map((column, i) => {
                            return (
                                <div className='col-md-6 mb-4' key={i.toString()}>
                                    <div dangerouslySetInnerHTML={{ __html: column.copy }} />
                                </div>
                            );
                        })}
                    </div>
                }
            </div>
        </div>
    ) : null;
}

export default BranderContent;