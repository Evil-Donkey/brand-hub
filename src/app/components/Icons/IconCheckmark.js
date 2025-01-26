const IconCheckmark = ({ style }) => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="9.67383" fill={style ? style : '#fff'}/>
        <path d="M13.4999 7.27539L8.55374 12.9555L6.30542 10.3737" stroke="#4C4C4C" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default IconCheckmark;