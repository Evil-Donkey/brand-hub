import Link from 'next/link'
import Image from 'next/image'
import styles from './BrandersGrid.module.scss'

const BrandersGrid = ({ branders }) => {
    return (branders) ? (
        <div className={`my-5 container ${styles.brandersGrid}`}>
            <div className='row'>
                <ul className='col-12 m-0 d-flex flex-wrap d-md-grid gap-3 list-unstyled'>
                    {branders.map((brander, i) => {
                        const { thumbnail, branderQuote, branderName, specialBadge } = brander.branderOptions;
                        const slug = brander.slug;
                        return (
                            <li key={brander.id} className='p-md-5' style={{ backgroundImage: `url(${thumbnail.mediaItemUrl})` }}>
                                <Link href={`/branders/${slug}`} className='p-4 p-md-0 d-flex align-items-end w-100 h-100'>
                                    <div className='d-flex flex-column'>
                                        {specialBadge && <Image className='mb-3' src="/images/icon-career-special.svg" width={91} height={94} alt="Career special badge" />}
                                        {branderQuote && <h2>{branderQuote}</h2>}
                                        {branderName && <h3>{branderName}</h3>}
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    ) : null;
}

export default BrandersGrid;