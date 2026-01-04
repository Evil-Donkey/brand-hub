
import Image from 'next/image'

const LogosGrid = ({ data }) => {

    const { heading, logos } = data;

    return (
        <div>
            <div className='container py-5'>
                {heading && 
                    <div className='row mb-5'>
                        <div className='col text-center'>
                            <h2 className='mb-3 text-uppercase'>{heading}</h2>
                        </div>
                    </div>
                }

                {logos &&
                    <div className='row justify-content-center'>
                        {logos.map((logo, i) => {
                            console.log(logo);
                            return (
                                <div key={i.toString()} className='col-10 col-md-6 col-lg-4'>
                                    <Image src={logo.logo.mediaItemUrl} alt={logo.logo.altText} width={logo.logo.mediaDetails.width} height={logo.logo.mediaDetails.height} />
                                </div>
                            );
                        })}
                    </div>
                }
            </div>
        </div>
    );
} 

export default LogosGrid;