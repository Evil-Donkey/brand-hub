'use client'

import { useContext, useState } from 'react'
import Link from 'next/link'
import pSBC from '@/app/utils/colourShade'
import PasswordContext from '../../lib/passwordContext'
import stringToSlug from '../../lib/stringToSlug'
import Logo from '../Logo'
import styles from './Header.module.scss'

const Header = ({ bgColour, color, nav, pwd }) => {

    const { match } = useContext(PasswordContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickedNavItem, setClickedNavItem] = useState(null);

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleClickNavItem = (i) => {
        setClickedNavItem(i);
        // setIsModalOpen(false);
    }

    const menuBgColour = pSBC ( 0.1, bgColour, false, true );

    return (
        <>
            <div className={`${styles.headerContainer} container py-3`}>
                <div className="row align-items-center justify-content-between">
                    <div className='col-auto'>
                        <Link href="/">
                            <Logo color={color} />
                        </Link>
                    </div>
                    {(match || !pwd) && nav &&
                        <div className='col-auto'>
                            <div className={styles.menuIcon} onClick={openModal}>
                                <span></span>
                            </div>
                        </div>
                    }
                </div>
            </div>
            {nav && 
                <div className={`${styles.brandMenu} ${isModalOpen ? styles.brandMenuOpen : ''}`} style={{ backgroundColor: menuBgColour }}>
                    <svg className={styles.closeMenuIcon} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={closeModal}>
                        <g clipPath="url(#clip0_373_10732)">
                            <path d="M0.152344 0.88385L27.8479 27.5903" stroke={color} strokeWidth="3" strokeMiterlimit="10"/>
                            <path d="M27.8479 0.88385L0.152344 27.5903" stroke={color} strokeWidth="3" strokeMiterlimit="10"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_373_10732">
                                <rect width="28" height="27" fill={color} transform="translate(0 0.737061)"/>
                            </clipPath>
                        </defs>
                    </svg>
                    <ul className='list-unstyled m-0 p-0 d-flex flex-column'>
                        {nav.map((navItem, i) => {
                            const slug = stringToSlug(navItem);
                            return (
                                <li key={i.toString()}>
                                    <Link href={`#${slug}`} onClick={() => handleClickNavItem(i)} className={clickedNavItem == i ? styles.navItemActive : ''}>
                                        {navItem}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            }
        </>
    );
}

export default Header;