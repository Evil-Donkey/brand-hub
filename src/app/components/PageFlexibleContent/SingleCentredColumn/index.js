import styles from './SingleCentredColumn.module.scss'

const SingleCentredColumn = ({ data }) => {

    const { backgroundColor, copy, textColor } = data;

    return (
        <div style={{backgroundColor: backgroundColor, color: textColor}}>
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