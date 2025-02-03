import React from 'react';
import classes from './SandboxBanner.module.css';

import textContent from '../../../assets/text.json';

const sandBoxBanner = (props) => (
    <div className={classes.Sandbox}>
        <div className={classes.SandBoxButtonGroup}>
            <a href={textContent.links.createsandbox} target='_blank' rel="noopener noreferrer">{textContent.sandboxbanner.createbutton}</a>
            <a href={textContent.links.devcenter} target='_blank' rel="noopener noreferrer">{textContent.sandboxbanner.learnmore}</a>               
        </div>
    </div>
)

export default sandBoxBanner;