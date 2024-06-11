import styles from './TwoBoxes.module.scss'
import Image from 'next/image'

const TwoBoxes = ({ data }) => {

    const { backgroundColor, boxes, heading, textColor } = data;

    return (
        <div style={{backgroundColor: backgroundColor, color: textColor}}>
            <div className={`${styles.twoBoxes} container d-flex flex-column align-items-center justify-content-center`}>
                {heading && 
                    <div className='row'>
                        <div className='col text-center'>
                            <div dangerouslySetInnerHTML={{ __html: heading }} />
                        </div>
                    </div>
                }
                <div className='row'>
                    {boxes.map((row, i) => {
                        const { backgroundColor, color, copy, graphic } = row;

                        return (
                            <div key={i.toString()} className='col-md-6 mb-4 mb-md-0'>
                                <div className={`${styles.box} px-4 pt-4 h-100 d-flex flex-column align-items-end`} style={{backgroundColor: backgroundColor, color: color}}>
                                    <div dangerouslySetInnerHTML={{ __html: copy }} />
                                    {graphic && 
                                        <div className='mt-4'>
                                            <Image src={graphic.mediaItemUrl} alt={graphic.altText} width={graphic.mediaDetails.width} height={graphic.mediaDetails.height} />
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

export default TwoBoxes;