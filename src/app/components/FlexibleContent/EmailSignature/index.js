'use client'

import { useState } from "react"
import styles from './EmailSignature.module.scss'
import toCamelCase from '../../../lib/camelCase'
import { EmailSignature1, SignatureTable1 } from './templates/EmailSignature1'

const EmailSignature = ({ colour, bgColour, data }) => {

    const social = data?.socials;

    // new //////////////////
    const defaultSignature = {
        fullName: "Full Name",
        email: "Email",
        jobTitle: "Job Title",
        mobile: "Mobile Phone Number",
        phone: "Office Phone Number",
        instagramUrl: "",
        linkedinUrl: "",
        xUrl: ""
    };

    const signatureFields = data.fields?? null;
    if (signatureFields && social) {
        signatureFields.push({'name': 'Instagram'});
        signatureFields.push({'name': 'Linkedin'});
        signatureFields.push({'name': 'X'});
    }
    const signatureObj = signatureFields.reduce((obj, item) => {
        const key = toCamelCase(item.name);
        obj[key] = item.name;
        return obj;
    }, {});

    const fields = signatureObj ?? defaultSignature;
    const fieldsArray = Object.entries(fields);
    // new //////////////////

    const [signature, setSignature] = useState(fields);

    
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
                        {fieldsArray && fieldsArray.map(([key, value], i) => {
                            return (
                                <input
                                    key={i.toString()}
                                    type="text"
                                    name={key}
                                    placeholder={value}
                                    value={signature[key]}
                                    onChange={handleChange}
                                    style={{ color: colour, borderColor: colour }}
                                />
                            );
                        })}
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
                        social={social}
                    />
                </div>
                <SignatureTable1
                    logo={logo}
                    signature={signature}
                    copyColour={copyColour}
                    fontSize={fontSize}
                    social={social}
                />
            </div>
        </div>
    )
}

export default EmailSignature;