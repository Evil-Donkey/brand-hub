'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '../Logo'
import Navigation from '../Navigation'
import styles from './Header.module.scss'

const Header = ({ backgroundColor, bookDemoUrl, color, discountBarCopy, fullMenu, hideSignUp }) => {

    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const [lastScrollTop, setLastScrollTop] = useState(0);

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

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);


    // const [isScrollingUp, setIsScrollingUp] = useState(true);
    // const [lastScrollTop, setLastScrollTop] = useState(0);
    // const [hideDiscountBar, setHideDiscountBar] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    //         if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
    //             setIsScrollingUp(false);
    //             setHideDiscountBar(true);
    //         } else if (currentScrollTop <= 100) {
    //             setIsScrollingUp(true);
    //             setHideDiscountBar(false);
    //         } else {
    //             setIsScrollingUp(true);
    //         }
    //         setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, [lastScrollTop]);

    return (
        <div
            className={`${styles.headerContainerWrapper} ${fullMenu ? styles.fixedHeader : ''} ${isScrollingUp ? '' : styles.headerHidden}`}
            style={{ backgroundColor: backgroundColor, color: color }}
        >
            {discountBarCopy &&
                <div className={styles.discountBar}>
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
                                <a href={bookDemoUrl} target="_blank" className="cta__btn">Book a demo</a>
                                {!hideSignUp && <Link href="/pricing" className="cta__btn cta__btn--transparent">Sign up</Link>}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;