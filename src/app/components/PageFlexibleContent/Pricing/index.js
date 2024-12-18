import styles from './Pricing.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const Pricing = ({ data, allFeatures, allServices }) => {

    const { backgroundColor, options } = data;

    return (
        <div className={styles.pricingWrapper} style={{backgroundColor: backgroundColor}}>
            <div className='container'>
                <div className='row justify-content-center'>
                    {options && options.map((option, j) => {
                        const { name, price, theme } = option;

                        return (
                            <div className='col-md-6 col-lg-4 mb-4' key={j.toString()}>
                                <div className={`p-4 py-md-5 rounded-2 d-flex flex-column h-100 ${styles.pricingOption} ${styles.pricingOptionDark}`} style={{backgroundColor: theme}}>
                                    {name && <h2 className='mb-md-4 text-md-center'>{name}</h2>}
                                    {price && <h3 className={`mb-4 text-md-center`}>
                                        £{price}<span>/month</span>
                                    </h3>}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className='row justify-content-center'>
                    {options && options.map((option, j) => {
                        const { ctaLabel, ctaUrl, features, services } = option;

                        return (
                            <div className='col-md-6 col-lg-4 mb-4' key={j.toString()}>
                                <div className={`p-4 py-md-5 rounded-2 d-flex flex-column h-100 ${styles.pricingOption} ${styles.pricingOptionDark}`}>
                                    {services &&
                                        <div className='mb-5'>
                                            <h4 className='mb-3'>Services</h4>
                                            <ul className='m-0 d-flex flex-column gap-1 list-unstyled p-0'>
                                                {allServices.map((service, i) => {
                                                    return (
                                                        <li key={i.toString()} className='d-flex gap-3 align-items-center'>
                                                            {services.includes(service) ? (
                                                                <span className="icon-class">
                                                                    <Image src="/images/icon-check-list.svg" width={20} height={20} alt="Checkmark" />
                                                                </span>
                                                            ) : 
                                                                <span className="icon-class">
                                                                    <Image src="/images/icon-lock-list.svg" width={20} height={20} alt="Lock" />
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
                                                    return (
                                                        <li key={i.toString()} className='d-flex gap-3 align-items-center'>
                                                            {features.includes(feature) ? (
                                                                <span className="icon-class">
                                                                    <Image src="/images/icon-check-list.svg" width={20} height={20} alt="Checkmark" />
                                                                </span>
                                                            ) : 
                                                                <span className="icon-class">
                                                                    <Image src="/images/icon-lock-list.svg" width={20} height={20} alt="Lock" />
                                                                </span>
                                                            }
                                                            {feature}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    }

                                    {ctaLabel && ctaUrl && (
                                        <div className='align-self-center'>
                                            <Link href={ctaUrl} target="_blank" className={`cta__btn cta__btn--transparent`}>{ctaLabel}</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Pricing;