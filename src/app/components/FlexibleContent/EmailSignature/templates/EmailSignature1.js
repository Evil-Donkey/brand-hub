'use client'

import { useEffect, useState } from 'react'
import CopySignature from './CopySignature';
import Image from 'next/image'
import styles from '../EmailSignature.module.scss'
import getBase64StringFromDataURL from '../../../../utils/base64'

export const EmailSignature1 = ({logo, signature, fontSize, copyColour}) => {

    const { fullName, jobTitle, email, mobile, phone, instagramUrl, linkedinUrl, xUrl } = signature;
    
    return (
        <div className='signature'>
            <table width="600" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                    <tr>
                        <td width="179" align="left" valign="top" style={{borderRightStyle: 'solid', borderRightColor: copyColour ? copyColour : '#252525', borderRightWidth: '1px', paddingRight: '20px'}}>
                            <img src={logo.mediaItemUrl} width={logo.mediaDetails.width / 2} height={logo.mediaDetails.height / 2} />
                        </td>
                        <td width="421" align="left" valign="top" style={{paddingLeft: '30px', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: fontSize ? fontSize : '15px', lineHeight: '1.6', color: copyColour ? copyColour : ''}}>
                            {fullName 
                                && <div><strong>{fullName}</strong><br/></div>
                            }
                            {jobTitle && <div>{jobTitle}<br/></div>}
                            {email && <div>{email}<br/></div>}
                            {mobile && <div>{mobile}<br/></div>}
                            {phone && <div>{phone}<br/></div>}
                            {(instagramUrl || linkedinUrl || xUrl) 
                                && <table border="0" cellSpacing="0" cellPadding="0" style={{marginTop: '10px'}}>
                                    <tbody>
                                        <tr>
                                            {instagramUrl && 
                                                <td style={{ paddingRight: '5px' }}>
                                                    <a href={instagramUrl}>
                                                        <Image src="/images/icon-instagram.svg" alt="" width="30" height="30" />
                                                    </a>
                                                </td>
                                            }
                                            {linkedinUrl && 
                                                <td style={{ paddingRight: '5px' }}>
                                                    <a href={linkedinUrl}>
                                                        <Image src="/images/icon-linkedin.svg" alt="" width="30" height="30" />
                                                    </a>
                                                </td>
                                            }
                                            {xUrl && 
                                                <td style={{ paddingRight: '5px' }}>
                                                    <a href={xUrl}>
                                                        <Image src="/images/icon-x.svg" alt="" width="30" height="30" />
                                                    </a>
                                                </td>
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export const SignatureTable1 = ({logo, signature, fontSize, copyColour}) => {

    const { fullName, jobTitle, email, mobile, phone, instagramUrl, linkedinUrl, xUrl } = signature;
    
    const [base64img, setBase64img] = useState(logo.mediaItemUrl);
    const [base64imgIg, setBase64imgIg] = useState(instagramUrl);
    const [base64imgLi, setBase64imgLi] = useState(linkedinUrl);
    const [base64imgX, setBase64imgX] = useState(xUrl);
    
    useEffect(() => {
        // Get the remote image as a Blob with the fetch API
        fetch(logo.mediaItemUrl)
            .then((res) => res.blob())
            .then((blob) => {
                // Read the Blob as DataURL using the FileReader API
                const reader = new FileReader();
                reader.onloadend = () => {
                    // console.log(reader.result);
                    // Logs data:image/jpeg;base64,wL2dvYWwgbW9yZ...
                    setBase64img(reader.result);

                    // Convert to Base64 string
                    // const base64 = getBase64StringFromDataURL(reader.result);
                    // console.log(base64);
                    // Logs wL2dvYWwgbW9yZ...
                };
                reader.readAsDataURL(blob);
            });

        fetch('/images/icon-instagram.svg')
            .then((res) => res.blob())
            .then((blob) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setBase64imgIg(reader.result);
                };
                reader.readAsDataURL(blob);
            });

        fetch('/images/icon-linkedin.svg')
            .then((res) => res.blob())
            .then((blob) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setBase64imgLi(reader.result);
                };
                reader.readAsDataURL(blob);
            });

        fetch('/images/icon-x.svg')
            .then((res) => res.blob())
            .then((blob) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setBase64imgX(reader.result);
                };
                reader.readAsDataURL(blob);
            });
    }, [logo]);

    let signatureLogo = base64img ? `<img src="${base64img}" width="${logo.mediaDetails.width / 2}" height="${logo.mediaDetails.height / 2}"/>` : '';
    let signatureFullName = fullName ? `<div><strong>${fullName}</strong><br/></div>` : '';
    let signatureJobTitle = jobTitle ? `<div>${jobTitle}<br/></div>` : '';
    let signatureEmail = email ? `<div>${email}<br/></div>` : '';
    let signatureMobile = mobile ? `<div>${mobile}<br/></div>` : '';
    let signaturePhone = phone ? `<div>${phone}<br/></div>` : '';
    let signatureIg = instagramUrl ? `<td style="padding-right: 5px;"><a href="${instagramUrl}"><img src="${base64imgIg}" alt="" width="30" height="30" /></a></td>` : '';
    let signatureLn = linkedinUrl ? `<td style="padding-right: 5px;"><a href="${linkedinUrl}"><img src="${base64imgLi}" alt="" width="30" height="30" /></a></td>` : '';
    let signatureX = xUrl ? `<td style="padding-right: 5px;"><a href="${xUrl}"><img src="${base64imgX}" alt="" width="30" height="30" /></a></td>` : '';

    let signatureTable = `<table width="600" border="0" cellspacing="0" cellpadding="0"><td width="179" align="left" valign="top" style="border-right-style: solid; border-right-color: ${copyColour ? copyColour : '#252525'}; border-right-width: 1px; padding-left: 20px;">${signatureLogo}</td><td width="421" align="left" valign="top" style="padding-left: 30px; font-family: Arial, Helvetica, 'sans-serif'; font-size: ${fontSize ? fontSize : '15px'}; line-height: 1.6; color:${copyColour ? copyColour : ''};">${signatureFullName}${signatureJobTitle}${signatureEmail}${signatureMobile}${signaturePhone}${(signatureIg || signatureLn || signatureX) && `<table border="0" cell-spacing="0" cell-padding="0" style="margin-top: 10px;"><tbody><tr>${signatureIg}${signatureLn}${signatureX}</tr></td></tr></tbody></table>`}`;

    return (
        <>
            <div className={`${styles.copySignatureWrap} p-4`}>
                <code>{signatureTable}</code>
            </div>
            <CopySignature signatureTable={signatureTable} />
        </>
    );
}