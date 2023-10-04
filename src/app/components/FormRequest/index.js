'use client'

import { useState, useEffect } from 'react'
import styles from './FormRequest.module.scss'
import { app, db } from '../../lib/firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { getAuth, signInAnonymously } from "firebase/auth"
import Link from 'next/link'

const requests = collection(db, 'requests')

const FormRequest = () => {

    const [formData, setFormData] = useState({})
    const [requestsArray, setRequestsArray] = useState([])
    const [isChecked, setIsChecked] = useState(false)
    const [newsletterChecked, setNewsletterChecked] = useState(false)
    const [formSuccess, setFormSuccess] = useState(false)
    const [formError, setFormError] = useState(false)

    const handleConfirm = () => {
        setIsChecked(!isChecked)
    }
    const handleNewsletter = e => {
        setNewsletterChecked(!newsletterChecked)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }


    const updateInput = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    async function sendRequest (e) {
        e.preventDefault();

        await fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify(formData)
        })
        .then((response) => {
            response.json()
            console.log(response)
            setFormSuccess(true)
        })
        .catch((error) => {
            console.log(error)
            setFormError(true)
        })

        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const emailField = document.getElementById('emailField');
        const confirm = document.getElementById('confirm');
        const isValidFirstName = firstName.checkValidity();
        const isValidLastName = lastName.checkValidity();
        const isValidEmail = emailField.checkValidity();
        const isValidConfirm = confirm.checkValidity();

        if ( isValidFirstName && isValidLastName && isValidEmail && isValidConfirm ) {

            const auth = getAuth();
            signInAnonymously(auth)
                .then(() => {
                    addDoc(requests, {
                        firstName: formData.firstName || null,
                        lastName: formData.lastName || null,
                        email: formData.email || null,
                        company: formData.company || null,
                        website: formData.website || null,
                        newsletter: newsletterChecked || null,
                        time: new Date()
                    })
                    .then(() => {
                        setFormData({
                            firstName: '',
                            lastName: '',
                            email: '',
                            company: '',
                            website: '',
                            newsletter: false
                        })
                        getRequests()
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                });
        }
    }

    const getRequests = () => {
        getDocs(requests)
            .then((data) => {
                setRequestsArray(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                }))
            })
    }

    useEffect(() => {
        getRequests()
    }, [])

    return (
        <div className={styles.request} id="form-request">
            <div className={`container`}>
                <div className="row justify-content-center">
                    <div className="col-md-9 col-lg-6">
                        <h2 className="mb-3 text-center">Ready to Dive In?</h2>
                        <p className="mb-5 text-center">Request a demo</p>
                        <form onSubmit={sendRequest}>
                            <div className="row">
                                <div className="col-md-6 mb-2">
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        className={styles.input}
                                        required
                                        placeholder="First Name"
                                        value={formData.firstName || ''}
                                        onChange={updateInput}
                                    />
                                </div>
                                <div className="col-md-6 mb-2">
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        className={styles.input}
                                        required
                                        placeholder="Last Name"
                                        value={formData.lastName || ''}
                                        onChange={updateInput}
                                    />
                                </div>    
                            </div>
                            <div className="row">
                                <div className="col mb-2">
                                    <input
                                        type="email"
                                        name="email"
                                        id="emailField"
                                        className={styles.input}
                                        required
                                        placeholder="Email"
                                        value={formData.email || ''}
                                        onChange={updateInput}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col mb-2">
                                    <input
                                        type="text"
                                        name="company"
                                        className={styles.input}
                                        placeholder="Company Name"
                                        value={formData.company || ''}
                                        onChange={updateInput}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col mb-2">
                                    <input
                                        type="text"
                                        name="website"
                                        className={styles.input}
                                        placeholder="Website Address"
                                        value={formData.website || ''}
                                        onChange={updateInput}
                                    />
                                </div>
                            </div>
                            

                            <div className="row justify-content-center justify-content-md-between">
                                <div className="col-auto d-flex flex-column">
                                    <label htmlFor="confirm" className={`${styles.requestLabel} d-flex align-items-center mb-2`}>
                                        <input
                                            type="checkbox"
                                            id="confirm"
                                            name="confirm"
                                            value="Confirm"
                                            checked={isChecked}
                                            onChange={handleConfirm}
                                            required
                                            /> <span>By submitting this form you agree to our <Link href="/privacy-policy">Privacy Policy</Link>.</span>
                                    </label>
                                    <label htmlFor="newsletter" className={`${styles.requestLabel} d-flex align-items-center`}>
                                        <input
                                            type="checkbox"
                                            id="newsletter"
                                            name="newsletter"
                                            value={formData.newsletter || false}
                                            checked={newsletterChecked}
                                            onChange={handleNewsletter}
                                            /> Yes, please keep me updated on everything Brand Hub.
                                    </label>
                                </div>
                                <div className="col-md-auto mt-5 mt-md-0">
                                    <button type="submit" id="requestSubmit" className={styles.submitBtn}>
                                        Submit
                                    </button>
                                </div>
                            </div>

                            {(formSuccess || formError) &&
                                <div className="row mt-4">
                                    <div className={`${styles.formMessages} col text-md-end`}>
                                        {formSuccess && <p>Thank you for your request. We will be in touch soon.</p>}
                                        {formError && <p>There has been an error with the form submission. Please check the fields and try again.</p>}
                                    </div>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormRequest