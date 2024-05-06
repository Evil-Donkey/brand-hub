import Link from 'next/link'
import Logo from '../Logo'
import Navigation from '../Navigation'
import styles from './Header.module.scss'

const Header = ({ backgroundColor, color, fullMenu }) => {

    return (
        <div style={{backgroundColor: backgroundColor, color: color}}>
            <div className={`${styles.headerContainer} container py-3`}>
                <div className="row align-items-center justify-content-between">
                    <div className='col-auto'>
                        <Link href="/">
                            <Logo color={color} />
                        </Link>
                    </div>
                    {fullMenu &&
                        <div className='col-auto align-self-end'>
                            <Navigation color={color} />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;