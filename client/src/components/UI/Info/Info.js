import React from 'react';
import Modal from '../Modal/Modal'
import LoginInfo from './InfoContent/LoginInfo/LoginInfo';
import LeadsInfo from './InfoContent/LeadsInfo/LeadsInfo';
import RoomsInfo from './InfoContent/RoomsInfo/RoomsInfo';
import RoomInfo from './InfoContent/RoomInfo/RoomInfo';

import classes from './Info.module.css';

/*
    Info Button (fa i icon) that displays an info modal
        when clicked. Use in conjunction with a backdrop
        component that has a click handler that can close
        the info modal
    Props:
        click: (function) click handler that controls the state of the
            parent container, changing wether or not the info button 
            is displayed
        show:  (boolean) whether or not the info component is displayed
        page: (String) the page the info is being rendered for
    author: David Kennedy
*/
const info = ({click, show, page, children}) => {

    //determine which content to render.
    let infoContent;
    switch(page) {
        case "Login":
            infoContent = <LoginInfo/>;
            break;
        case "Leads":
            infoContent = <LeadsInfo/>;
            break;
        case "Rooms":
            infoContent = <RoomsInfo/>;
            break;
        case "Room":
            infoContent = <RoomInfo/>;
            break;
        default:
            infoContent = null;
            break;
    }





    return (
        <React.Fragment>
            <p className={classes.Info} onClick={click}>More Info</p>
            <Modal show={show} click={click}>{infoContent}</Modal>
        </React.Fragment>
    )
}

export default info;