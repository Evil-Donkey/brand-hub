import styles from './Footer.module.scss'
import Logo from '../Logo'

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
                    </div>
                    <div className='col-auto'>
                        <Logo color={color} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;