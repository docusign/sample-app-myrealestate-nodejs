import React from 'react';

import classes from './Button.module.css';

const button = (props) => {
    return (
        <button onClick={props.clickHandler} className={classes.Button} disabled={props.disabled}>{props.children}</button>
    )
}

export default button;