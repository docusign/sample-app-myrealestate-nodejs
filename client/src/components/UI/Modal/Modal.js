import React from 'react';
import closeIcon from '../../../assets/images/Close.svg';

import classes from './Modal.module.css'

/*
    Pop up modal component
    props:
        props.children is rendered in the modal
        props.click = function (controls whether or not the modal is displayed)
        props.type = (String) the type of modal
        props.show = boolean (whether or not to display the modal)
    author: David Kennedy
*/
const modal = (props) => {

    //get class styles
    const modalClasses = [classes.Modal];
    if(props.show) modalClasses.push(classes.Display);
    else modalClasses.push(classes.Hidden);
    if(props.type === 'Form') modalClasses.push(classes.Form);
    
    return (
    <div className={modalClasses.join(' ')}>
        <img id={classes.CloseIcon} src={closeIcon} onClick={props.click} alt="Close Button"/>
        {props.children}
    </div>
)};

export default modal;