const BrandersHero = ({ content, title }) => {
    
    return (content || title) ? (
        <div className='my-5 container'>
            <div className='row justify-content-between'>
                <div className='col-md-6 mb-4 mb-md-0'>
                    <h1>{title}</h1>
                </div>
                <div className='col-md-5'>
                    {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
                </div>
            </div>
        </div>
    ) : null;
}

export default BrandersHero;