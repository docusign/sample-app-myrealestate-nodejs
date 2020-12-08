import React from 'react';
import LeadsIcon from '../../../assets/images/LeadsIcon.svg';
import TransactionsIcon from '../../../assets/images/TransactionIcon.svg';


import classes from './NavigationItem.module.css';

/*
    This component renders a navigation item used by the side drawer component
    props:
        active: boolean => whether or not this navItem is currently selected
        click: click handler
    author: David Kennedy
*/
const navigationItem = (props) => {
    let icon = null;
    switch(props.children) {
        case 'Leads': 
            icon = <img className={ classes.Icon } src={LeadsIcon} alt='Leads Icon'></img>;
            break;
        case 'Transactions':
            icon = <img className={ classes.Icon } src={TransactionsIcon} alt='Transactions Icon'></img>;
            break;
        default: 
            icon = null;
    }

    //get the styling
    let classNames = [];
    classNames.push(classes.NavigationItem);
    if(props.active) classNames.push(classes.Active);
    return (
    <li>
        <div className={classNames.join(' ')} onClick={props.click}>
            {icon}
            <p>{props.children}</p>  
        </div>  
    </li>
)};

export default navigationItem;