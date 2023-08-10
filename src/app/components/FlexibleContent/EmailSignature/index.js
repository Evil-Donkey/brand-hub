'use client'

import { useState } from "react"
import styles from './EmailSignature.module.scss'
import { EmailSignature1, SignatureTable1 } from './templates/EmailSignature1'

const EmailSignature = ({ data }) => {
    const [signature, setSignature] = useState({
        fullName: "Full Name",
        email: "Email",
        jobTitle: "Job Title",
        mobile: "Mobile Phone Number",
        phone: "Office Phone Number",
        instagramUrl: "",
        linkedinUrl: "",
        xUrl: ""
    })
    const copy = data?.copy;
    const logo = data?.logo;

    const handleChange = (evt) => {
        const value = evt.target.value;
        setSignature({
          ...signature,
          [evt.target.name]: value
        });
    }

    return (
        <div className={`row ${copy ? `justify-content-between` : 'justify-content-end'}`}>
            {copy &&
                <div className='col-md-4'>
                    <div dangerouslySetInnerHTML={{ __html: copy }} />

                    <form className={styles.signatureForm}>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={signature.fullName}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="jobTitle"
                            placeholder="Job Title"
                            value={signature.jobTitle}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={signature.email}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="mobile"
                            placeholder="Mobile Phone Number"
                            value={signature.mobile}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Office Phone Number"
                            value={signature.phone}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="instagram"
                            placeholder="Instagram URL"
                            value={signature.instagramUrl}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="linkedin"
                            placeholder="LinkedIn URL"
                            value={signature.linkedinUrl}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="x"
                            placeholder="X URL"
                            value={signature.xUrl}
                            onChange={handleChange}
                        />
                    </form>
                </div>
            }
            <div className='col-md-7'>
                <div className={`${styles.emailSignatureWrap} p-4 bg-white`}>
                    <EmailSignature1
                        logo={logo}
                        signature={signature}
                    />
                </div>
                <SignatureTable1
                    logo={logo}
                    signature={signature}
                />
            </div>
        </div>
    )
}

export default EmailSignature;