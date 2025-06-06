import styles from './SingleCentredColumn.module.scss'

const SingleCentredColumn = ({ data, showreel }) => {

    const { backgroundColor, copy, textColor } = data;

    return (
        <div className={showreel ? 'd-none d-md-block' : ''} style={{backgroundColor: backgroundColor, color: textColor}}>
            <div className={`${styles.singleCentredColumn} container`}>
                <div className='row justify-content-center'>
                    <div className={`col text-center ${styles.copy}`}>
                        <div dangerouslySetInnerHTML={{ __html: copy }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleCentredColumn;