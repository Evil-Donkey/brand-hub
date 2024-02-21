import Image from "next/image";
import styles from './BranderContent.module.scss'

const BranderContent = ({ content }) => {

    const { branderName, branderQuote, branderPhoto, copyColumns } = content;
    
    return (content) ? (
        <div className={styles.branderContent}>
            <div className='py-5 container'>
                <div className="row">
                    <div className={`col d-flex flex-column flex-md-row ${styles.articleContentWrapper}`}>
                        {branderPhoto &&
                            <div className={`${styles.branderImage} ${styles.articleColumn}`}>
                                <Image
                                    src={branderPhoto?.mediaItemUrl}
                                    width={branderPhoto?.mediaDetails?.width}
                                    height={branderPhoto?.mediaDetails?.height}
                                    alt={branderPhoto?.altText}
                                />
                            </div>
                        }
                        {branderQuote &&
                            <div className={styles.articleColumn}>
                                <h2>{branderQuote}</h2>
                                <h4>Brander</h4>
                                <h3>{branderName}</h3>
                            </div>
                        }
                    </div>
                </div>

                {copyColumns &&
                    <div className='row'>
                        <div className={`col d-flex flex-column flex-md-row ${styles.articleContentWrapper}`}>
                            {copyColumns.map((column, i) => {
                                return (
                                    <div className={styles.articleColumn} key={i.toString()}>
                                        <div dangerouslySetInnerHTML={{ __html: column.copy }} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                }
            </div>
        </div>
    ) : null;
}

export default BranderContent;