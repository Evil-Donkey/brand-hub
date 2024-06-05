import styles from './BrandersHero.module.scss'

const BrandersHero = ({ content, join, title }) => {
    
    return (content || title) ? (
        <div className={styles.heroWrapper}>
            <div className='container'>
                <div className='row justify-content-between'>
                    <div className='col-md-6 mb-4 mb-md-0'>
                        <h1>{title}</h1>
                    </div>
                    <div className='col-md-5 d-flex flex-column gap-4 justify-content-between'>
                        {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
                        {join && 
                            <div className={styles.joinWrapper}>
                                <div dangerouslySetInnerHTML={{ __html: join }} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}

export default BrandersHero;