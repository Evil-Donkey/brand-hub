import CopySignature from './CopySignature';
import Image from 'next/image'
import styles from '../EmailSignature.module.scss'

export const EmailSignature1 = ({logo, signature}) => {
    return (
        <div className='signature'>
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
                            {(signature.instagramUrl || signature.linkedinUrl || signature.xUrl) 
                                && <table border="0" cellSpacing="0" cellPadding="0" style={{marginTop: '10px'}}>
                                    <tbody>
                                        <tr>
                                            {signature.instagramUrl && 
                                                <td style={{ paddingRight: '5px' }}>
                                                    <a href={signature.instagramUrl}>
                                                        <Image src="/images/icon-instagram.svg" alt="" width="30" height="30" />
                                                    </a>
                                                </td>
                                            }
                                            {signature.linkedinUrl && 
                                                <td style={{ paddingRight: '5px' }}>
                                                    <a href={signature.linkedinUrl}>
                                                        <Image src="/images/icon-linkedin.svg" alt="" width="30" height="30" />
                                                    </a>
                                                </td>
                                            }
                                            {signature.xUrl && 
                                                <td style={{ paddingRight: '5px' }}>
                                                    <a href={signature.xUrl}>
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

export const SignatureTable1 = ({logo, signature}) => {
    

    let signatureLogo = logo ? `<img src="${logo.mediaItemUrl}" width="${logo.mediaDetails.width / 2}" height="${logo.mediaDetails.height / 2}"/>` : '';
    let signatureFullName = signature.fullName ? `<div><strong>${signature.fullName}</strong><br/></div>` : '';
    let signatureJobTitle = signature.jobTitle ? `<div>${signature.jobTitle}<br/></div>` : '';
    let signatureEmail = signature.email ? `<div>${signature.email}<br/></div>` : '';
    let signatureMobile = signature.mobile ? `<div>${signature.mobile}<br/></div>` : '';
    let signaturePhone = signature.phone ? `<div>${signature.phone}<br/></div>` : '';
    let signatureIg = signature.instagramUrl ? `<td style="padding-right: 5px;"><a href="${signature.instagramUrl}"><img src="/images/icon-instagram.svg" alt="" width="30" height="30" /></a></td>` : '';
    let signatureLn = signature.linkedinUrl ? `<td style="padding-right: 5px;"><a href="${signature.linkedinUrl}"><img src="/images/icon-linkedin.svg" alt="" width="30" height="30" /></a></td>` : '';
    let signatureX = signature.xUrl ? `<td style="padding-right: 5px;"><a href="${signature.xUrl}"><img src="/images/icon-x.svg" alt="" width="30" height="30" /></a></td>` : '';

    let signatureTable = `<table width="600" border="0" cellspacing="0" cellpadding="0"><td width="179" align="left" valign="top" style="border-right-style: solid; border-right-color: #252525; border-right-width: 1px; padding-left: 20px;">${signatureLogo}</td><td width="421" align="left" valign="top" style="padding-left: 30px; font-family: Arial, Helvetica, 'sans-serif'; font-size: 15px; line-height: 27px; letter-spacing: 1px;">${signatureFullName}${signatureJobTitle}${signatureEmail}${signatureMobile}${signaturePhone}${(signatureIg || signatureLn || signatureX) && `<table border="0" cell-spacing="0" cell-padding="0" style="margin-top: 10px;"><tbody><tr>${signatureIg}${signatureLn}${signatureX}</tr></td></tr></tbody></table>`}`;

    return (
        <>
            <div className={`${styles.copySignatureWrap} p-4`}>
                <code>{signatureTable}</code>
            </div>
            <CopySignature signatureTable={signatureTable} />
        </>
    );
}