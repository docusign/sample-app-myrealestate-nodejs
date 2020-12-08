import React from 'react';
import Info from '../UI/Info/Info';
import textInfo from '../../assets/text.json';

import classes from './Lead.module.css';

/*
    Lead component used to display contact information
    props:
        firstName: (String) 
        lastName: (String)
        phoneNumber: (String)
        email: (String)
        click: (Function) Click handler for the create transaction button
        showInfo: (Boolean) Whether or not the info modal should be shown
        infoTogle: (Function) Click hanlder that controls the state of the
            parent element, controlling whether or not to show the 
            Info modal 
        renderLastCreatedRoom: (Function) Click handler that renders the last
            created Room for this Lead
       room: (Object) the last room created by this user
            {
                roomId: (Integer),
                createdDate: (Sring),
                name: (String)
            }
*/


const lead = ({room, firstName, lastName, phoneNumber, email, click, showInfo, infoToggle, renderLastCreatedRoom}) => {
    //if the lead has not been used to create a transaction yet, add a unclickable curson to the View Room Button
    const buttonStyle = (room) ? null : {cursor:  'not-allowed', color: 'lightgrey'};

    return (
        <div className={classes.Lead}>
            <div className={classes.LeadBoxLeft}>
                <h1 id={classes.Name}>{firstName} {lastName}</h1>
                <div className={classes.ContactInfo}>
                    <div className={classes.Contact}>
                        <p className={classes.ContactTitle}>{textInfo.lead.phone}</p>
                        <p className={classes.ContactInfo}>{phoneNumber}</p>
                    </div>
                    <div className={classes.Contact}>
                        <p className={classes.ContactTitle}> {textInfo.lead.email} </p>
                        <p className={classes.ContactInfo}>{email}</p>
                    </div>
                </div>
            </div>
            <div className={classes.LeadBoxRight}>
                <div className={classes.MoreInfo}>
                    <Info show={showInfo} click={infoToggle} page="Leads"></Info>
                </div>
                <div className={classes.ButtonGroup}>
                    <button onClick={click} className={classes.CreateButton}>{textInfo.lead.create}</button>
                    <button className={classes.ViewButton} disabled={!room} style={buttonStyle} onClick={renderLastCreatedRoom}>{textInfo.lead.view}</button>
                </div>
            </div>
        </div>
    )
}

export default lead;