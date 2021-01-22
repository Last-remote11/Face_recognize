import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div className="br2">
            <p className='f3 hover-purple context'>
                {'Paste any image link below.  Then API will catch face in picture.  Even multiple faces & Anime picture.'}<br></br>
                {'※로딩이 길어지면 한번더 눌러주세요'}
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