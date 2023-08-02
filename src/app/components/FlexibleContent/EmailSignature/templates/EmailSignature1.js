import { useState } from "react"
import Image from 'next/image'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styles from '../EmailSignature.module.scss'

export const EmailSignature1 = ({logo, signature}) => {
    return (
        <table width="600" border="0" cellSpacing="0" cellPadding="0">
            <tbody>
                <tr>
                    <td width="179" align="left" valign="top" style={{borderRightStyle: 'solid', borderRightColor: '#252525', borderRightWidth: '1px', paddingRight: '20px'}}>
                        <img src={logo.mediaItemUrl} width={logo.mediaDetails.width / 2} height={logo.mediaDetails.height / 2} />
                    </td>
                    <td width="421" align="left" valign="top" style={{paddingLeft: '30px', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '15px', lineHeight: '27px', letterSpacing: '1px'}}>
                        {signature.fullName 
                            && <div><strong>{signature.fullName}</strong><br/></div>
                        }
                        {signature.jobTitle && <div>{signature.jobTitle}<br/></div>}
                        {signature.email && <div>{signature.email}<br/></div>}
                        {signature.mobile && <div>{signature.mobile}<br/></div>}
                        {signature.phone && <div>{signature.phone}<br/></div>}
                        {(signature.instagram || signature.linkedin || signature.x) 
                            && <table border="0" cellSpacing="0" cellPadding="0" style={{marginTop: '10px'}}>
                                <tbody>
                                    <tr>
                                        {signature.instagram && 
                                            <td style={{ paddingRight: '5px' }}>
                                                <a href={signature.instagram}>
                                                    <Image src="/images/icon-instagram.svg" alt="" width="30" height="30" />
                                                </a>
                                            </td>
                                        }
                                        {signature.linkedin && 
                                            <td style={{ paddingRight: '5px' }}>
                                                <a href={signature.linkedin}>
                                                    <Image src="/images/icon-linkedin.svg" alt="" width="30" height="30" />
                                                </a>
                                            </td>
                                        }
                                        {signature.x && 
                                            <td style={{ paddingRight: '5px' }}>
                                                <a href={signature.x}>
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
    );
}

export const SignatureTable1 = ({logo, signature}) => {
    const [textSelected, setTextSelected] = useState(false);

    let signatureLogo = logo ? `<img src="${logo.mediaItemUrl}" width="${logo.mediaDetails.width / 2}" height="${logo.mediaDetails.height / 2}"/>` : '';
    let signatureFullName = signature.fullName ? `<div><strong>${signature.fullName}</strong><br/></div>` : '';
    let signatureJobTitle = signature.jobTitle ? `<div>${signature.jobTitle}<br/></div>` : '';
    let signatureEmail = signature.email ? `<div>${signature.email}<br/></div>` : '';
    let signatureMobile = signature.mobile ? `<div>${signature.mobile}<br/></div>` : '';
    let signaturePhone = signature.phone ? `<div>${signature.phone}<br/></div>` : '';
    let signatureIg = signature.instagram ? `<td style="padding-right: 5px;"><a href="${signature.instagram}"><img src="/images/icon-instagram.svg" alt="" width="30" height="30" /></a></td>` : '';
    let signatureLn = signature.linkedin ? `<td style="padding-right: 5px;"><a href="${signature.linkedin}"><img src="/images/icon-linkedin.svg" alt="" width="30" height="30" /></a></td>` : '';
    let signatureX = signature.x ? `<td style="padding-right: 5px;"><a href="${signature.x}"><img src="/images/icon-x.svg" alt="" width="30" height="30" /></a></td>` : '';

    let signatureTable = `<table width="600" border="0" cellspacing="0" cellpadding="0"><td width="179" align="left" valign="top" style="border-right-style: solid; border-right-color: #252525; border-right-width: 1px; padding-left: 20px;">${signatureLogo}</td><td width="421" align="left" valign="top" style="padding-left: 30px; font-family: Arial, Helvetica, 'sans-serif'; font-size: 15px; line-height: 27px; letter-spacing: 1px;">${signatureFullName}${signatureJobTitle}${signatureEmail}${signatureMobile}${signaturePhone}${(signatureIg || signatureLn || signatureX) && `<table border="0" cell-spacing="0" cell-padding="0" style="margin-top: 10px;"><tbody><tr>${signatureIg}${signatureLn}${signatureX}</tr></td></tr></tbody></table>`}`;
    
    return (
        <>
            <div className={`${styles.copySignatureWrap} p-4`}>
                <code>{signatureTable}</code>
            </div>
            <CopyToClipboard 
                text={signatureTable}
                onCopy={() => setTextSelected(true)}
                options={{format: 'text/plain'}}
            >
                <div className={`${styles.bbCopyCode} d-flex align-items-center justify-content-end p-3`}>
                    {!textSelected ? <span>Copy code</span> : <span>Copied</span>}
                    <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg" className="ms-2">
                        <g clipPath="url(#clip0_612_21)">
                        <path d="M26 23.0651H3.00861V0.193329H26V23.0651ZM4.47316 21.6082H24.5354V1.65026H4.47316V21.6082Z" fill="black"/>
                        <path d="M21.644 4.16451H7.36462V5.62144H21.644V4.16451Z" fill="black"/>
                        <path d="M21.644 8.6144H7.36462V10.0713H21.644V8.6144Z" fill="black"/>
                        <path d="M21.644 13.0664H7.36462V14.5233H21.644V13.0664Z" fill="black"/>
                        <path d="M15.6268 17.5183H7.36462V18.9753H15.6268V17.5183Z" fill="black"/>
                        <path d="M22.2591 26.1933H0V4.05004H1.46455V24.7364H22.2591V26.1933Z" fill="black"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_612_21">
                        <rect width="26" height="26" fill="black" transform="translate(0 0.193329)"/>
                        </clipPath>
                        </defs>
                    </svg>
                </div>
            </CopyToClipboard>
        </>
    );
}