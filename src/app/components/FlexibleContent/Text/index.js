const Text = ({ data }) => {
    const copy = data?.copy;

    return (
        <div className="row justify-content-end">
            {copy &&
                <div className='col-md-5'>
                    <div dangerouslySetInnerHTML={{ __html: copy }} />
                </div>
            }
        </div>
    )
}

export default Text;