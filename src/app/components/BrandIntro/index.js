import styles from './BrandIntro.module.scss'

const BrandIntro = ({ data, author }) => {
    const title = data?.title;
    // const agencyName = data?.agencies.nodes[0].name;
    
    return title && (
        <div className="container py-5">
            <div className="row row-cols-1">
            {title
            && <div className="col">
                <h1 className={styles.title}>{title}</h1>
            </div>}
            {author
            && <div className="col">
                <h3 className={styles.subtitle}>Agency: <span>{author}</span></h3>
            </div>}
            </div>
        </div>
    )
}

export default BrandIntro;