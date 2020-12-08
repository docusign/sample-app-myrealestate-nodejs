import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import classes from './SideDrawerToggle.module.css';

/*
    Side Drawer toggle component used in mobile view to control
    view of the sidedrawer
    props:
        clicked (function) clickHandler, controls state of a parent
            element, schanging whether or not sidedrawer is rendered
*/
const sideDrawerToggle = (props) => (
    <div className={classes.SideDrawerToggle}>
        <FontAwesomeIcon icon={faBars} onClick={props.clicked} size="2x"/>
    </div>
);

export default sideDrawerToggle;