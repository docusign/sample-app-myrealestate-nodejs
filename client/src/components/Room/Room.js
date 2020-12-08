import React from 'react';
import textContent from '../../assets/text.json';
import HouseImage from '../../assets/images/house1.jpg';


import classes from './Room.module.css';
/*
    This component encapsulates a basic tile that displays
        basic room info used by the Rooms container
    props:
        room (object): 
            fieldDataLastUpdatedDate: (String) last time the room was updated
            name: (String) the name of the room 
    author: David Kennedy
*/
const room = (props) => {
    let date = new Date(props.room.fieldDataLastUpdatedDate).toLocaleDateString("en-US");
    return (
        <div className={classes.Room} onClick={props.click}>
            <img className={classes.RoomImageBox} alt={props.room.name} src={HouseImage}></img>
            <p className={classes.Name}>{props.room.name}</p>
            <p className={classes.Date}> {textContent.rooms.date} {date}</p>
    </div>
    )
}
export default room;