"use client";
import { useEffect, useState } from "react";
import styles from './Footer.module.scss'
import Logo from '../Logo'
import Image from 'next/image'

const Footer = ({ border, color, backgroundColor, email, telephone }) => {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        // Check if the script is already added to avoid duplication
        if (!document.querySelector('script[src*="tp.widget.bootstrap.min.js"]')) {
        const script = document.createElement("script");
        script.src = "//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
        script.async = true;
        script.onload = () => setScriptLoaded(true); // Ensure widget initializes after script loads
        document.body.appendChild(script);
        } else {
        setScriptLoaded(true); // If script is already in DOM, mark it as loaded
        }
    }, [scriptLoaded]);
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
                        <div
                            className="trustpilot-widget"
                            data-locale="en-GB"
                            data-template-id="56278e9abfbbba0bdcd568bc"
                            data-businessunit-id="667155aa1202bb5fdad9a4cb"
                            data-style-height="52px"
                            data-style-width="100%"
                        >
                            <a href="https://uk.trustpilot.com/review/brand-hub.co" target="_blank" rel="noopener">Trustpilot</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;