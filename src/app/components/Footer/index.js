import Image from 'next/image'
import styles from './Footer.module.scss'

const Footer = ({ border }) => {
    return (
        <div className={`${styles.footerContainer} ${border ? styles.footerContainerBorder : ''} container`}>
            <div className='row justify-content-between align-items-center'>
                <div className='col-auto d-flex flex-column flex-md-row gap-5'>
                    <span>Contact us on: <a href="mailto:hello@brand-hub.co">hello@brand-hub.co</a></span>
                    <a href="/privacy-policy">Privacy policy</a>
                </div>
                <div className='col-auto'>
                    <Image src="/images/icon-bh-logo.svg" alt="" width="45" height="45" />
                </div>
            </div>
        </div>
    );
}

export default Footer;