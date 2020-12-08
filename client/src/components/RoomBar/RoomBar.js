import React from 'react';
import textContent from '../../assets/text.json';
import Button from '../UI/Button/Button';

import classes from './RoomBar.module.css';

/*
    Custom bar for Rooms page that allows the user to switch between 
        displaying open rooms and closed rooms
    props:
        openClick (function) sets the state of the parent element to render open rooms
        closeClick (function) sets the state of the parent element to render closed rooms
*/
const roomBar = (props) => (
    <div className={classes.RoomBar}>
        <button 
            className={classes.LeftButton}
            onClick={props.openClick}>
            {textContent.roombar.openButtonName}
        </button>
        <button 
            className={classes.RightButton}
            onClick={props.closeClick}>
            {textContent.roombar.closedButtonName}
        </button>
    </div>
);
export default roomBar;