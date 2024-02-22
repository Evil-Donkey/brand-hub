'use client'

import styles from './Share.module.scss'

import { usePathname } from 'next/navigation';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    FacebookIcon,
    LinkedinIcon,
    XIcon
} from "react-share";

const Share = () => {

    const pathname = usePathname();
    
    return (
        <div className={`d-flex flex-md-column gap-2 ${styles.buttonsWrapper}`}>
            <LinkedinShareButton url={pathname}>
                <LinkedinIcon size={42} borderRadius={8} bgStyle={{ fill: 'white' }} iconFillColor={'#131111'} />
            </LinkedinShareButton>
            <FacebookShareButton url={pathname}>
                <FacebookIcon size={42} borderRadius={8} bgStyle={{ fill: 'white' }} iconFillColor={'#131111'} />
            </FacebookShareButton>
            <TwitterShareButton url={pathname}>
                <XIcon size={42} borderRadius={8} bgStyle={{ fill: 'white' }} iconFillColor={'#131111'} />
            </TwitterShareButton>
        </div>
    );
}

export default Share;