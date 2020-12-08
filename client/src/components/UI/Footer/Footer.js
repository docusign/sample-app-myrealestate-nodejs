import React from 'react';
import textContent from '../../../assets/text.json';

import classes from './Footer.module.css';

const footer = (props) => (
    <div className={classes.Footer}>
        {String.fromCharCode(169)} {textContent.footer.message}
    </div>
);

export default footer;