'use client'

import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import PasswordContext from '../../lib/passwordContext'
import styles from './BrandLogin.module.scss'

const BrandLogin = ({ bgColour, color, pwd }) => {

    const { match, setMatch, storedPwd, setStoredPwd } = useContext(PasswordContext);
    const [inputPwd, setInputPwd] = useState('');
    const [err, setErr] = useState(false);

    useEffect(() => {
        setStoredPwd(pwd);
    }, []);

    const handleOnChange = (e) => {
        setInputPwd(e.target.value);
        setErr(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setMatch(storedPwd === inputPwd);
        if (!match) {
            setErr(true);
        }
    }


    if (!match) {
        return (
            <div className={styles.brandLoginWrap} style={{ backgroundColor: bgColour }}>
                <div className='container py-4'>
                    <div className='row'>
                        <div className='col d-flex flex-column flex-md-row align-items-center gap-3 text-center text-md-left'>
                            {/* <Image src="/images/icon-lock.svg" alt="Password icon" width="17" height="22" /> */}
                            <svg className={styles.brandLoginIcon} width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.38111 11.4078V6.4555C5.38111 3.7204 7.59834 1.50317 10.3334 1.50317C13.0685 1.50317 15.2858 3.7204 15.2858 6.4555V11.4078M1.66687 11.4078H19V23.7886H1.66687V11.4078Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
                            </svg>
                            <p className='m-0' style={{ color: color }}>Enter password to gain full access to this page.</p>
                            <form className={styles.brandLoginForm} onSubmit={(e) => handleSubmit(e)}>
                                <input 
                                    type='password' 
                                    name='brand-password' 
                                    placeholder='Password' 
                                    value={inputPwd}
                                    onChange={e => handleOnChange(e)}
                                    style={{ borderColor: color, borderWidth: '1px', borderStyle: 'solid', backgroundColor: bgColour, color: color }}
                                />
                                <input type='submit' value='Enter' style={{ color: bgColour, backgroundColor: color }} />
                            </form>
                            {err && <p className='m-0' style={{ color: color }}>Incorrect password. Please try again.</p>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BrandLogin;