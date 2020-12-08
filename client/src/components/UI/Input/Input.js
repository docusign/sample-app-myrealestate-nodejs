import React from 'react';

import classes from './Input.module.css';

/*
    Custom input React Component: input, dropdown, country, or region
    Props:
        props.config.id: (String) the components id. Also used by the label.
            for multi-word labels use the form word1_word2_word3 
        inputType: String (the type of input) see switch case options below for 
            accepted values
        changed: (function) onChange handler that modifies the state of the 
            value, valid, and touched values for this component in the 
            parent container.
        options: [String], required if case is dropdown
        config: any other props specific to input type
        touched: (boolean) whether or not this input element has been focused yet 
        dropdownStyle: (String) either full (100% width) or half (50%) width
    Author: David Kennedy
*/
const input = (props) => {
    let inputObject = null;
    let inputClasses = [];
    let dropDownOptions = [];

    //determine the input type and build the input element
    switch(props.inputtype) {
        case('input') : 
            inputClasses.push('Text');
            inputObject = <input
                className={inputClasses.join(' ')} 
                onChange={props.changed} 
                value={props.value}
                type="text"
                valid={props.valid}
                {...props.config} 
                />
            break;
        case('checkbox') : 
            inputClasses.push('checkbox');
            inputObject = <input 
                type="checkbox"
                className={inputClasses.join(' ')} 
                {...props.config}
                onChange={props.changed}
                value={props.value}
                valid={props.valid}
                />
            break;
        case('dropdown') :
            inputClasses.push('Dropdown');
            dropDownOptions = props.config.options.map((option, index) => (
                <option key={option.value} value={option.value}>{option.displayValue}</option>
            ));
            inputObject = <select 
                className={inputClasses.join(' ')} 
                {...props.config}
                onChange={props.changed}
                value={props.value}
                valid={props.valid}
                >
                {dropDownOptions}
            </select>
            break;
        //defaults to US
        case('country') : 
            inputClasses.push('Dropdown');
            dropDownOptions = props.config.options.map((option, index) => (
                <option key={option.value} value={option.value}>{option.displayValue}</option>
            ));
            //add the default selection message
            dropDownOptions.push(<option key={'Unchanged'} value='Select a country' disabled>Select a country</option>)
            inputObject = <select 
                className={inputClasses.join(' ')} 
                {...props.config}
                onChange={props.changed}
                value={(props.value) ? props.value: 'Select a country'}
                valid={props.valid}
                >
                {dropDownOptions}
            </select>
            break;
        case('state') : 
            inputClasses.push('Dropdown');
            const options = (props.selectedCountry !== '') ? props.config.options[props.selectedCountry] : [];
            dropDownOptions = options.map((option, index) => (
                <option key={option.value} value={option.value}>{option.displayValue}</option>
            ));
            //add default selection message
            dropDownOptions.push(<option key={'Default'} value={'Select a state'} disabled={true}>Select a state</option>);
            inputObject = <select 
                className={inputClasses.join(' ')} 
                {...props.config}
                onChange={props.changed}
                value={(props.value) ? props.value: 'Select a state'}
                valid={props.valid}
                >
                {dropDownOptions}
            </select>
            break;
        default :
            inputObject = null;
            break;    
    }

    const errorMessage = (
        <p className={classes.Error}>
            {"Please enter a valid " + props.config.id.replace('_', ' ')}
        </p>
    );
    //check if dropdowns should be half size
    let className = ((props.inputtype === 'state' || props.inputtype === 'country' || props.inputtype ==='dropdown') && props.dropdownStyle === 'half') ? classes.HalfInput : classes.Input;
    return (
        <div className={className}>
            <label className={classes.Label} htmlFor={props.config.id}>
                {props.config.label}
            </label>
            {inputObject}
            {(!props.valid && props.touched) ? errorMessage : null}   
        </div>
    )
};


export default input;