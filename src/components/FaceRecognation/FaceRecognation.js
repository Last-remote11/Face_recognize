import React from 'react';
import './FaceRecognation.css';


const generateMultipleBox = (array) => {
    var boundingBoxArray = [];
    for(var i=0; i < array.length; i++) {
    boundingBoxArray.push(
        <div key={i} className='bounding-box' 
        style={{top: array[i].topRow, right: array[i].rightCol, bottom: array[i].bottomRow, left: array[i].leftCol}}
        ></div>
        )
    };
    return boundingBoxArray;
}

const FaceRecognation = ({ box, url }) => {

    if (url) {

    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='result' src={url} width='800px' height='auto' ></img>
                
                {generateMultipleBox(box)}
                
            </div>
        </div>
    )} else {
        return (
            <div className='center ma'>
                <div className='absolute mt2'>
                    
                </div>
            </div>
        )
    }

}

export default FaceRecognation
