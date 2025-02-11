import styles from './Service.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import IconDesignBorder from '@/app/components/Icons/IconDesignBorder';
import IconCodeBorder from '@/app/components/Icons/IconCodeBorder';
import IconCheckmark from '@/app/components/Icons/IconCheckmark';
const Service = ({ data }) => {

    const { service, services, otherServiceCopy, features, otherServiceUrl, otherServiceIcon, price, signUpUrl, icon } = data;

    const themeColour = service === 'code-hub' ? `var(--colour-blue)` : `var(--colour-purple)`;

    return (
        <div className={styles.serviceWrapper}>
            <div className='container py-5'>

                <div className='row justify-content-between align-items-start'>
                    <div className='col-md-5 col-lg-4 col-xxl-3 d-flex flex-column gap-5'>
                        <div className={`p-4 pt-5 py-md-5 rounded-2 d-flex flex-column h-100 position-relative ${styles.pricingOption} ${styles.pricingOptionDark}`}>
                            <div className={styles.pricingOptionIcon}>
                                {icon && <Image src={icon.mediaItemUrl} alt={`${service} icon`} width={icon.mediaDetails.width} height={icon.mediaDetails.height} />}
                            </div>
                            <h2 className='mb-md-4 text-center'>
                                {service === 'code-hub' ? `Code Hub` : `Design Hub`}
                            </h2>
                            {price && <h3 className={`mb-4 text-center`}>
                                £{price}<span>/month</span>
                            </h3>}
                            {signUpUrl && (
                                <div className='align-self-center'>
                                    <Link href={signUpUrl} target="_blank" className={`cta__btn cta__btn--${service === 'code-hub' ? `blue` : `purple`}`}>Sign Up now</Link>
                                </div>
                            )}
                        </div>
                        
                        <div className={`p-4 pt-5 py-md-5 rounded-2 d-flex flex-column h-100 position-relative text-center ${styles.pricingOption} ${styles.pricingOptionOutlined}`}>
                            {otherServiceIcon && (
                                <div className={styles.pricingOptionIcon}>
                                    <Image src={otherServiceIcon.mediaItemUrl} alt={`${service} icon`} width={otherServiceIcon.mediaDetails.width} height={otherServiceIcon.mediaDetails.height} />
                                </div>
                            )}
                            {otherServiceCopy && <p>{otherServiceCopy}</p>}
                            {otherServiceUrl && (
                                <div className='align-self-center'>
                                    <Link href={otherServiceUrl} className={`cta__btn cta__btn--light`}>Find out more</Link>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='col-md-7 col-lg-6 mt-5 mt-md-0'>
                        <h2 className='mb-3 text-uppercase'>What&apos;s included?</h2>

                        <table className={`${styles.pricingTable} table`}>
                            <thead>
                                <tr>
                                    <th>Services</th>
                                    {service === 'code-hub' ? (
                                        <th className='text-center'>
                                            <IconCodeBorder />
                                            <h3 className="text-uppercase">Code Hub</h3>
                                        </th>
                                    ) : (
                                        <th className='text-center'>
                                            <IconDesignBorder />
                                            <h3 className="text-uppercase">Design Hub</h3>
                                        </th>
                                    )}
                                </tr>
                            </thead>

                            <tbody>
                                {services.map((service, i) => (
                                    <tr key={`service-${i}`}>
                                        <td>{service}</td>
                                        <td className='text-center'>
                                            <IconCheckmark style={themeColour} />
                                        </td>
                                    </tr>
                                ))}
                                <tr className={styles.pricingTableTrLast}>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>

                            <thead>
                                <tr>
                                    <th>Features</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((feature, i) => (
                                    <tr key={`service-${i}`}>
                                        <td>{feature}</td>
                                        <td className='text-center'>
                                            <IconCheckmark style={themeColour} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Service;