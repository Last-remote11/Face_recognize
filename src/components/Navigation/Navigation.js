import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon'
import { Dropdown } from 'react-bootstrap'

const Navigation = ({ onRouteChange, isSignedIn, toggleModal }) => {

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="#/action-1"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

    
  if (isSignedIn) {
    return(
      <nav style={{display: 'flex', justifyContent: 'flex-end', padding: '40px'}}>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
          <ProfileIcon />
        </Dropdown.Toggle>

        <Dropdown.Menu style={{backgroundColor: 'rgba(255,255,255,0.5'}}>
          <Dropdown.Item onClick={() => onRouteChange('signout')} style={{cursor: 'pointer'}}>Sign Out</Dropdown.Item>
          <Dropdown.Item onClick={() => toggleModal()} style={{cursor: 'pointer'}}>View Profile</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
        
        
      </nav>
    )
    } else {
    return(
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => onRouteChange('signin')} className='f3 link black b pa3 dim br3' style={{cursor: 'pointer'}}>Sign In</p>
        <p onClick={() => onRouteChange('register')} className='f3 link black b pa3 dim br3' style={{cursor: 'pointer'}}>Register</p>
      </nav>
  )} 
}

export default Navigation;