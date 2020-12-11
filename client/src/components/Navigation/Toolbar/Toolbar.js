import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import SideDrawerToggle from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';
import textContent from '../../../assets/text.json';
import WhiteHomeIcon from '../../../assets/images/Home.svg';
import BlackHomeIcon from '../../../assets/images/BlackHomeIcon.svg';

import classes from './Toolbar.module.css'

/*
    Toolbar used at the top of every screen
    props:
        clicked: (function) SideDrawerToggle click handler
        homeClick: (function) Home Icon click handler (redirects to login page)
        userName: userName of logged in user 
*/
const navBar = ( props ) => {
    const HomeIcon = ( props.color === 'white' ) ? WhiteHomeIcon : BlackHomeIcon;
    let color = ( props.color === 'white' ) ? {color: 'white'} : null;
    return (
        <div style={color} className={ classes.Navbar }>
            <div className={ classes.ToggleGroup }>
                <SideDrawerToggle clicked={props.sideDrawerToggle}/>
                <div className={classes.Title} onClick={props.homeClick}>
                    <img className={ classes.Icon } src={HomeIcon} alt='Home Icon'></img>
                    <h1> {textContent.toolbar.title}</h1>
                </div>
            </div>

            <div className={ classes.UserProfile } >
                {/* // User Icon can be used in the instance of implementing custom user logins */}
                {/* <FontAwesomeIcon icon={faUserCircle} className={ classes.Profile }  size="3x" /> */}
            </div>
        </div>

    )
}
export default navBar;