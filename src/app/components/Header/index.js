'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '../Logo'
import LogoServices from '../LogoServices'
import Navigation from '../Navigation'
import styles from './Header.module.scss'
import ThemeColor from '../../lib/ThemeColor'

const Header = ({ backgroundColor, bookDemoUrl, color, discountBarCopy, fullMenu, hideSignUp, themeColour, codeHub, designHub }) => {

    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const thColour = ThemeColor({ themeColour });

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            
            if (currentScrollTop >= maxScroll) {
                setIsScrollingUp(true);
            } else if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
                setIsScrollingUp(false);
            } else {
                setIsScrollingUp(true);
            }
            setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
        };

        if (!isMobileMenuOpen) {
            window.addEventListener('scroll', handleScroll);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop, isMobileMenuOpen]);

    return (
        <div
            className={`${styles.headerContainerWrapper} ${fullMenu ? styles.fixedHeader : ''} ${isScrollingUp ? '' : styles.headerHidden}`}
            style={{ backgroundColor: backgroundColor, color: color }}
        >
            {discountBarCopy &&
                <div className={styles.discountBar} style={{ backgroundColor: thColour }}>
                    <div className='container'>
                        <div className='row justify-content-center'>
                            <div className='col-auto'>
                                <Link href="/pricing">
                                    <p dangerouslySetInnerHTML={{ __html: discountBarCopy }} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className={`${styles.mobileMenuBackground} ${isMobileMenuOpen ? styles.mobileMenuBackgroundActive : ''}`} />
            <div className={`${styles.headerContainer} container`}>
                <div className="row align-items-md-center justify-content-between">
                    <div className={`col-2 col-md-auto ${styles.logoContainer}`}>
                        <Link href="/">
                            {codeHub ? <LogoServices codeHub={codeHub} /> : designHub ? <LogoServices designHub={designHub} /> : <Logo color={color} />}
                        </Link>
                    </div>
                    {fullMenu &&
                        <div className='col-10 col-md-auto align-self-end d-flex flex-wrap align-items-center justify-content-end gap-2 position-relative'>
                            <Navigation 
                                color={color} 
                                bookDemoUrl={bookDemoUrl} 
                                isMobileMenuOpen={isMobileMenuOpen}
                                setIsMobileMenuOpen={setIsMobileMenuOpen}
                            />
                            <a href={bookDemoUrl} target="_blank" className="cta__btn cta__btn--transparent">Book a call</a>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;