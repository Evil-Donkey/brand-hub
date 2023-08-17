'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import stringToSlug from '../../lib/stringToSlug'
import styles from './Header.module.scss'

const Header = ({ bgColour, nav }) => {

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

    return (
        <>
            <div className={`${styles.headerContainer} container py-3`}>
                <div className={`row align-items-center justify-content-${nav ? 'between' : 'end'}`}>
                    <div className='col-auto'>
                        <Image src="/images/icon-bh-logo.svg" alt="" width="45" height="45" />
                    </div>
                    <div className='col-auto'>
                        {/* <svg className={styles.menuIcon} width="40" height="25" viewBox="0 0 40 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line y1="1.99023" x2="27.0879" y2="1.99023" stroke="white" strokeWidth="3"/>
                            <line y1="12.7371" x2="39.0071" y2="12.7371" stroke="white" strokeWidth="3"/>
                            <line y1="23.4839" x2="39.0071" y2="23.4839" stroke="white" strokeWidth="3"/>
                        </svg> */}
                        <div className={styles.menuIcon} onClick={openModal}>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
            {nav && 
            <div className={`${styles.brandMenu} ${isModalOpen ? styles.brandMenuOpen : ''}`} style={{ backgroundColor: bgColour }}>
                <svg className={styles.closeMenuIcon} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={closeModal}>
                    <g clip-path="url(#clip0_373_10732)">
                    <path d="M0.152344 0.88385L27.8479 27.5903" stroke="white" strokeWidth="3" strokeMiterlimit="10"/>
                    <path d="M27.8479 0.88385L0.152344 27.5903" stroke="white" strokeWidth="3" strokeMiterlimit="10"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_373_10732">
                    <rect width="28" height="27" fill="white" transform="translate(0 0.737061)"/>
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