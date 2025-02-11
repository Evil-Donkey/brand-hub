'use client'
 
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import {isMobile} from 'react-device-detect'
import Link from 'next/link'
import styles from './Navigation.module.scss'
import IconDesign from '../Icons/IconDesign'
import IconCode from '../Icons/IconCode'
import IconHamburger from '../Icons/IconHamburger'
import IconClose from '../Icons/IconClose'

const Navigation = ({ bookDemoUrl, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const pathname = usePathname();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

  const navigationMenu = [
        {
            label: 'Home',
            href: '/',
            activeSegment: ''
        },
        {
            label: 'Our work',
            href: '/our-work',
            activeSegment: 'our-work'
        },
        {
            label: 'Our Services',
            dropdown: [
                {
                    label: 'Design Hub',
                    href: '/design-hub',
                    activeSegment: 'design-hub',
                    icon: <IconDesign />
                },
                {
                    label: 'Code Hub',
                    href: '/code-hub',
                    activeSegment: 'code-hub',
                    icon: <IconCode />
                }
            ]
        },
        {
            label: 'Our plans',
            href: '/pricing',
            activeSegment: 'pricing'
        },
    ];
 
    return (
        <>
            <div className={`${styles.navigationMenu} ${isMobileMenuOpen ? 'd-flex' : 'd-none d-lg-flex'}`}>
                <ul className="list-unstyled m-0 p-0 d-flex">
                    {navigationMenu.map((link, i) => {
                        if (link.dropdown) {
                            return (
                                <li key={link.label} className={`dropdown ${styles.dropdown}`} style={{ '--i': i }}>
                                    <span className={`dropdown-toggle ${styles.dropdownToggle} cta__btn cta__btn-no-shadow d-none d-lg-block`}>{link.label}</span>
                                    <ul className={`dropdown-menu ${styles.dropdownMenu}`}>
                                        {link.dropdown.map((sublink, index) => {
                                            const isActive = pathname === sublink.href;
                                            return (
                                                <li key={sublink.label} style={{ '--i': index }}>
                                                    <Link href={sublink.href} className={`${styles.cta__btn} cta__btn d-flex align-items-center gap-1 ${isActive ? `${styles.active}` : ''}`}>
                                                        {sublink.icon}
                                                        {sublink.label}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            );
                        } else {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.label} style={{ '--i': i }}>
                                    <Link href={link.href} className={`cta__btn ${isActive ? 'active' : ''}`}>
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        }
                    })}
                </ul>
                {bookDemoUrl && 
                    <div className={styles.bookDemoButton}>
                        <a href={bookDemoUrl} target="_blank" className="cta__btn cta__btn--transparent d-lg-none">Book a call</a>
                    </div>
                }
            </div>
            <div className={`${styles.mobileMenu} cta__btn d-lg-none order-last`} onClick={toggleMobileMenu}>
                {!isMobileMenuOpen ? <IconHamburger /> : <IconClose />}
            </div>
        </>
    )
};

export default Navigation;
