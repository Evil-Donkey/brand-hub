'use client'

import { useState, useRef, useEffect, useCallback } from "react"
import {isMobile} from 'react-device-detect'
import ImageUploading from "react-images-uploading"
import { toPng, toJpeg, toSvg } from 'html-to-image'
import Moveable from "react-moveable"
import Selecto from "react-selecto"
import Image from "next/image"
import styles from "./Tool1.module.scss"
// import arrowSaveImg from '../../../../public/images/press-hold-white.svg'

const Tool = ({ bgColour, tool }) => {

    const itemRef = useRef(null);
    const exportRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [itemWidth, setItemWidth] = useState(null);
    const [itemHeight, setItemHeight] = useState(null);


    // select image
    const [images, setImages] = useState([]);
    const maxNumber = 1;

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    // stickers
    const { stickers, footerImage } = tool;
    
    const firstSticker = stickers ? stickers[0].sticker.sourceUrl : null;
    const firstStickerW = stickers ? stickers[0].sticker.mediaDetails.width : null;
    const firstStickerH = stickers ? stickers[0].sticker.mediaDetails.height : null;
    const [toolSticker, setToolSticker] = useState(firstSticker);
    const [stickerWidth, setStickerWidth] = useState(firstStickerW);
    const [stickerHeight, setStickerHeight] = useState(firstStickerH);
    const [stickerSelected, setStickerSelected] = useState(0);
    const onNoteChange = (sticker, width, height, i) => {
        setToolSticker(sticker);
        setStickerWidth(width);
        setStickerHeight(height);
        setStickerSelected(i);
        moveableRef.current.updateRect();
    };


    const NotesList = () => {
        return (
        <>
            {stickers && stickers.map((sticker, i) => {
                return (
                    <div key={i.toString()} className={`note ${styles.mbMd0} ${loaded && stickerSelected === i ? "active" : !loaded ? "inactive" : ""}`} onClick={() => onNoteChange(sticker.sticker.sourceUrl, sticker.sticker.mediaDetails.width, sticker.sticker.mediaDetails.height, i)}>
                        <span><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M28.3237 11.8697V1.86975L18.3237 1.86975M1.65701 18.5364L1.65701 28.5364H11.657M11.657 1.86969L1.65707 1.86969L1.65707 11.8697M18.3237 28.5364H28.3237V18.5364" stroke={bgColour} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg></span>
                    </div>
                )
            })}
        </>
        );
    }


    // moveable
    const moveableRef = useRef(null);
    const selectoRef = useRef(null);
    const [target, setTarget] = useState();
    const [frame, setFrame] = useState({
        translate: [0,0],
        rotate: 0
    });


    // download
    const [downloading, setDownloading] = useState(false);
    const [alwaysShow, setAlwaysShow] = useState(true);
    const [image, setImage] = useState(null);

    const downloadScreenshot = useCallback(() => {
        if (exportRef.current === null) {
            return
        }

        setTarget([]);
        setDownloading(true);
    }, [exportRef]);


    useEffect(() => {
        if (Array.isArray(target) && downloading) {
            if (target.length === 0) {
                if (isMobile) {
                    toSvg(exportRef.current, { quality: 0.95, backgroundColor: '#ffffff', cacheBust: true, skipFonts: true, includeQueryParams: true })
                        .then((dataUrl) => {
                            setAlwaysShow(false);
                            setImage(dataUrl);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    setDownloading(true);
                } else {
                    toPng(exportRef.current, { cacheBust: true, skipFonts: true, includeQueryParams: true })
                        .then(() => {
                            toPng(exportRef.current, { cacheBust: true, skipFonts: true, includeQueryParams: true })
                                .then(() => {
                                    toPng(exportRef.current, { cacheBust: true, skipFonts: true, includeQueryParams: true })
                                        .then((dataUrl) => {
                                            const link = document.createElement('a');
                                            link.download = 'image-post-creator.png';
                                            link.href = dataUrl;
                                            link.click();
                                            setDownloading(false);
                                        })
                                })
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }
        }
    }, [downloading]);


    useEffect(() => {
        function handleResize() {
            if (itemRef.current) {
                const width = window.getComputedStyle(itemRef.current).width;
                const height = window.getComputedStyle(itemRef.current).height;
                const w = parseInt(width, 10);
                const h = parseInt(height, 10);
                setItemWidth(w);
                setItemHeight(h); 
            }
        }
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [loaded]);

    return (
        <div className="position-relative d-flex flex-column align-items-end h-100">
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                    errors
                }) => (
                    <div className={`${styles.toolWrapper} d-flex flex-column justify-content-${!imageList.length ? 'center' : 'between'} ${imageList.length ? styles.toolWrapperLoaded : ''}`}>
                        <div className={`upload__image-wrapper flex-column d-flex gap-3 justify-content-between`}>
                            {!imageList.length && <div className={`${styles.dragWrapper}`} {...dragProps} onClick={onImageUpload}>

                                {isDragging ? <div className={`${styles.isDragging}`}>
                                    <span className="d-flex align-items-center justify-content-center">
                                        <svg width="38" height="77" viewBox="0 0 38 77" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.66857 73.5H2.69445L2.70714 72.2368H4.66857C5.23986 72.2368 5.71805 72.112 6.10314 71.8623C6.49246 71.6126 6.78445 71.255 6.97912 70.7896C7.17801 70.3241 7.27746 69.7697 7.27746 69.1265V68.625C7.27746 68.1257 7.22033 67.6834 7.10607 67.2983C6.99604 66.9132 6.831 66.5895 6.61095 66.3271C6.39513 66.0648 6.12853 65.8659 5.81115 65.7305C5.498 65.5951 5.13618 65.5273 4.7257 65.5273H2.65636V64.2578H4.7257C5.33931 64.2578 5.90001 64.3615 6.40783 64.5688C6.91564 64.772 7.35363 65.0661 7.72179 65.4512C8.09419 65.8363 8.37983 66.2975 8.57873 66.835C8.77762 67.3724 8.87707 67.9733 8.87707 68.6377V69.1265C8.87707 69.7909 8.77762 70.3918 8.57873 70.9292C8.37983 71.4666 8.09419 71.9279 7.72179 72.313C7.3494 72.6938 6.90506 72.988 6.38878 73.1953C5.87674 73.3984 5.30334 73.5 4.66857 73.5ZM3.57677 64.2578V73.5H1.98351V64.2578H3.57677ZM10.3467 64.2578H13.6157C14.3182 64.2578 14.917 64.3636 15.4121 64.5752C15.9072 64.7868 16.286 65.0999 16.5483 65.5146C16.8149 65.9251 16.9482 66.4329 16.9482 67.0381C16.9482 67.4993 16.8636 67.9056 16.6943 68.2568C16.5251 68.6081 16.286 68.9043 15.977 69.1455C15.6681 69.3825 15.3 69.5666 14.8726 69.6978L14.3901 69.9326H11.4512L11.4385 68.6694H13.6411C14.022 68.6694 14.3394 68.6017 14.5933 68.4663C14.8472 68.3309 15.0376 68.1468 15.1645 67.9141C15.2957 67.6771 15.3613 67.4105 15.3613 67.1143C15.3613 66.7926 15.2978 66.5133 15.1709 66.2764C15.0482 66.0352 14.8577 65.8511 14.5996 65.7241C14.3415 65.5929 14.0135 65.5273 13.6157 65.5273H11.9399V73.5H10.3467V64.2578ZM15.6216 73.5L13.4507 69.3486L15.1201 69.3423L17.3227 73.4175V73.5H15.6216ZM25.7748 68.625V69.1328C25.7748 69.8311 25.6838 70.4574 25.5018 71.0117C25.3199 71.5661 25.0596 72.0379 24.7211 72.4272C24.3868 72.8166 23.9847 73.1149 23.515 73.3223C23.0453 73.5254 22.5248 73.627 21.9535 73.627C21.3864 73.627 20.868 73.5254 20.3983 73.3223C19.9328 73.1149 19.5287 72.8166 19.1859 72.4272C18.8431 72.0379 18.5765 71.5661 18.3861 71.0117C18.1999 70.4574 18.1068 69.8311 18.1068 69.1328V68.625C18.1068 67.9268 18.1999 67.3026 18.3861 66.7524C18.5723 66.1981 18.8347 65.7262 19.1732 65.3369C19.516 64.9434 19.9201 64.645 20.3856 64.4419C20.8553 64.2345 21.3737 64.1309 21.9408 64.1309C22.5121 64.1309 23.0326 64.2345 23.5023 64.4419C23.972 64.645 24.3762 64.9434 24.7147 65.3369C25.0533 65.7262 25.3135 66.1981 25.4955 66.7524C25.6817 67.3026 25.7748 67.9268 25.7748 68.625ZM24.1815 69.1328V68.6123C24.1815 68.096 24.1307 67.6411 24.0292 67.2476C23.9318 66.8498 23.7858 66.5176 23.5912 66.251C23.4008 65.9801 23.1659 65.777 22.8866 65.6416C22.6073 65.502 22.292 65.4321 21.9408 65.4321C21.5896 65.4321 21.2764 65.502 21.0013 65.6416C20.7263 65.777 20.4914 65.9801 20.2968 66.251C20.1063 66.5176 19.9603 66.8498 19.8588 67.2476C19.7572 67.6411 19.7064 68.096 19.7064 68.6123V69.1328C19.7064 69.6491 19.7572 70.1061 19.8588 70.5039C19.9603 70.9017 20.1084 71.2381 20.3031 71.5132C20.502 71.784 20.739 71.9893 21.014 72.1289C21.2891 72.2643 21.6023 72.332 21.9535 72.332C22.309 72.332 22.6242 72.2643 22.8993 72.1289C23.1744 71.9893 23.4071 71.784 23.5975 71.5132C23.788 71.2381 23.9318 70.9017 24.0292 70.5039C24.1307 70.1061 24.1815 69.6491 24.1815 69.1328ZM30.7483 70.0532H28.3425V68.79H30.7483C31.1672 68.79 31.5058 68.7223 31.7639 68.5869C32.0221 68.4515 32.2104 68.2653 32.3289 68.0283C32.4516 67.7871 32.5129 67.512 32.5129 67.2031C32.5129 66.9111 32.4516 66.6382 32.3289 66.3843C32.2104 66.1261 32.0221 65.9188 31.7639 65.7622C31.5058 65.6056 31.1672 65.5273 30.7483 65.5273H28.8313V73.5H27.238V64.2578H30.7483C31.4635 64.2578 32.0707 64.3848 32.5701 64.6387C33.0737 64.8883 33.4566 65.2354 33.719 65.6797C33.9814 66.1198 34.1126 66.6234 34.1126 67.1904C34.1126 67.7871 33.9814 68.2992 33.719 68.7266C33.4566 69.154 33.0737 69.4819 32.5701 69.7104C32.0707 69.939 31.4635 70.0532 30.7483 70.0532ZM37.0231 64.2578L36.8707 70.7769H35.5631L35.4044 64.2578H37.0231ZM35.36 72.7764C35.36 72.5436 35.4362 72.349 35.5885 72.1924C35.7451 72.0316 35.9609 71.9512 36.236 71.9512C36.5068 71.9512 36.7205 72.0316 36.8771 72.1924C37.0337 72.349 37.1119 72.5436 37.1119 72.7764C37.1119 73.0007 37.0337 73.1932 36.8771 73.354C36.7205 73.5106 36.5068 73.5889 36.236 73.5889C35.9609 73.5889 35.7451 73.5106 35.5885 73.354C35.4362 73.1932 35.36 73.0007 35.36 72.7764Z" fill="white"/>
                                        <path d="M1.33325 1.13153V0.381531C0.919038 0.381531 0.583252 0.717317 0.583252 1.13153L1.33325 1.13153ZM36 45.7031V46.4531C36.4142 46.4531 36.75 46.1173 36.75 45.7031H36ZM1.33325 45.7031H0.583252C0.583252 46.1173 0.919038 46.4531 1.33325 46.4531L1.33325 45.7031ZM23.619 1.13153L24.1493 0.601201C24.0087 0.460548 23.8179 0.381531 23.619 0.381531V1.13153ZM36 13.5125H36.75C36.75 13.3136 36.671 13.1228 36.5303 12.9822L36 13.5125ZM19.4166 20.9411C19.4166 20.5269 19.0808 20.1911 18.6666 20.1911C18.2524 20.1911 17.9166 20.5269 17.9166 20.9411H19.4166ZM17.9166 35.7983C17.9166 36.2125 18.2524 36.5483 18.6666 36.5483C19.0808 36.5483 19.4166 36.2125 19.4166 35.7983H17.9166ZM11.238 27.6197C10.8238 27.6197 10.488 27.9555 10.488 28.3697C10.488 28.7839 10.8238 29.1197 11.238 29.1197V27.6197ZM26.0952 29.1197C26.5094 29.1197 26.8452 28.7839 26.8452 28.3697C26.8452 27.9555 26.5094 27.6197 26.0952 27.6197V29.1197ZM36 44.9531H1.33325V46.4531H36V44.9531ZM2.08325 45.7031V1.13153H0.583252V45.7031H2.08325ZM1.33325 1.88153H23.619V0.381531H1.33325V1.88153ZM35.25 13.5125V45.7031H36.75V13.5125H35.25ZM23.0887 1.66186L35.4697 14.0428L36.5303 12.9822L24.1493 0.601201L23.0887 1.66186ZM20.3928 1.13153V11.0363H21.8928V1.13153H20.3928ZM26.0952 16.7387H36V15.2387H26.0952V16.7387ZM20.3928 11.0363C20.3928 14.1857 22.9459 16.7387 26.0952 16.7387V15.2387C23.7743 15.2387 21.8928 13.3572 21.8928 11.0363H20.3928ZM17.9166 20.9411V35.7983H19.4166V20.9411H17.9166ZM11.238 29.1197H26.0952V27.6197H11.238V29.1197Z" fill="white"/>
                                        </svg>
                                        <span></span>
                                    </span>
                                </div> : <div>
                                    <span><svg width="156" height="157" viewBox="0 0 156 157" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M47.6103 91.4893L44.849 99.5H43.1796L46.6581 90.2578H47.7245L47.6103 91.4893ZM49.9208 99.5L47.1532 91.4893L47.0326 90.2578H48.1054L51.5966 99.5H49.9208ZM49.7875 96.0723V97.3354H44.7602V96.0723H49.7875ZM55.1863 99.5H53.2122L53.2249 98.2368H55.1863C55.7576 98.2368 56.2358 98.112 56.6209 97.8623C57.0102 97.6126 57.3022 97.255 57.4969 96.7896C57.6958 96.3241 57.7952 95.7697 57.7952 95.1265V94.625C57.7952 94.1257 57.7381 93.6834 57.6238 93.2983C57.5138 92.9132 57.3488 92.5895 57.1287 92.3271C56.9129 92.0648 56.6463 91.8659 56.3289 91.7305C56.0157 91.5951 55.6539 91.5273 55.2435 91.5273H53.1741V90.2578H55.2435C55.8571 90.2578 56.4178 90.3615 56.9256 90.5688C57.4334 90.772 57.8714 91.0661 58.2395 91.4512C58.6119 91.8363 58.8976 92.2975 59.0965 92.835C59.2954 93.3724 59.3948 93.9733 59.3948 94.6377V95.1265C59.3948 95.7909 59.2954 96.3918 59.0965 96.9292C58.8976 97.4666 58.6119 97.9279 58.2395 98.313C57.8671 98.6938 57.4228 98.988 56.9065 99.1953C56.3945 99.3984 55.8211 99.5 55.1863 99.5ZM54.0945 90.2578V99.5H52.5013V90.2578H54.0945ZM63.5495 99.5H61.5754L61.5881 98.2368H63.5495C64.1208 98.2368 64.599 98.112 64.9841 97.8623C65.3734 97.6126 65.6654 97.255 65.86 96.7896C66.0589 96.3241 66.1584 95.7697 66.1584 95.1265V94.625C66.1584 94.1257 66.1012 93.6834 65.987 93.2983C65.877 92.9132 65.7119 92.5895 65.4919 92.3271C65.276 92.0648 65.0094 91.8659 64.6921 91.7305C64.3789 91.5951 64.0171 91.5273 63.6066 91.5273H61.5373V90.2578H63.6066C64.2202 90.2578 64.7809 90.3615 65.2887 90.5688C65.7966 90.772 66.2345 91.0661 66.6027 91.4512C66.9751 91.8363 67.2607 92.2975 67.4596 92.835C67.6585 93.3724 67.758 93.9733 67.758 94.6377V95.1265C67.758 95.7909 67.6585 96.3918 67.4596 96.9292C67.2607 97.4666 66.9751 97.9279 66.6027 98.313C66.2303 98.6938 65.786 98.988 65.2697 99.1953C64.7577 99.3984 64.1843 99.5 63.5495 99.5ZM62.4577 90.2578V99.5H60.8644V90.2578H62.4577ZM74.0361 90.2578V99.5H72.4428V90.2578H74.0361ZM76.534 90.2578H77.9559L80.6282 97.3862L83.2943 90.2578H84.7161L81.1868 99.5H80.0569L76.534 90.2578ZM75.8865 90.2578H77.2386L77.4735 96.4277V99.5H75.8865V90.2578ZM84.0115 90.2578H85.3699V99.5H83.7767V96.4277L84.0115 90.2578ZM90.8449 91.4893L88.0837 99.5H86.4143L89.8928 90.2578H90.9592L90.8449 91.4893ZM93.1555 99.5L90.3879 91.4893L90.2673 90.2578H91.34L94.8312 99.5H93.1555ZM93.0222 96.0723V97.3354H87.9948V96.0723H93.0222ZM102.731 94.7773V98.3066C102.6 98.4801 102.395 98.6706 102.115 98.8779C101.84 99.0811 101.474 99.2567 101.017 99.4048C100.56 99.5529 99.991 99.627 99.3096 99.627C98.7299 99.627 98.1988 99.5296 97.7164 99.335C97.234 99.1361 96.8171 98.8462 96.4659 98.4653C96.1189 98.0845 95.8502 97.6211 95.6597 97.0752C95.4693 96.5251 95.3741 95.8988 95.3741 95.1963V94.5552C95.3741 93.8569 95.4608 93.2349 95.6343 92.689C95.8121 92.1388 96.066 91.6733 96.3961 91.2925C96.7261 90.9116 97.1239 90.6239 97.5894 90.4292C98.0592 90.2303 98.5902 90.1309 99.1827 90.1309C99.9402 90.1309 100.566 90.2578 101.062 90.5117C101.561 90.7614 101.946 91.1084 102.217 91.5527C102.488 91.9971 102.659 92.5049 102.731 93.0762H101.17C101.119 92.7546 101.019 92.4668 100.871 92.2129C100.727 91.959 100.52 91.7601 100.249 91.6162C99.9825 91.4681 99.6355 91.394 99.2081 91.394C98.8399 91.394 98.5162 91.4639 98.2369 91.6035C97.9576 91.7432 97.7248 91.9484 97.5386 92.2192C97.3567 92.4901 97.2191 92.8201 97.126 93.2095C97.033 93.5988 96.9864 94.0431 96.9864 94.5425V95.1963C96.9864 95.7041 97.0393 96.1548 97.1451 96.5483C97.2551 96.9419 97.4117 97.2741 97.6148 97.5449C97.8222 97.8158 98.074 98.021 98.3702 98.1606C98.6664 98.2961 99.0007 98.3638 99.3731 98.3638C99.7371 98.3638 100.035 98.3341 100.268 98.2749C100.501 98.2114 100.685 98.1374 100.82 98.0527C100.96 97.9639 101.068 97.8792 101.144 97.7988V95.9644H99.2208V94.7773H102.731ZM110.415 98.2368V99.5H105.508V98.2368H110.415ZM105.959 90.2578V99.5H104.366V90.2578H105.959ZM109.774 94.1172V95.3613H105.508V94.1172H109.774ZM110.383 90.2578V91.5273H105.508V90.2578H110.383ZM53.9612 105.258V114.5H52.3807V105.258H53.9612ZM56.8621 105.258V106.527H49.5052V105.258H56.8621ZM65.1427 109.625V110.133C65.1427 110.831 65.0518 111.457 64.8698 112.012C64.6878 112.566 64.4276 113.038 64.089 113.427C63.7547 113.817 63.3527 114.115 62.883 114.322C62.4133 114.525 61.8927 114.627 61.3215 114.627C60.7544 114.627 60.236 114.525 59.7663 114.322C59.3008 114.115 58.8967 113.817 58.5539 113.427C58.2111 113.038 57.9445 112.566 57.7541 112.012C57.5679 111.457 57.4748 110.831 57.4748 110.133V109.625C57.4748 108.927 57.5679 108.303 57.7541 107.752C57.9403 107.198 58.2026 106.726 58.5412 106.337C58.884 105.943 59.2881 105.645 59.7536 105.442C60.2233 105.235 60.7417 105.131 61.3088 105.131C61.8801 105.131 62.4006 105.235 62.8703 105.442C63.34 105.645 63.7441 105.943 64.0827 106.337C64.4212 106.726 64.6815 107.198 64.8635 107.752C65.0496 108.303 65.1427 108.927 65.1427 109.625ZM63.5495 110.133V109.612C63.5495 109.096 63.4987 108.641 63.3971 108.248C63.2998 107.85 63.1538 107.518 62.9592 107.251C62.7687 106.98 62.5339 106.777 62.2546 106.642C61.9753 106.502 61.66 106.432 61.3088 106.432C60.9575 106.432 60.6444 106.502 60.3693 106.642C60.0942 106.777 59.8594 106.98 59.6647 107.251C59.4743 107.518 59.3283 107.85 59.2267 108.248C59.1252 108.641 59.0744 109.096 59.0744 109.612V110.133C59.0744 110.649 59.1252 111.106 59.2267 111.504C59.3283 111.902 59.4764 112.238 59.6711 112.513C59.87 112.784 60.1069 112.989 60.382 113.129C60.6571 113.264 60.9702 113.332 61.3215 113.332C61.6769 113.332 61.9922 113.264 62.2673 113.129C62.5423 112.989 62.7751 112.784 62.9655 112.513C63.1559 112.238 63.2998 111.902 63.3971 111.504C63.4987 111.106 63.5495 110.649 63.5495 110.133ZM74.5756 112.12C74.5756 111.929 74.546 111.76 74.4868 111.612C74.4317 111.464 74.3323 111.328 74.1884 111.206C74.0445 111.083 73.8414 110.964 73.579 110.85C73.3209 110.732 72.9908 110.611 72.5888 110.488C72.1487 110.353 71.7425 110.203 71.3701 110.038C71.0019 109.868 70.6803 109.674 70.4052 109.454C70.1301 109.229 69.9164 108.973 69.7641 108.686C69.6118 108.394 69.5356 108.057 69.5356 107.676C69.5356 107.3 69.6139 106.957 69.7704 106.648C69.9313 106.339 70.1577 106.072 70.4496 105.848C70.7459 105.62 71.095 105.444 71.497 105.321C71.899 105.194 72.3434 105.131 72.83 105.131C73.5156 105.131 74.1059 105.258 74.601 105.512C75.1004 105.766 75.4833 106.106 75.7499 106.534C76.0208 106.961 76.1562 107.433 76.1562 107.949H74.5756C74.5756 107.645 74.51 107.376 74.3788 107.143C74.2519 106.906 74.0572 106.72 73.7949 106.584C73.5367 106.449 73.2088 106.381 72.811 106.381C72.4343 106.381 72.1212 106.438 71.8715 106.553C71.6218 106.667 71.4356 106.821 71.3129 107.016C71.1902 107.211 71.1288 107.431 71.1288 107.676C71.1288 107.85 71.169 108.008 71.2494 108.152C71.3299 108.292 71.4526 108.423 71.6176 108.546C71.7827 108.664 71.99 108.777 72.2397 108.882C72.4894 108.988 72.7835 109.09 73.122 109.187C73.6341 109.339 74.0805 109.509 74.4614 109.695C74.8422 109.877 75.1596 110.084 75.4135 110.317C75.6674 110.55 75.8578 110.814 75.9848 111.11C76.1118 111.402 76.1752 111.735 76.1752 112.107C76.1752 112.496 76.0969 112.847 75.9404 113.161C75.7838 113.47 75.5595 113.734 75.2675 113.954C74.9798 114.17 74.6327 114.337 74.2265 114.456C73.8245 114.57 73.3759 114.627 72.8808 114.627C72.4365 114.627 71.9985 114.568 71.5668 114.449C71.1394 114.331 70.7501 114.151 70.3989 113.91C70.0476 113.664 69.7683 113.36 69.561 112.996C69.3536 112.627 69.2499 112.198 69.2499 111.707H70.8432C70.8432 112.007 70.894 112.264 70.9955 112.475C71.1013 112.687 71.2473 112.86 71.4335 112.996C71.6197 113.127 71.8355 113.224 72.081 113.288C72.3307 113.351 72.5973 113.383 72.8808 113.383C73.2532 113.383 73.5642 113.33 73.8139 113.224C74.0678 113.118 74.2582 112.97 74.3852 112.78C74.5121 112.589 74.5756 112.369 74.5756 112.12ZM81.2567 105.258V114.5H79.6761V105.258H81.2567ZM84.1575 105.258V106.527H76.8006V105.258H84.1575ZM88.236 106.489L85.4748 114.5H83.8054L87.2839 105.258H88.3503L88.236 106.489ZM90.5466 114.5L87.779 106.489L87.6584 105.258H88.7311L92.2224 114.5H90.5466ZM90.4133 111.072V112.335H85.3859V111.072H90.4133ZM93.127 105.258H96.3961C97.0985 105.258 97.6973 105.364 98.1925 105.575C98.6876 105.787 99.0663 106.1 99.3287 106.515C99.5953 106.925 99.7286 107.433 99.7286 108.038C99.7286 108.499 99.644 108.906 99.4747 109.257C99.3054 109.608 99.0663 109.904 98.7574 110.146C98.4485 110.382 98.0803 110.567 97.6529 110.698L97.1705 110.933H94.2315L94.2188 109.669H96.4215C96.8023 109.669 97.1197 109.602 97.3736 109.466C97.6275 109.331 97.8179 109.147 97.9449 108.914C98.0761 108.677 98.1417 108.41 98.1417 108.114C98.1417 107.793 98.0782 107.513 97.9512 107.276C97.8285 107.035 97.6381 106.851 97.38 106.724C97.1218 106.593 96.7939 106.527 96.3961 106.527H94.7203V114.5H93.127V105.258ZM98.4019 114.5L96.231 110.349L97.9005 110.342L100.103 114.417V114.5H98.4019ZM104.556 105.258V114.5H102.976V105.258H104.556ZM107.457 105.258V106.527H100.1V105.258H107.457Z" fill="white"/>
                                    <path d="M66.3333 41.7031V40.9531C65.919 40.9531 65.5833 41.2889 65.5833 41.7031H66.3333ZM89.6666 71.7031V72.4531C90.0808 72.4531 90.4166 72.1173 90.4166 71.7031H89.6666ZM66.3333 71.7031H65.5833C65.5833 72.1173 65.919 72.4531 66.3333 72.4531V71.7031ZM81.3333 41.7031L81.8636 41.1727C81.7229 41.0321 81.5322 40.9531 81.3333 40.9531V41.7031ZM89.6666 50.0364H90.4166C90.4166 49.8375 90.3376 49.6467 90.1969 49.5061L89.6666 50.0364ZM78.7499 55.0364C78.7499 54.6222 78.4141 54.2864 77.9999 54.2864C77.5857 54.2864 77.2499 54.6222 77.2499 55.0364H78.7499ZM77.2499 65.0364C77.2499 65.4506 77.5857 65.7864 77.9999 65.7864C78.4141 65.7864 78.7499 65.4506 78.7499 65.0364H77.2499ZM72.9999 59.2864C72.5857 59.2864 72.2499 59.6222 72.2499 60.0364C72.2499 60.4506 72.5857 60.7864 72.9999 60.7864V59.2864ZM82.9999 60.7864C83.4141 60.7864 83.7499 60.4506 83.7499 60.0364C83.7499 59.6222 83.4141 59.2864 82.9999 59.2864V60.7864ZM89.6666 70.9531H66.3333V72.4531H89.6666V70.9531ZM67.0833 71.7031V41.7031H65.5833V71.7031H67.0833ZM66.3333 42.4531H81.3333V40.9531H66.3333V42.4531ZM88.9166 50.0364V71.7031H90.4166V50.0364H88.9166ZM80.8029 42.2334L89.1363 50.5667L90.1969 49.5061L81.8636 41.1727L80.8029 42.2334ZM78.9166 41.7031V48.3697H80.4166V41.7031H78.9166ZM82.9999 52.4531H89.6666V50.9531H82.9999V52.4531ZM78.9166 48.3697C78.9166 50.6249 80.7448 52.4531 82.9999 52.4531V50.9531C81.5732 50.9531 80.4166 49.7965 80.4166 48.3697H78.9166ZM77.2499 55.0364V65.0364H78.7499V55.0364H77.2499ZM72.9999 60.7864H82.9999V59.2864H72.9999V60.7864Z" fill="white"/>
                                    {/* <circle cx="78" cy="78.5" r="77" stroke="white" strokeWidth="2" strokeDasharray="10 10"/> */}
                                    </svg></span>
                                </div>}
                                
                            </div>}
                            
                            {alwaysShow && imageList.length > 0 && 
                                <>
                                    {stickers.length > 1 && <div className={`${styles.buttonsWrapper} d-flex flex-column align-items-center`}>
                                        <div className={`d-grid d-md-flex flex-wrap gap-2 w-100 mt-4 justify-content-center`}>
                                            <NotesList />
                                        </div>
                                    </div>}

                                    <div className={styles.imageItem}>
                                        <div className={`${styles.imageItemWrapper} position-relative`} ref={exportRef}>
                                            {imageList.length > 0 && imageList.map((image, i) => {
                                                return (
                                                    <img key={i.toString()} ref={itemRef} className="background-image-tool d-none" src={image["data_url"]} onLoad={() => setLoaded(true)} />
                                                )
                                            })}

                                            {imageList.length > 0 ? imageList.map((image, i) => (
                                                <div key={i.toString()} ref={itemRef} className="background-image-tool imagelist__bg">
                                                    <img className="background-image-src" src={image["data_url"]} />
                                                    {footerImage && <Image width={footerImage.mediaDetails.width} height={footerImage.mediaDetails.height} src={footerImage.sourceUrl} className="stamma-footer-banner" alt="Image post creator footer" />}
                                                </div>
                                            )) : 
                                                <div ref={itemRef} className="background-image-tool imagelist__bg">
                                                    <img className="background-image-src" src={bg.src} />
                                                    {footerImage && <Image width={footerImage.mediaDetails.width} height={footerImage.mediaDetails.height} src={footerImage.sourceUrl} className="stamma-footer-banner" alt="Image post creator footer" />}
                                                </div>
                                            }
                                            
                                            {loaded && toolSticker && stickerWidth && stickerHeight && <>
                                                <div className="target__wrapper target">
                                                    <Image fill src={toolSticker} alt="Overlay title" onLoadingComplete={() => setTarget(document.querySelector(".target"))} />
                                                </div>

                                                <Selecto
                                                    ref={selectoRef}
                                                    selectableTargets={[".target"]}
                                                    hitRate={0}
                                                    selectByClick={true}
                                                    selectFromInside={false}
                                                    ratio={0}
                                                    onDragStart={e => {
                                                        const moveable = moveableRef.current;
                                                        const targetEl = e.inputEvent.target;
                                                        if (
                                                            moveable.isMoveableElement(targetEl)
                                                        ) {
                                                            e.stop();
                                                        }
                                                    }}
                                                    onSelectEnd={e => {
                                                        const moveable = moveableRef.current;
                                                        // actions.theme.imageTargetAction(e.selected);
                                                        setTarget(e.selected);
                                                    
                                                        if (e.isDragStart) {
                                                            e.inputEvent.preventDefault();
                                                    
                                                            setTimeout(() => {
                                                                moveable.dragStart(e.inputEvent);
                                                            });
                                                        }
                                                    }}
                                                />

                                                <Moveable
                                                    ref={moveableRef}
                                                    target={target}
                                                    draggable={true}
                                                    throttleDrag={0}
                                                    startDragRotate={0}
                                                    throttleDragRotate={0}

                                                    snappable={true}
                                                    snapThreshold={5}
                                                    snapCenter={false}
                                                    bounds={{ left: 0, top: 0, bottom: itemHeight, right: itemWidth }}

                                                    resizable={true}
                                                    keepRatio={true}
                                                    throttleResize={0}
                                                    resizeFormat={size => ([Math.trunc(size[0]), Math.trunc(size[1])])}
                                                    renderDirections={["nw","ne","sw","se"]}
                                                    edge={false}

                                                    rotatable={true}
                                                    throttleRotate={0}
                                                    rotationPosition={"top"}

                                                    pinchable={true}
                                                    pinchThreshold={20}

                                                    zoom={1}
                                                    origin={true}
                                                    padding={{"left": 0, "top": 0, "right": 0, "bottom": 0}}

                                                    onDragStart={e => {
                                                        e.set(frame.translate);
                                                    }}
                                                    onDrag={e => {
                                                        frame.translate = e.beforeTranslate;
                                                        e.target.style.transform = `translate(${e.beforeTranslate[0]}px, ${e.beforeTranslate[1]}px) rotate(${frame.rotate}deg)`;
                                                    }}
                                                    onRotateStart={e => {
                                                        e.set(frame.rotate);
                                                    }}
                                                    onRotate={({beforeRotate, target}) => {
                                                        frame.rotate = beforeRotate;
                                                        target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px) rotate(${beforeRotate}deg)`;
                                                    }}
                                                    onResizeStart={e => {
                                                        e.setOrigin(["%", "%"]);
                                                        e.dragStart && e.dragStart.set(frame.translate);
                                                    }}
                                                    onResize={e => {
                                                        const beforeTranslate = e.drag.beforeTranslate;
                                                        frame.translate = beforeTranslate;
                                                        e.target.style.width = `${e.width}px`;
                                                        e.target.style.height = `${e.height}px`;
                                                        e.target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px) rotate(${frame.rotate}deg)`;
                                                    }}
                                                />
                                            </>}
                                        </div>
                                    </div>
                                    
                                    {isMobile ? <div className={`${styles.filesWrap} d-flex align-items-center gap-2 align-self-center ${!loaded ? `inactive` : ``}`} onClick={downloadScreenshot}>
                                        <h5 className={`${styles.assetsBtn} d-flex gap-2 align-items-center`}>
                                            <div className='d-flex gap-2 align-items-center'>
                                                <span>Save or share your image</span>
                                                <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.67501 14.7716L9.67501 1.56396M9.67501 14.7716L5.27246 10.3691M9.67501 14.7716L14.0776 10.3691" stroke="#F8F8F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <line x1="1.51001" y1="19.9648" x2="17.8403" y2="19.9648" stroke="#F8F8F8" strokeWidth="1.5" strokeLinecap="round"/>
                                                </svg>
                                            </div>
                                        </h5>
                                    </div> : 
                                    <div className={`${styles.filesWrap} d-flex align-items-center gap-2 align-self-center ${!loaded ? `inactive` : ``}`} onClick={downloadScreenshot}>
                                        <h5 className={`${styles.assetsBtn} d-flex gap-2 align-items-center`}>
                                            <div className='d-flex gap-2 align-items-center'>
                                                <span>Download</span>
                                                <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.67501 14.7716L9.67501 1.56396M9.67501 14.7716L5.27246 10.3691M9.67501 14.7716L14.0776 10.3691" stroke="#F8F8F8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <line x1="1.51001" y1="19.9648" x2="17.8403" y2="19.9648" stroke="#F8F8F8" strokeWidth="1.5" strokeLinecap="round"/>
                                                </svg>
                                            </div>
                                        </h5>
                                    </div>}
                                </>
                            }


                            {image && isMobile && <>
                                {/* <div className="press-hold d-flex flex-column align-items-center justify-content-center p-2">
                                    <Image src={arrowSaveImg} alt="press-hold-icon" width="200" />
                                </div> */}

                                <div className={`${styles.saveImageWrapper}`}>
                                    <Image src={image} alt={"ScreenShot"} fill style={{objectFit:"contain"}} sizes="100vw" />
                                </div>
                            </>
                            }

                            {errors && (
                                <div className={styles.errorMessages}>
                                    {errors.maxNumber && (
                                        <span>Number of selected images exceeds the limit</span>
                                    )}
                                    {errors.acceptType && (
                                        <span>File type not allowed</span>
                                    )}
                                    {errors.maxFileSize && (
                                        <span>Selected file size exceed</span>
                                    )}
                                    {errors.resolution && (
                                        <span>{`Selected file doesn't match the desired resolution`}</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}

export default Tool;