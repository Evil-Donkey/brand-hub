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
                        <div className='col-auto align-self-end d-flex align-items-center gap-3'>
                            <Navigation color={color} />
                            {/* <Link href="#form-request" className="cta__btn">Book a demo</Link>
                            <Link href="/pricing" className="cta__btn cta__btn--transparent">Sign up</Link> */}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;