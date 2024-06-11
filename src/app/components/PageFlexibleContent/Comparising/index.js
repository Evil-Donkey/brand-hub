import styles from './Comparising.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const Comparising = ({ data, allFeatures, allServices }) => {

    const { backgroundColor, options } = data;

    return (
        <div className={styles.pricingWrapper} style={{backgroundColor: backgroundColor}}>
            <div className='container'>
                <div className='row justify-content-center'>
                    {options && options.map((option, j) => {
                        const { name, priceFrom, priceTo, priceCopy, features, services, theme, ukBadge, logo } = option;

                        return (
                            <div className='col-md-6 col-xl-3 mb-4 position-relative' key={j.toString()}>
                                {ukBadge && <Image className={styles.badge} src='images/icon-uk-company.svg' width={70} height={70} alt="UK company" />}
                                <div className={`p-4 rounded-2 d-flex flex-column h-100 ${styles.pricingOption} ${theme === 'dark' ? styles.pricingOptionDark : styles.pricingOptionLight}`}>

                                    <div className={`${styles.logoWrapper} mb-4 pb-4 text-center`}>
                                        {logo && <Image src={logo.mediaItemUrl} width={logo.mediaDetails.width/2} height={logo.mediaDetails.height/2} alt={logo.altText} />}
                                        {name && <h2>{name}</h2>}
                                    </div>
                                    
                                    {services &&
                                        <div className={`${styles.listWrapper} mb-4 pb-4`}>
                                            <h4 className='mb-3'>Services offered:</h4>
                                            <ul className='m-0 d-flex flex-column gap-1 list-unstyled p-0'>
                                                {allServices.map((service, i) => {
                                                    return (
                                                        <li key={i.toString()} className='d-flex gap-3 align-items-center'>
                                                            {services.includes(service) ? (
                                                                <span className="icon-class">
                                                                    {theme === 'dark' ?
                                                                        <Image src="/images/icon-check-list.svg" width={20} height={20} alt="Checkmark" />
                                                                    :
                                                                        <Image src="/images/icon-check-list-light.svg" width={20} height={20} alt="Checkmark" />
                                                                    }
                                                                </span>
                                                            ) : 
                                                                <span className="icon-class">
                                                                    <Image src="/images/icon-cross.svg" width={20} height={20} alt="Cross" />
                                                                </span>
                                                            }
                                                            {service}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    }

                                    {priceFrom && priceTo &&
                                        <div className={`${styles.priceWrapper} mb-4 pb-4`}>
                                            <h4 className='mb-3'>Price:</h4>
                                            <div className='d-flex align-items-end gap-3 mb-2'>
                                                <p className='m-0'>From:</p>
                                                <h3>£{priceFrom}<span>/month</span></h3>
                                            </div>
                                            <div className='d-flex align-items-end gap-3 mb-4'>
                                                <p className='m-0'>To:</p>
                                                <h3>£{priceTo}<span>/month</span></h3>
                                            </div>
                                            {priceCopy && <p dangerouslySetInnerHTML={{ __html: priceCopy }} />}
                                        </div>
                                    }

                                    {features &&
                                        <div className={`${styles.listWrapper} mb-4 pb-4`}>
                                            <h4 className='mb-3'>Services offered:</h4>
                                            <ul className='m-0 d-flex flex-column gap-1 list-unstyled p-0'>
                                                {allFeatures.map((feature, i) => {
                                                    return (
                                                        <li key={i.toString()} className='d-flex gap-3 align-items-center'>
                                                            {features.includes(feature) ? (
                                                                <span className="icon-class">
                                                                    {theme === 'dark' ?
                                                                        <Image src="/images/icon-check-list.svg" width={20} height={20} alt="Checkmark" />
                                                                    :
                                                                        <Image src="/images/icon-check-list-light.svg" width={20} height={20} alt="Checkmark" />
                                                                    }
                                                                </span>
                                                            ) : 
                                                                <span className="icon-class">
                                                                    <Image src="/images/icon-cross.svg" width={20} height={20} alt="Cross" />
                                                                </span>
                                                            }
                                                            {feature}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Comparising;