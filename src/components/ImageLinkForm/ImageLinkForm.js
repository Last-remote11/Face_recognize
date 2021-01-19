import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div className="br2">
            <p className='f3 hover-purple context'>
                {'This Magic Brain will detect faces in your picture. Git it a try.'}
            </p>
            <div className='center form'>
                <div className='pa4 br3 shadow-5'>
                    <input type='text' style={{width:'600px', height:'40px'}} onChange={onInputChange}/>
                    <button 
                    className='w-15 grow f4 link ph3 pv2 div white bg-light-purple pointer'
                    onClick={onPictureSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm