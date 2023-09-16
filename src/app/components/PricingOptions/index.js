import Image from 'next/image'
import styles from './PricingOptions.module.scss'

const PricingOptions = ({ pricingOptions }) => {
    return pricingOptions && (
        <div className={styles.pricingOptionstWrap}>
            <div className='container py-5'>
                <div className="row justify-content-center">
                    {pricingOptions.map((option, i) => {
                        const { backgroundColor, included, name, textColor, image } = option;
                        return (        
                            <div className='col-lg-4 mb-5' key={i.toString()}>
                                <div className={`p-4 p-sm-5 px-lg-4 py-lg-5 rounded-3 ${styles.pricingOption} ${textColor == 'dark' ? styles.pricingOptionDark : ''}`} style={{ backgroundColor: backgroundColor, color: textColor == 'dark' ? '#393939' : '#ffffff' }}>
                                    <h2 className='text-center'>{name}</h2>
                                    <div className={`${styles.pricingImage} d-flex align-items-center justify-content-center`}>
                                        <figure>
                                            <Image src={image.mediaItemUrl} width={image.mediaDetails.width} height={image.mediaDetails.height} alt={image.altText} />
                                        </figure>
                                    </div>
                                    {included &&
                                        <div className='mt-5'>
                                            <p>Included:</p>
                                            <div dangerouslySetInnerHTML={{ __html: included }} />
                                        </div>
                                    }
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default PricingOptions;