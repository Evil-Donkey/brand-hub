import styles from './Footer.module.scss'
import Logo from '../Logo'
import Image from 'next/image'

const Footer = ({ border, color, backgroundColor, email, telephone }) => {
    return (
        <div className={styles.footerWrapper} style={{ backgroundColor: backgroundColor }}>
            <div className={`${styles.footerContainer} ${border ? styles.footerContainerBorder : ''} container`} style={{ borderColor: color }}>
                <div className='row justify-content-between align-items-center'>
                    <div className='col-auto d-flex flex-column flex-lg-row gap-2 gap-lg-5' style={{color: color}}>
                        {email && <span>Email: <a href={`mailto:${email}`}>{email}</a></span>}
                        {telephone && <span>Telephone: <a href={`tel:${telephone}`}>{telephone}</a></span>}
                        <a href="/privacy-policy">Privacy policy</a>
                        <a href="/terms-of-service">Terms of Service</a>
                        <a href="/branders">Branders Blog</a>
                        <a href="/contact">Contact us</a>
                        <a href="https://billing.stripe.com/p/login/28obKX11v2os6KA3cc" target="_blank">Client login</a>
                    </div>
                    <div className='col-auto'>
                        <Logo color={color} />
                    </div>
                </div>
            </div>
            <div className='container pb-4 pt-3'>
                <div className='row justify-content-center'>
                    <div className='col-auto text-center d-flex flex-column gap-3'>
                        <Image src='/images/logo-trustpilot-2.png' width={335} height={45} alt='Trustpilot score' />
                        <a className='text-decoration-underline text-white' href='https://www.trustpilot.com/review/brand-hub.co' target='_blank'>Read our Trustpilot reviews</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;