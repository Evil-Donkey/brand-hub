'use client'

import { useEffect, useState } from 'react'
import CopySignature from './CopySignature';
import Image from 'next/image'
import styles from '../EmailSignature.module.scss'
import analyzeString from '../../../../lib/analyzeString'
import getBase64StringFromDataURL from '../../../../utils/base64'

export const EmailSignature1 = ({logo, logoUrl, signature, social, fontSize, copyColour, linksColour, margin, bold, link, disclaimer, index, footerLogos}) => {

    const signatureArray = signature ? Object.entries(signature) : null;
    
    return (
        <div id={`emailSignature-${index}`} className='signature'>
            <table width="600" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                    <tr>
                        {/* <td width="179" align="left" valign="top" style={{borderRightStyle: 'solid', borderRightColor: copyColour ? copyColour : '#252525', borderRightWidth: '1px', paddingRight: '20px'}}>
                            <img src={logo.mediaItemUrl} width={logo.mediaDetails.width / 2} height={logo.mediaDetails.height / 2} />
                        </td> */}
                        <td align="left" valign="top" style={{paddingBottom: '40px', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: fontSize ? fontSize : '15px', lineHeight: '1.3', color: copyColour ? copyColour : ''}}>
                            <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                                <tbody>
                                    {signatureArray && signatureArray.map(([key, value], i) => {
                                        const social = value.startsWith("https://instagram.com") || value.startsWith("https://linkedin.com") || value.startsWith("https://x.com") || value.startsWith("https://twitter.com");

                                        
                                        if (!social && value) {
                                            if (link[i]) {
                                                const linkType = analyzeString(value);
                                                const isEmail = linkType.isEmail;
                                                const isNumber = linkType.isPhoneNumber;
                                                const isHttpOrHttps = linkType.isHttpOrHttps;

                                                return isEmail ?
                                                    <tr key={i.toString()}>
                                                        <td style={{lineHeight: '1.3', fontWeight: bold[i] ? 'bold' : 'normal', paddingBottom: margin[i] ? '10px' : ''}}>
                                                            <a style={{color: linksColour, textDecoration: 'underline'}} href={`mailto:${value}`}>{value}<br/></a>
                                                        </td>
                                                    </tr>
                                                    
                                                : isHttpOrHttps ? 
                                                    <tr key={i.toString()}>
                                                        <td style={{lineHeight: '1.3', fontWeight: bold[i] ? 'bold' : 'normal', paddingBottom: margin[i] ? '10px' : ''}}>
                                                            <a style={{color: linksColour, textDecoration: 'underline'}} href={value}>{value}<br/></a>
                                                        </td>
                                                    </tr>
                                                    
                                                : isNumber ?
                                                    <tr key={i.toString()}>
                                                        <td style={{lineHeight: '1.3', fontWeight: bold[i] ? 'bold' : 'normal', paddingBottom: margin[i] ? '10px' : ''}}>
                                                            <a style={{color: linksColour, textDecoration: 'underline'}} href={`tel:${value}`}>{value}<br/></a>
                                                        </td>
                                                    </tr>
                                                : <tr key={i.toString()}>
                                                        <td style={{lineHeight: '1.3', fontWeight: bold[i] ? 'bold' : 'normal', paddingBottom: margin[i] ? '10px' : ''}}>
                                                            <a style={{color: linksColour, textDecoration: 'underline'}} href={`https://${value}`}>{value}<br/></a>
                                                        </td>
                                                    </tr>;
                                            } else {
                                                return (
                                                    <tr key={i.toString()}>
                                                        <td style={{lineHeight: '1.3', fontWeight: bold[i] ? 'bold' : 'normal', paddingBottom: margin[i] ? '10px' : ''}}>
                                                            {value}<br/>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        }
                                    })}
                                    {social && 
                                        <tr>
                                            <td>
                                                <table border="0" cellSpacing="0" cellPadding="0">
                                                    <tbody>
                                                        {signatureArray && signatureArray.map(([key, value], i) => {
                                                            const social = value.startsWith("https://instagram.com") || value.startsWith("https://linkedin.com") || value.startsWith("https://x.com") || value.startsWith("https://twitter.com");
                                                            const ig = value.startsWith("https://instagram.com") ? value : null;
                                                            const li = value.startsWith("https://linkedin.com") ? value : null;
                                                            const x = (value.startsWith("https://x.com") || value.startsWith("https://twitter.com")) ? value : null;
                                                            return social && (
                                                                <tr>
                                                                    <td key={i.toString()}>
                                                                        {ig && 
                                                                            <a href={ig} target="_blank" style={{color: linksColour, textDecoration: 'underline'}}>
                                                                                Instagram
                                                                            </a>
                                                                        }
                                                                        {li && 
                                                                            <a href={li} target="_blank" style={{color: linksColour, textDecoration: 'underline'}}>
                                                                                LinkedIn
                                                                            </a>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>

            {logo &&
                <table width="600" border="0" cellSpacing="0" cellPadding="0" style={{borderBottomStyle: 'solid', borderBottomColor: '#000000', borderBottomWidth: '1px'}}>
                    <tbody>
                        <tr>
                            <td style={{paddingBottom: '30px'}}>
                                {logoUrl ?
                                    <a href={logoUrl} target="_blank">
                                        <img src={logo.mediaItemUrl} width={logo.mediaDetails.width / 2} height={logo.mediaDetails.height / 2} />
                                    </a>
                                    : <img src={logo.mediaItemUrl} width={logo.mediaDetails.width / 2} height={logo.mediaDetails.height / 2} />
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            }

            {footerLogos &&
                <table width="600" border="0" cellSpacing="0" cellPadding="0">
                    <tbody>
                        <tr>
                            {footerLogos.map((logo, index) => {
                                const logoUrl = logo.url;
                                const image = logo.image;
                                return (
                                    <td key={index.toString()} style={{paddingTop: '15px'}}>
                                        {logoUrl ?
                                            <a href={logoUrl} target="_blank">
                                                <img src={image.mediaItemUrl} width={image.mediaDetails.width / 2} height={image.mediaDetails.height / 2} />
                                            </a>
                                        : <img src={image.mediaItemUrl} width={image.mediaDetails.width / 2} height={image.mediaDetails.height / 2} />
                                        }
                                    </td>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
            }

            {disclaimer &&
                <table width="600" border="0" cellSpacing="0" cellPadding="0">
                    <tbody>
                        <tr>
                            <td style={{paddingTop: '20px', fontSize: '11px', color: '#585858'}}>
                                <div dangerouslySetInnerHTML={{ __html: disclaimer }} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            }
        </div>
    );
}

export const SignatureTable1 = ({logo, logoUrl, signature, social, fontSize, copyColour, linksColour, margin, bold, link, disclaimer, index, footerLogos}) => {

    const signatureArray = signature ? Object.entries(signature) : null;

    const instagramUrl = signature?.instagramUrl ?? null;
    const linkedinUrl = signature?.linkedinUrl ?? null;
    const xUrl = signature?.xUrl ?? null;
    
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
    let emailString = null;
    let signatureIg = null;
    let signatureLn = null;
    let signatureX = null;

    {signatureArray && signatureArray.forEach(([key, value], i) => {
        const social = value.startsWith("https://instagram.com") || value.startsWith("https://linkedin.com") || value.startsWith("https://x.com") || value.startsWith("https://twitter.com");
        const ig = value.startsWith("https://instagram.com") ? value : null;
        const li = value.startsWith("https://linkedin.com") ? value : null;
        const x = (value.startsWith("https://x.com") || value.startsWith("https://twitter.com")) ? value : null;

        if (!social) {
            if (i === 0) {
                emailString += `<tr><td style="line-height: 1.6; padding-bottom: ${margin[i] ? `10px` : ``}"><strong>${value}</strong><br/></td></tr>`;
            } else {
                if (link[i]) {
                    const linkType = analyzeString(value);
                    const isEmail = linkType.isEmail;
                    const isHttpOrHttps = linkType.isHttpOrHttps;
                    isEmail ? 
                    emailString += `<tr><td style="line-height: 1.6; padding-bottom: ${margin[i] ? `10px` : ``}"><a style="color: ${copyColour}; text-decoration: none;" href="mailto:${value}">${value}<br/></a></td></tr>` 
                        : isHttpOrHttps ? 
                    emailString += `<tr><td style="line-height: 1.6; padding-bottom: ${margin[i] ? `10px` : ``}"><a style="color: ${copyColour}; text-decoration: none;" href="${value}">${value}<br/></a></td></tr>`
                        : 
                    emailString += `<tr><td style="line-height: 1.6; padding-bottom: ${margin[i] ? `10px` : ``}"><a style="color: ${copyColour}; text-decoration: none;" href="https://${value}">${value}<br/></a></td></tr>`;
                } else {
                    emailString += `<tr><td style="line-height: 1.6; padding-bottom: ${margin[i] ? `10px` : ``}">${value}<br/></td></tr>`;
                }
            }
        }

        if (ig) {
            signatureIg = `<td style="padding-right: 5px;"><a href="${ig}"><img src="${base64imgIg}" alt="" width="30" height="30" /></a></td>`;
        }
        if (li) {
            signatureLn = `<td style="padding-right: 5px;"><a href="${li}"><img src="${base64imgLi}" alt="" width="30" height="30" /></a></td>`;
        }
    })}

    const disclaimerCopy = disclaimer ? `
        <tfoot border="0" cell-spacing="0" cell-padding="0" style="margin-top: 10px;">
            <tr><td colspan="2">${disclaimer}</td></tr>
        </tfoot>`
    : ``;

    let signatureTable = `<table width="600" border="0" cellSpacing="0" cellPadding="0"><tbody><tr><td width="179" align="left" valign="top" style="border-right-style: solid; border-right-color: ${copyColour ? copyColour : '#252525'}; border-right-width: 1px; padding-left: 20px;">${signatureLogo}</td><td width="421" align="left" valign="top" style="padding-left: 30px; font-family: Arial, Helvetica, 'sans-serif'; font-size: ${fontSize ? fontSize : '15px'}; line-height: 1.6; color:${copyColour ? copyColour : ''};"><table width="421" border="0" cellSpacing="0" cellPadding="0"><tbody>${emailString}</tbody></table></td>${(signatureIg || signatureLn || signatureX) ? `<table border="0" cell-spacing="0" cell-padding="0" style="margin-top: 10px;"><tbody><tr>${signatureIg}${signatureLn}${signatureX}</tr></tbody>${disclaimerCopy}</table>` : ``}</tr></tbody></table>`;

    return (
        <>
            <div className={`${styles.copySignatureWrap} p-4`}>
                <code>{signatureTable}</code>
            </div>
            <CopySignature signatureTable={signatureTable} index={index} />
        </>
    );
}