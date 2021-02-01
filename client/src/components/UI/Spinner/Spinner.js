import React from 'react';

import classes from './Spinner.module.css';

/*
    Custom spinner component 
    props:
        component: (String) the name of the component being loaded. String appears above the Spinner
*/
const spinner = ( props ) => {
    return (
        <div className={classes.container}>
            <h3>Loading {props.component}</h3>
            <div className={classes.spinner}></div>
        </div>
    )
}
export default spinner;