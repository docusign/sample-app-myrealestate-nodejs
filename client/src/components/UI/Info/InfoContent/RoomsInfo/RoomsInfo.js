import React from 'react';
import textContent from '../../../../../assets/text.json';

import classes from '../InfoContent.module.css';

const roomsInfo = (props) => {
    const info = textContent.rooms.info;
    return (
        <div className={classes.Form}>
            <h1 className={classes.Title}>{info.title}</h1>
            <p>{info.paragraph1}</p>
            <ul>
    <li>{info.listItem1part1} <a href='https://developers.docusign.com/docs/rooms-api/reference/Rooms/' target='_blank' rel="noopener noreferrer">{info.listItem1part2}</a> {info.listItem1part3} 
        <a href="https://developers.docusign.com/docs/rooms-api/reference/Offices/" target="_blank" rel="noopener noreferrer">{info.listItem1part4}</a>{info.listItem1part5}</li>
                <li>{info.listItem2}</li>
            </ul>

            <div className={classes.CodeFlow}>
                <h2><strong>{info.codeflow}</strong></h2>
                <h3>{info.step1}</h3>
                <p>{info.step1info1} <a href="https://developers.docusign.com/docs/rooms-api/reference/Rooms/Rooms/GetRooms/" target="_blank" rel="noopener noreferrer">
                    {info.step1info2}</a> {info.step1info3}</p>
                <h3>{info.step2}</h3>
                <p>{info.step2info1} <a href="https://developers.docusign.com/docs/rooms-api/reference/Rooms/Rooms/GetRoom/" target="_blank" rel="noopener noreferrer">
                    {info.step2info2}</a> {info.step2info3} <a href="https://developers.docusign.com/docs/rooms-api/reference/Rooms/Rooms/GetRoomFieldData/" target="_blank" rel="noopener noreferrer">
                    {info.step2info4}</a> {info.step2info5}</p>

            </div>
        </div>
    );
}

export default roomsInfo;