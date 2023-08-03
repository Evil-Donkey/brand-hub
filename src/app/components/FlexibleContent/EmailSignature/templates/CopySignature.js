import { useState } from "react"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Image from 'next/image'
import styles from '../EmailSignature.module.scss'

const CopySignature = ({ signatureTable }) => {
    const [textSelected, setTextSelected] = useState(false);
    const [signatureSelected, setSignatureSelected] = useState(false);

    const copySignature = () => {
        if (!navigator.clipboard) {
            const copySignature = document.querySelector(".signature");
            const range = document.createRange();
            if (copySignature) {
                range.selectNode(copySignature);
            }
            const windowSelection = window.getSelection();
            if (windowSelection) {
                windowSelection.removeAllRanges();
                windowSelection.addRange(range);
            }
            try {
                let successful = document.execCommand("copy");
                console.log(successful ? "Success" : "Fail");
                setSignatureSelected(true);
                setTextSelected(false);

            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const copySignature = document.getElementsByClassName('signature')[0].innerHTML;
                const blobInput = new Blob([copySignature], {type: 'text/html'});
                const clipboardItemInput = new ClipboardItem({'text/html' : blobInput});
                navigator.clipboard.write([clipboardItemInput]);
                setSignatureSelected(true);
                setTextSelected(false);
            } catch(err) {
                console.log(err);
            }

        }
    };

    const copySourceCode = () => {
        setSignatureSelected(false);
        setTextSelected(true);
    }

    return (
        <div className={`${styles.bbCopyCode} d-flex align-items-center justify-content-end p-3 gap-5`}>
            <div onClick={copySignature} className='d-flex align-items-center gap-2'>
                {!signatureSelected ? <span>Copy signature</span> : <span>Copied</span>}
                    <Image src="/images/icon-clipboard.svg" alt="" width="26" height="27" />
            </div>
            <CopyToClipboard 
                text={signatureTable}
                onCopy={copySourceCode}
            >
                <div className='d-flex align-items-center gap-2'>
                    {!textSelected ? <span>Copy source code</span> : <span>Copied</span>}
                        <Image src="/images/icon-clipboard.svg" alt="" width="26" height="27" />
                </div>
            </CopyToClipboard>
        </div>
    );
}

export default CopySignature;