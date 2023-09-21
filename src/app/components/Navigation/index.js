'use client'
 
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {isMobile} from 'react-device-detect'
import Link from 'next/link'
import styles from './Navigation.module.scss'
 
const Navigation = () => {
  const pathname = usePathname();

    useEffect(() => {
        document.documentElement.style.setProperty("--theme-color-00", '#ffffff');
    }, []);

  const navigationMenu = [
        {
            label: ' Home',
            href: '/',
            activeSegment: ''
        },
        {
            label: ' Why',
            href: '/why',
            activeSegment: 'about'
        },
        {
            label: ' Pricing',
            href: '/pricing',
            activeSegment: 'pricing'
        },
        {
            label: ' Contact',
            href: '/contact',
            activeSegment: 'contact'
        },
    ];
 
    return (
        <ul className={`${styles.navigationWrap} list-unstyled m-0 p-0 d-flex gap-3 gap-md-4`}>
            {navigationMenu.map((link) => {
                const isActive = pathname === link.href;
    
                return (
                    <li key={link.label} className={isActive ? styles.navigationItemActive : ''}>
                        <Link href={link.href}>
                            {link.label}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
};

export default Navigation;
