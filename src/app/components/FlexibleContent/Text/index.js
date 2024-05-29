import styles from './Text.module.scss'

const Text = ({ data }) => {
    const copy = data?.copy;
    const copy2 = data?.copy2;

    return (
        <div className={`row justify-content-end ${styles.textWrapper}`}>
            {copy &&
                <div className={`col-md-${copy2 ? '4' : '5'}`}>
                    <div dangerouslySetInnerHTML={{ __html: copy }} />
                </div>
            }
            {copy2 &&
                <div className='col-md-4'>
                    <div dangerouslySetInnerHTML={{ __html: copy2 }} />
                </div>
            }
        </div>
    )
}

export default Text;