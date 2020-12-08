import React from 'react';
import axios from 'axios';

import classes from './LeadsButton.module.css'

/*
    This component is used to generate random leads or delete
    leads in an implementation that stores the leads on the backend
*/

const leadsButton = (props) => {
    let clickHandler;
    if(props.action === 'random') clickHandler = generateRandomLeads;
    else if(props.action === 'delete') clickHandler = deleteLeads;
    return (
        <button 
            className={ classes.LeadsButton }
            onClick={ clickHandler }>
            {props.children}
        </button>
    )
}

const generateRandomLeads = () => {
    axios.put('http://localhost:5000/leads/random')
        .then(response => {})
        .catch(error => console.log(error))
}

const deleteLeads = () => {
    axios.delete('http://localhost:5000/leads')
        .then(response => {})
        .catch(error => console.log(error))
}

export default leadsButton;