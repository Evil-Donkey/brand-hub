'use client'

import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import hexRgb from 'hex-rgb'
import simpleColorConverter from 'simple-color-converter'
import styles from './Colours.module.scss'
import { rgba } from 'simple-color-converter/_components/_color_sanitizer'

const Colours = ({ data }) => {

    const [textSelected, setTextSelected] = useState(null);
    const copy = (i) => {
        setTextSelected(i);
    }
    const colours = data?.colours;


    // let extraRow = null;
    // if (colours.length % 5 == 0) {
    //     extraRow = '</div><div class="row justify-content-end">';
    // }

    return colours && (
        <div className='row justify-content-end'>
            <div className='col-md-10'>
                <div className='row justify-content-end'>
                    {colours.map((colour, i) => {
                        const name = colour.name;
                        const col = colour.colour;
                        const rgbArray = hexRgb(col);
                        const rgb = `rgb - R${rgbArray.red} G${rgbArray.green} B${rgbArray.blue}`;
                        const cmykConvert = new simpleColorConverter({
                            hex6: col,
                            to: 'cmyk'
                        });
                        const cmyk = `cmyb - C${cmykConvert.color.c} MC${cmykConvert.color.m} Y${cmykConvert.color.y} K${cmykConvert.color.k}`;
                        
                        return colour && (
                            // {extraRow && <div dangerouslySetInnerHTML={{ __html: extraRow }} />}
                            <div key={i.toString()} className='col-md-3 mb-5'>
                                <div className='d-flex flex-column'>
                                    <div className={styles.colourPreview} style={{ 'backgroundColor': col}} />
                                    <div className={`${styles.colourInfo} p-4 bg-white d-flex flex-column gap-2`}>
                                        <h5>{name}</h5>
                                        <div>{cmyk}</div>
                                        <div>{rgb}</div>
                                        <div className='d-flex gap-2 align-items-center'>
                                            <span>{col}</span>
                                            <CopyToClipboard text={col}
                                                onCopy={() => copy(i)}>
                                                <div className={`${styles.copyBtn} d-flex align-items-center justify-content-end gap-2`}>
                                                    <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                                    {textSelected == i ? <span>Copied</span> : null}
                                                </div>
                                            </CopyToClipboard>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Colours;