import React, { useState } from 'react'
import axios from 'axios'

const UploadForm = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };
    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post('https://csvtojsonbasic.herokuapp.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath });

            alert('CSV converted to JSON');
        } catch (err) {
            if (err.response.status === 500) {
                alert('Problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    };
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className='custom-file mb-4'>
                    <input
                        type='file'
                        className='custom-file-input'
                        id='customFile'
                        onChange={onChange}
                    />
                    <label className='custom-file-label' htmlFor='customFile'>
                        {filename}
                    </label>
                </div>
                <div className='col align-self-center col-md-4'>
                    <input
                        type='submit'
                        value='Convert'
                        className='btn btn-primary btn-block mt-3'
                    />
                </div>
            </form>
            {uploadedFile ? (
                <div className='row mt-5'>
                    <div className='col-md-6 m-auto'>
                        <h3 className='text-center'>{uploadedFile.fileName}</h3>
                    </div>
                </div>
            ) : null}
        </div>
    )
}



export default UploadForm
