import Link from 'next/link'
import Logo from '../Logo'
import Navigation from '../Navigation'
import styles from './Header.module.scss'

const Header = ({ backgroundColor, color, fullMenu }) => {

    return (
        <div style={{backgroundColor: backgroundColor, color: color}}>
            <div className={`${styles.headerContainer} container py-3`}>
                <div className="row align-items-md-center justify-content-between">
                    <div className='col-2 col-md-auto'>
                        <Link href="/">
                            <Logo color={color} />
                        </Link>
                    </div>
                    {fullMenu &&
                        <div className='col-10 col-md-auto align-self-end d-flex flex-wrap align-items-center justify-content-end gap-3'>
                            <Navigation color={color} />
                            <div className='d-flex align-items-center gap-3 order-first order-md-last'>
                                <Link href="#form-request" className="cta__btn">Book a demo</Link>
                                <Link href="/pricing" className="cta__btn cta__btn--transparent">Sign up</Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;