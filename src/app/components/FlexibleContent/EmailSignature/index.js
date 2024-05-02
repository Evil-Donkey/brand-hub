'use client'

import { useState } from "react"
import styles from './EmailSignature.module.scss'
import toCamelCase from '../../../lib/camelCase'
import { EmailSignatureDefault, SignatureTableDefault } from './templates/EmailSignatureDefault'
import { EmailSignature1, SignatureTable1 } from './templates/EmailSignature1'

const EmailSignature = ({ colour, data, index }) => {

    const social = data?.socials;
    const disclaimer = data?.disclaimer ?? null;
    const emailType = data?.emailType ?? null;

    // new //////////////////
    const defaultSignature = {
        fullName: "Full Name",
        email: "Email",
        jobTitle: "Job Title",
        mobile: "Mobile Phone Number",
        phone: "Office Phone Number",
        instagramUrl: "https://instagram.com",
        linkedinUrl: "https://linkedin.com",
        // xUrl: "https://x.com"
    };

    const signatureFields = data.fields?? null;
    if (signatureFields && social) {
        signatureFields.push({'name': 'Instagram'});
        signatureFields.push({'name': 'Linkedin'});
        // signatureFields.push({'name': 'X'});
    }
    const signatureObj = signatureFields ? signatureFields.reduce((obj, item) => {
        const key = toCamelCase(item.name);
        obj[key] = item.name;
        return obj;
    }, {}) : null;

    const signatureMargin = signatureFields ? signatureFields.map(item => item.bottomMargin) : null;
    const signatureLink = signatureFields ? signatureFields.map(item => item.link) : null;
    const signatureBold = signatureFields ? signatureFields.map(item => item.bold) : null;

    // const fields = signatureObj ?? defaultSignature;
    const fields = signatureObj ?? null;
    const fieldsArray = fields ? Object.entries(fields) : null;
    // new //////////////////

    const [signature, setSignature] = useState(fields);

    
    const copy = data?.copy;
    const logo = data?.logo;
    const logoUrl = data?.logoUrl;
    const footerLogos = data?.logos;
    const copyColour = data?.signatureCopyColour;
    const linksColour = data?.linksColour;
    const fontSize = data?.signatureCopyFontSize;

    const handleChange = (evt) => {
        const value = evt.target.value;
        setSignature({
          ...signature,
          [evt.target.name]: value
        });
    }

    return (
        <div className={`row ${fieldsArray ? `justify-content-between` : 'justify-content-end'}`}>
            <div className='col-md-4 mb-4 mb-md-0'>
                {copy && <div className="mb-4" dangerouslySetInnerHTML={{ __html: copy }} />}
                {fieldsArray && 
                    <>
                        <style jsx> 
                            {` 
                                input::placeholder {
                                    color: ${colour}; 
                                }` 
                            } 
                        </style>
                        <form className={styles.signatureForm}>
                            {fieldsArray.map(([key, value], i) => {
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
                    </>
                }
            </div>

            <div className='col-md-7'>
                {emailType == 'default' &&
                    <>
                        <div className={`${styles.emailSignatureWrap} p-4 bg-white`}>
                            <EmailSignatureDefault
                                logo={logo}
                                logoUrl={logoUrl}
                                signature={signature}
                                index={index}
                                margin={signatureMargin}
                                bold={signatureBold}
                                link={signatureLink}
                                linksColour={linksColour}
                                disclaimer={disclaimer}
                                copyColour={copyColour}
                                fontSize={fontSize}
                                social={social}
                                footerLogos={footerLogos}
                            />
                        </div>
                        <SignatureTableDefault
                            logo={logo}
                            logoUrl={logoUrl}
                            signature={signature}
                            index={index}
                            margin={signatureMargin}
                            bold={signatureBold}
                            link={signatureLink}
                            linksColour={linksColour}
                            disclaimer={disclaimer}
                            copyColour={copyColour}
                            fontSize={fontSize}
                            social={social}
                            footerLogos={footerLogos}
                        />
                    </>
                }

                {emailType == 'one' &&
                    <>
                        <div className={`${styles.emailSignatureWrap} p-4 bg-white`}>
                            <EmailSignature1
                                logo={logo}
                                logoUrl={logoUrl}
                                signature={signature}
                                index={index}
                                margin={signatureMargin}
                                bold={signatureBold}
                                link={signatureLink}
                                disclaimer={disclaimer}
                                copyColour={copyColour}
                                linksColour={linksColour}
                                fontSize={fontSize}
                                social={social}
                                footerLogos={footerLogos}
                            />
                        </div>
                        <SignatureTable1
                            logo={logo}
                            logoUrl={logoUrl}
                            signature={signature}
                            index={index}
                            margin={signatureMargin}
                            bold={signatureBold}
                            link={signatureLink}
                            disclaimer={disclaimer}
                            copyColour={copyColour}
                            linksColour={linksColour}
                            fontSize={fontSize}
                            social={social}
                            footerLogos={footerLogos}
                        />
                    </>
                }
            </div>
        </div>
    )
}

export default EmailSignature;