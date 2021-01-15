import React from 'react';
import logo from './Logo.png'
import Tilt from 'react-tilt'


const Logo = () => {
    return (
        <div style={{display: 'flex', justifyContent:'left'}}>
            <Tilt className="Tilt" options={{ max : 35, perspective: 500 }} style={{ height: 250, width: 250 }} >
            <img className='br4 ma4 mt0 shadow-1' src={logo} width='120px' height='100px' alt='Logo'/>
            </Tilt>
        </div>
    )
}

export default Logo;