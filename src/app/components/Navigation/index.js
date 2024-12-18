'use client'
 
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {isMobile} from 'react-device-detect'
import Link from 'next/link'
import styles from './Navigation.module.scss'
 
const Navigation = ({ color }) => {
  const pathname = usePathname();

    useEffect(() => {
        document.documentElement.style.setProperty("--theme-color-00", '#ffffff');
        if (pathname == "/branders") {
            document.documentElement.style.setProperty("--theme-nav-00", '#ffffff');
        } else {
            document.documentElement.style.setProperty("--theme-nav-00", color ? color : '#231F20');
        }
    }, []);

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
            label: 'Design Hub',
            href: '/design-hub',
            activeSegment: 'design-hub'
        },
        {
            label: 'Code Hub',
            href: '/code-hub',
            activeSegment: 'code-hub'
        },
        {
            label: 'Our plans',
            href: '/pricing',
            activeSegment: 'pricing'
        },
    ];
 
    return (
        <ul className={`${styles.navigationWrap} list-unstyled m-0 p-0 d-flex gap-2`}>
            {navigationMenu.map((link) => {
                const isActive = pathname === link.href;
    
                return (
                    <li key={link.label} className={isActive ? styles.navigationItemActive : ''} style={{ color: color }}>
                        <Link href={link.href} className='cta__btn'>
                            {link.label}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
};

export default Navigation;
