import styles from './Pricing.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const Pricing = ({ data, allFeatures, allServices, allServicesRow }) => {

    const { backgroundColor, options } = data;

    return (
        <div className={styles.pricingWrapper} style={{backgroundColor: backgroundColor}}>
            <div className='container'>
                <div className='row justify-content-center'>
                    {options && options.map((option, j) => {
                        const { ctaLabel, ctaUrl, month, name, price, features, services, servicesRow, theme, type } = option;

                        if (type === 'column') {
                            return (
                                <div className='col-md-6 col-lg-3 mb-4' key={j.toString()}>
                                    <div className={`p-4 py-md-5 rounded-2 d-flex flex-column h-100 ${styles.pricingOption} ${theme === 'dark' ? styles.pricingOptionDark : styles.pricingOptionLight}`}>
                                        {name && <h2 className='mb-md-4 text-md-center'>{name}</h2>}
                                        {price && <h3 className={`mb-4 text-md-center ${!month && styles.noMonth}`}>
                                            {month && '£'}{price}{month && <span>/month</span>}
                                        </h3>}
                                        {services &&
                                            <div className='mb-5'>
                                                <h4 className='mb-3'>Services</h4>
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
                                                                        {theme === 'dark' ?
                                                                            <Image src="/images/icon-lock-list.svg" width={20} height={20} alt="Lock" />
                                                                        :
                                                                            <Image src="/images/icon-lock-list-light.svg" width={20} height={20} alt="Lock" />
                                                                        }
                                                                    </span>
                                                                }
                                                                {service}
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        }

                                        {features &&
                                            <div className='mb-5'>
                                                <h4 className='mb-3'>Features</h4>
                                                <ul className='m-0 d-flex flex-column gap-1 list-unstyled p-0'>
                                                    {allFeatures.map((feature, i) => {
                                                        let featureText = feature;
                                                        if (!month && feature === 'One brand') {
                                                            featureText = 'Multiple brands';
                                                        } else if (!month && feature === 'One request at a time') {
                                                            featureText = 'Multiple requests';
                                                        } else if (j !== 0 && feature === '5 day slow delivery') {
                                                            featureText = 'Average 48 hour delivery';
                                                        }
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
                                                                        {theme === 'dark' ?
                                                                            <Image src="/images/icon-lock-list.svg" width={20} height={20} alt="Lock" />
                                                                        :
                                                                            <Image src="/images/icon-lock-list-light.svg" width={20} height={20} alt="Lock" />
                                                                        }
                                                                    </span>
                                                                }
                                                                {featureText}
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        }

                                        {ctaLabel && ctaUrl && (
                                            <div className='align-self-center'>
                                                <Link href={ctaUrl} target="_blank" className={`cta__btn ${theme === 'dark' ? 'cta__btn--transparent' : 'cta__btn--border'}`}>{ctaLabel}</Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        } else if (type === 'row') {
                            return (
                                <div className={`${styles.pricingCardRow} col-12 mb-4`} key={j.toString()}>
                                    <div className={`px-3 px-lg-5 py-4 rounded-2 d-flex flex-column flex-md-row align-items-md-center justify-content-between ${styles.pricingOption} ${theme === 'dark' ? styles.pricingOptionDark : styles.pricingOptionLight}`}>
                                        {name && <h2 className='mb-4 mb-md-0 text-md-center'>{name}</h2>}
                                        {price && <h3 className={`mb-4 mb-md-0 text-md-center ${!month && styles.noMonth}`}>
                                            {month && '£'}{price}{month && <span>/month</span>}
                                        </h3>}

                                        {servicesRow &&
                                            <ul className='mb-4 mb-md-0 d-flex flex-column flex-md-row flex-wrap list-unstyled p-0'>
                                                {allServicesRow.map((service, i) => {
                                                    return (
                                                        <li key={i.toString()} className='d-flex gap-3 align-items-center'>
                                                            {servicesRow.includes(service) ? (
                                                                <span className="icon-class">
                                                                    {theme === 'dark' ?
                                                                        <Image src="/images/icon-check-list.svg" width={20} height={20} alt="Checkmark" />
                                                                    :
                                                                        <Image src="/images/icon-check-list-light.svg" width={20} height={20} alt="Checkmark" />
                                                                    }
                                                                </span>
                                                            ) : 
                                                                <span className="icon-class">
                                                                    {theme === 'dark' ?
                                                                        <Image src="/images/icon-lock-list.svg" width={20} height={20} alt="Lock" />
                                                                    :
                                                                        <Image src="/images/icon-lock-list-light.svg" width={20} height={20} alt="Lock" />
                                                                    }
                                                                </span>
                                                            }
                                                            {service}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        }

                                        {ctaLabel && ctaUrl && (
                                            <div className='align-self-center'>
                                                <Link href={ctaUrl} className={`cta__btn ${theme === 'dark' ? 'cta__btn--transparent' : 'cta__btn--border'}`}>{ctaLabel}</Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default Pricing;