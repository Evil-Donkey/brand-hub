import styles from './Contact.module.scss';

const ContactBlock = ({ email, instagram, linkedin, telephone }) => {

    return (
        <div className={`container py-5 ${styles.contactWrapper}`}>
            <div className='row'>
            <div className='col-md-4'>
                <h2 className="mb-3">Our details</h2>
            </div>
            <div className='col-md-8'>
                <div className='d-flex flex-column flex-md-row gap-md-5'>
                <div>
                    <p>
                    <b>Contact us</b>
                    <br />
                    {telephone}
                    <br />
                    {email && <a href={`mailto:${email}`} target="_blank" rel="noreferrer">{email}</a>}
                    </p>
                </div>

                <div>
                    <p>
                    <b>Follow us</b>
                    <br />
                    {instagram && <a href={instagram} target="_blank" rel="noreferrer">Instagram</a>}
                    <br />
                    {linkedin && <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ContactBlock;