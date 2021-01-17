import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    
    if (isSignedIn) {
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signout')} className='f3 link black b pa3 dim br3' style={{cursor: 'pointer'}}>Sign Out</p>
            </nav>
        )
        } else {
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='f3 link black b pa3 dim br3' style={{cursor: 'pointer'}}>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f3 link black b pa3 dim br3' style={{cursor: 'pointer'}}>Register</p>
            </nav>
        )

        }
    
}

export default Navigation;