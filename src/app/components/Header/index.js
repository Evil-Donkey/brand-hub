import Image from 'next/image'
import styles from './Header.module.scss'

const Header = () => {
    return (
        <div className={`${styles.headerContainer} container py-3`}>
            <div className='row justify-content-end'>
                <div className='col-auto'>
                    <Image src="/images/icon-bh-logo.svg" alt="" width="45" height="45" />
                </div>
            </div>
        </div>
    );
}

export default Header;