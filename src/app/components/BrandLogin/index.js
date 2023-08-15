'use client'

import { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import PasswordContext from '../../lib/passwordContext'
import styles from './BrandLogin.module.scss'

const BrandLogin = ({ pwd, bgColour }) => {

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
                            <Image src="/images/icon-lock.svg" alt="Password icon" width="17" height="22" />
                            <p className='m-0'>Enter password to gain full access to this page.</p>
                            <form className={styles.brandLoginForm} onSubmit={(e) => handleSubmit(e)}>
                                <input 
                                    type='password' 
                                    name='brand-password' 
                                    placeholder='Password' 
                                    value={inputPwd}
                                    onChange={e => handleOnChange(e)}
                                />
                                <input type='submit' value='Enter' style={{ color: bgColour }} />
                            </form>
                            {err && <p className='m-0'>Incorrect password. Please try again.</p>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BrandLogin;