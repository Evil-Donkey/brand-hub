import Image from 'next/image'
import styles from './HomepageKeyList.module.scss'

const KeyList = ({ keyList }) => {
    return keyList && (
        <div className={styles.keyListWrap}>
            <div className='container py-5'>
                <div className="row justify-content-center">
                    {keyList.map((item, i) => {
                        const { keyItem } = item;
                        return (        
                            <div className='col-md-3 text-center px-md-5 d-flex gap-3 flex-column align-items-center' key={i.toString()}>
                                <Image src="/images/icon-key-list.svg" width={45} height={45} alt="Key List icon" />
                                <p className='mb-0'>{keyItem}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default KeyList;