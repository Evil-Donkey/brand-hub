import Tool from './tool'

const BrandedImage = ({ data, bgColour }) => {
    const copy = data?.copy;

    return (
        <div className={`row ${copy ? `justify-content-between` : 'justify-content-end'}`}>
            {copy &&
                <div className='col-md-4'>
                    <div dangerouslySetInnerHTML={{ __html: copy }} />
                </div>
            }
            <div className='col-md-5'>
                <Tool tool={data} bgColour={bgColour} />
            </div> 
        </div>
    )
}

export default BrandedImage;