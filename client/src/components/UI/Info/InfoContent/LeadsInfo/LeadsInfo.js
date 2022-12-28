import React from 'react';
import textContent from '../../../../../assets/text.json';

import classes from '../InfoContent.module.css';

const leadsInfo = (props) => {
    const info = textContent.leads.info;
    return (
        <div className={classes.Form}>
            <h1 className={classes.Title}>{info.title}</h1>
            <p>{info.GithubSource1} <a href="https://github.com/docusign/sample-app-myrealestate-nodejs/blob/main/controllers/roomsController.js#L50" target="_blank" rel="noopener noreferrer">{info.GithubSource2}</a> {info.GithubSource3}</p>
            <p>{info.paragraph1}</p>
            <ul>
                <li>{info.listItem1part1} <a href='https://developers.docusign.com/docs/rooms-api/rooms101/' target='_blank' rel="noopener noreferrer">{info.listItem1part2}</a></li>
                <li>{info.listItem2}</li>
            </ul>

            <div className={classes.CodeFlow}>
                <h2><strong>{info.codeflow}</strong></h2>
                <h3>{info.step1}</h3>
                <p>{info.step1info}</p>
                <h3>{info.step2}</h3>
                <p>{info.step2info1} <a href="https://developers.docusign.com/docs/rooms-api/reference/Rooms/Rooms/CreateRoom" target="_blank" rel="noopener noreferrer">{info.step2info2}</a> {info.step2info3}</p>
            </div>
        </div>
    );
}

export default leadsInfo;