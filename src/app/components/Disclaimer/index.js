import styles from './Disclaimer.module.scss'

const Disclaimer = ({ disclaimer }) => {

    return (
        <div className={styles.disclaimer}>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-md-9'>
                        <div dangerouslySetInnerHTML={{ __html: disclaimer }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Disclaimer;