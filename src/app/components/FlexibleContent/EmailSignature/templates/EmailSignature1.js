'use client'

import { useEffect, useState } from 'react'
import CopySignature from './CopySignature';
import Image from 'next/image'
import styles from '../EmailSignature.module.scss'
import analyzeString from '../../../../lib/analyzeString'
import getBase64StringFromDataURL from '../../../../utils/base64'

export const EmailSignature1 = ({
    bold,
    copyColour, 
    disclaimer, 
    fontSize, 
    footerLogos,
    index, 
    instagramUrl,
    italic, 
    link,
    linkedinUrl,
    linksColour, 
    logo, 
    logoUrl, 
    margin, 
    signature, 
    social,
}) => {

    const signatureArray = signature ? Object.entries(signature) : null;

    const responsiveStyles = `
        @media (max-width: 768px) {
            .footer-logo-td {
                display: block;
                width: 50%; /* Each logo takes half the width of the container */
                float: left;
            }
        }
    `;
    
    return (
        <div id={`emailSignature-${index}`} className='signature'>
            <style dangerouslySetInnerHTML={{ __html: responsiveStyles }} />
            <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                    <tr>
                        <td align="left" valign="top" style={{paddingBottom: '40px', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: fontSize ? fontSize : '15px', lineHeight: '1.3', color: copyColour ? copyColour : '#000000'}}>
                            <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                                <tbody>
                                    {signatureArray && signatureArray.map(([key, value], i) => {
                                        // const social = value.startsWith("https://instagram.com") || value.startsWith("https://www.instagram.com") || value.startsWith("https://linkedin.com") || value.startsWith("https://www.linkedin.com") || value.startsWith("https://x.com") || value.startsWith("https://www.x.com") || value.startsWith("https://twitter.com") || value.startsWith("https://www.twitter.com");

                                        
                                        if (value) {
                                            if (link[i]) {
                                                const linkType = analyzeString(value);
                                                const isEmail = linkType.isEmail;
                                                const isNumber = linkType.isPhoneNumber;
                                                const isHttpOrHttps = linkType.isHttpOrHttps;

                                                return isEmail ?
                                                    <tr key={i.toString()}>
                                                        <td style={{lineHeight: '1.3', fontStyle: italic[i] ? 'italic' : '', fontWeight: bold[i] ? 'bold' : 'normal', paddingBottom: margin[i] ? '10px' : ''}}>
                                                            <a style={{color: linksColour, textDecoration: 'underline'}} href={`mailto:${value}`}>{value}<br/></a>
                                                        </td>
                                                    </tr>
                                                    
                                                : isHttpOrHttps ? 
                                                    <tr key={i.toString()}>
                                                        <td style={{lineHeight: '1.3', fontStyle: italic[i] ? 'italic' : '', fontWeight: bold[i] ? 'bold' : 'normal', paddingBottom: margin[i] ? '10px' : ''}}>
                                                            <a style={{color: linksColour, textDecoration: 'underline'}} href={value}>{value}<br/></a>
                                                        </td>
                                                    </tr>
                                                    
                                                : isNumber ?
                                                    <tr key={i.toString()}>
                                                        <td style={{lineHeight: '1.3', fontStyle: italic[i] ? 'italic' : '', fontWeight: bold[i] ? 'bold' : 'normal', paddingBottom: margin[i] ? '10px' : ''}}>
                                                            <a style={{color: linksColour, textDecoration: 'underline'}} href={`tel:${value}`}>{value}<br/></a>
                                                        </td>
                                                    </tr>
                                                : <tr key={i.toString()}>
                                                        <td style={{lineHeight: '1.3', fontStyle: italic[i] ? 'italic' : '', fontWeight: bold[i] ? 'bold' : 'normal', paddingBottom: margin[i] ? '10px' : ''}}>
                                                            <a style={{color: linksColour, textDecoration: 'underline'}} href={`https://${value}`}>{value}<br/></a>
                                                        </td>
                                                    </tr>;
                                            } else {
                                                return (
                                                    <tr key={i.toString()}>
                                                        <td style={{lineHeight: '1.3', fontStyle: italic[i] ? 'italic' : '', fontWeight: bold[i] ? 'bold' : 'normal', paddingBottom: margin[i] ? '10px' : ''}}>
                                                            {value}<br/>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        }
                                    })}
                                    {/* {social && 
                                        <tr>
                                            <td>
                                                <table border="0" cellSpacing="0" cellPadding="0">
                                                    <tbody>
                                                        {signatureArray && signatureArray.map(([key, value], i) => {
                                                            const social = value.startsWith("https://instagram.com") || value.startsWith("https://linkedin.com") || value.startsWith("https://x.com") || value.startsWith("https://twitter.com");
                                                            const ig = value.startsWith("https://instagram.com") || value.startsWith("https://www.instagram.com") ? value : null;
                                                            const li = value.startsWith("https://linkedin.com") || value.startsWith("https://www.linkedin.com") ? value : null;
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
                                    } */}
                                    {(instagramUrl || linkedinUrl) && 
                                        <tr>
                                            <td>
                                                <table border="0" cellSpacing="0" cellPadding="0">
                                                    <tbody>
                                                        {instagramUrl && 
                                                            <tr>
                                                                <td>
                                                                    <a href={instagramUrl} target="_blank" style={{color: linksColour, textDecoration: 'underline', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '15px', fontWeight: 'normal'}}>
                                                                        Instagram
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        }
                                                        {linkedinUrl && 
                                                            <tr>
                                                                <td>
                                                                    <a href={linkedinUrl} target="_blank" style={{color: linksColour, textDecoration: 'underline', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', fontSize: '15px', fontWeight: 'normal'}}>
                                                                        LinkedIn
                                                                    </a>
                                                                </td>
                                                            </tr>
                                                        }
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
                <table width="100%" border="0" cellSpacing="0" cellPadding="0" style={{borderBottomStyle: 'solid', borderBottomColor: '#000000', borderBottomWidth: '1px'}}>
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
                <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                    <tbody>
                        <tr>
                            {footerLogos.map((logo, index) => {
                                const logoUrl = logo.url;
                                const image = logo.image;
                                return (
                                    <td key={index.toString()} className="footer-logo-td" style={{paddingTop: '15px'}}>
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
                <table width="100%" border="0" cellSpacing="0" cellPadding="0">
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
    
    const [base64img, setBase64img] = useState(logo.mediaItemUrl);
    
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

        if (!social) {
            if (link[i]) {
                const linkType = analyzeString(value);
                const isEmail = linkType.isEmail;
                const isNumber = linkType.isPhoneNumber;
                const isHttpOrHttps = linkType.isHttpOrHttps;
                isEmail ? 
                    emailString += `<tr><td style="line-height: 1.3; font-weight: ${bold[i] ? `bold` : `normal`}; padding-bottom: ${margin[i] ? `10px` : ``}"><a style="color: ${linksColour}; text-decoration: underline;" href="mailto:${value}">${value}<br/></a></td></tr>` 
                : isHttpOrHttps ? 
                    emailString += `<tr><td style="line-height: 1.3; font-weight: ${bold[i] ? `bold` : `normal`}; padding-bottom: ${margin[i] ? `10px` : ``}"><a style="color: ${linksColour}; text-decoration: underline;" href="${value}">${value}<br/></a></td></tr>`
                : isNumber ? 
                    emailString += `<tr><td style="line-height: 1.3; font-weight: ${bold[i] ? `bold` : `normal`}; padding-bottom: ${margin[i] ? `10px` : ``}"><a style="color: ${linksColour}; text-decoration: underline;" href="tel:${value}">${value}<br/></a></td></tr>`
                :   emailString += `<tr><td style="line-height: 1.3; font-weight: ${bold[i] ? `bold` : `normal`}; padding-bottom: ${margin[i] ? `10px` : ``}"><a style="color: ${linksColour}; text-decoration: underline;" href="https://${value}">${value}<br/></a></td></tr>`;
            } else {
                emailString += `<tr><td style="line-height: 1.3; font-weight: ${bold[i] ? `bold` : `normal`}; padding-bottom: ${margin[i] ? `10px` : ``}">${value}<br/></td></tr>`;
            }
        }

        if (ig) {
            signatureIg = `<tr><td><a style="color: ${linksColour}; text-decoration: underline;" href="${ig}">Instagram</a></td></tr>`;
        }
        if (li) {
            signatureLn = `<tr><td><a style="color: ${linksColour}; text-decoration: underline;" href="${li}">Linked</a></td></tr>`;
        }
    })}

    const disclaimerCopy = disclaimer ? `
        <table width="100%" border="0" cellSpacing="0" cellPadding="0">
            <tbody>
                <tr>
                    <td style="padding-top: 20px; font-size: 11px; color: #585858;">
                        ${disclaimer}
                    </td>
                </tr>
            </tbody>
        </table>`
    : ``;

    let signatureTable = `<table width="100%" border="0" cellSpacing="0" cellPadding="0"><tbody><tr><td align="left" valign="top" style="padding-bottom: 30px; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: ${fontSize ? fontSize : '15px'}; line-height: 1.3; color:${copyColour ? copyColour : '#000000'};"><table width="100%" border="0" cellSpacing="0" cellPadding="0"><tbody>${emailString}</tbody></table></td>${(signatureIg || signatureLn) ? `<table border="0" cell-spacing="0" cell-padding="0" style="margin-top: 10px;"><tbody>${signatureIg}${signatureLn}</tbody></table>` : ``}</tr></tbody></table>${disclaimerCopy}`;

    return (
        <>
            <div className={`${styles.copySignatureWrap} p-4`}>
                <code>{signatureTable}</code>
            </div>
            <CopySignature signatureTable={signatureTable} index={index} />
        </>
    );
}