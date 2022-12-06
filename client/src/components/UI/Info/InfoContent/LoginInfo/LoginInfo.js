import React from 'react';
import textContent from '../../../../../assets/text.json';

import classes from '../InfoContent.module.css';

const loginInfo = (props) => (
    <div className={classes.Form}>
        <h1 className={classes.Title}>{textContent.login.info.title}</h1>
        <p>{textContent.login.info.GithubSource1} <a href="https://github.com/docusign/sample-app-myrealestate-nodejs/blob/main/controllers/authController.js" target="_blank" rel="noopener noreferrer">{textContent.login.info.GithubSource2}</a> {textContent.login.info.GithubSource3}</p>
        <p>{textContent.login.info.paragraph1}</p>
        <ul>
            <li>{textContent.login.info.listItem1}</li>
            <li>{textContent.login.info.listItem2}</li>
            <li>{textContent.login.info.listItem3Part1} <a href='https://developers.docusign.com/docs/rooms-api/reference/Offices' target='_blank' rel="noopener noreferrer"> {textContent.login.info.listItem3Part2}</a></li>
        </ul>

        <div className={classes.CodeFlow}>
            <h2><strong>{textContent.login.info.codeflow}</strong></h2>
            <h3>{textContent.login.info.step1}</h3>
            <p><a href="https://developers.docusign.com/rooms-api/guides/auth" target="_blank" rel="noopener noreferrer">{textContent.login.info.step1info1}</a> {textContent.login.info.step1info2}</p>
            <h3>{textContent.login.info.step2}</h3>
            <p>{textContent.login.info.step2info1} <a href="https://developers.docusign.com/docs/rooms-api/reference/Users/Users/GetUsers" target="_blank" rel="noopener noreferrer">{textContent.login.info.step2info2}</a></p>
            <h3>{textContent.login.info.step3}</h3>
            <p>{textContent.login.info.step3info1} <a href='https://developers.docusign.com/docs/rooms-api/reference/Offices/Offices/CreateOffice' target='_blank' rel="noopener noreferrer">{textContent.login.info.step3info2}</a> {textContent.login.info.step3info3} <a href='https://developers.docusign.com/docs/rooms-api/reference/Users/Users/AddUserToOffice' target='_blank' rel="noopener noreferrer">{textContent.login.info.step3info4}</a>{textContent.login.info.step3info5}</p>
        </div>
    </div>
);

export default loginInfo;