import styles from './ThreeColumnsGrid.module.scss'
import Image from 'next/image'

const TwoColumnsTextImage = ({ data }) => {

    const { backgroundColor, grid, heading, textColor } = data;

    return (
        <div className={styles.threeColumnsGrid} style={{backgroundColor: backgroundColor, color: textColor}}>
            <div className='container py-5'>
                {heading && 
                    <div className='row mt-4 mb-5'>
                        <div className='col text-center'>
                            <h2>{heading}</h2>
                        </div>
                    </div>
                }
                {grid && 
                    <div className='row'>
                        {grid.map((row, i) => {
                            const { copy, icon } = row;
                            return (
                                <div key={i.toString()} className='col-md-4 px-lg-5 text-center d-flex flex-column gap-3 align-items-center mb-4'>
                                    <div className={styles.iconWrap}>
                                        <Image 
                                            src={icon.mediaItemUrl} 
                                            width={icon.mediaDetails.width} 
                                            height={icon.mediaDetails.height}
                                            alt={icon.altText}
                                        />
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: copy }} />
                                </div>
                            );
                        })}
                    </div>
                }
            </div>
        </div>
    );
}

export default TwoColumnsTextImage;