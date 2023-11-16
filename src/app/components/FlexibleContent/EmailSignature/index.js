'use client'

import { useState } from "react"
import styles from './EmailSignature.module.scss'
import { EmailSignature1, SignatureTable1 } from './templates/EmailSignature1'

const EmailSignature = ({ colour, bgColour, data }) => {
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
    const copyColour = data?.signatureCopyColour;
    const fontSize = data?.signatureCopyFontSize;

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
                <div className='col-md-4 mb-4 mb-md-0'>
                    <div dangerouslySetInnerHTML={{ __html: copy }} />
                    <style jsx> 
                        {` 
                            input::placeholder {
                                color: ${colour}; 
                            }` 
                        } 
                    </style>
                    <form className={styles.signatureForm}>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={signature.fullName}
                            onChange={handleChange}
                            style={{ color: colour, borderColor: colour }}
                        />
                        <input
                            type="text"
                            name="jobTitle"
                            placeholder="Job Title"
                            value={signature.jobTitle}
                            onChange={handleChange}
                            style={{ color: colour, borderColor: colour }}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={signature.email}
                            onChange={handleChange}
                            style={{ color: colour, borderColor: colour }}
                        />
                        <input
                            type="text"
                            name="mobile"
                            placeholder="Mobile Phone Number"
                            value={signature.mobile}
                            onChange={handleChange}
                            style={{ color: colour, borderColor: colour }}
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Office Phone Number"
                            value={signature.phone}
                            onChange={handleChange}
                            style={{ color: colour, borderColor: colour }}
                        />
                        <input
                            type="text"
                            name="instagramUrl"
                            placeholder="Instagram URL"
                            value={signature.instagramUrl}
                            onChange={handleChange}
                            style={{ color: colour, borderColor: colour }}
                        />
                        <input
                            type="text"
                            name="linkedinUrl"
                            placeholder="LinkedIn URL"
                            value={signature.linkedinUrl}
                            onChange={handleChange}
                            style={{ color: colour, borderColor: colour }}
                        />
                        <input
                            type="text"
                            name="xUrl"
                            placeholder="X URL"
                            value={signature.xUrl}
                            onChange={handleChange}
                            style={{ color: colour, borderColor: colour }}
                        />
                    </form>
                </div>
            }
            <div className='col-md-7'>
                <div className={`${styles.emailSignatureWrap} p-4 bg-white`}>
                    <EmailSignature1
                        logo={logo}
                        signature={signature}
                        copyColour={copyColour}
                        fontSize={fontSize}
                    />
                </div>
                <SignatureTable1
                    logo={logo}
                    signature={signature}
                    copyColour={copyColour}
                    fontSize={fontSize}
                />
            </div>
        </div>
    )
}

export default EmailSignature;