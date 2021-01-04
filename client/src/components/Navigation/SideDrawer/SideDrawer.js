import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import textContent from '../../../assets/text.json';

import classes from './SideDrawer.module.css';

/*
    This component renders the sidedrawer
    Props:
        pages: list of the pages that can be rendered
        selectedItem: which page is currently rendered
        navClick: function to switch which page is rendered
        show: boolean => whether or not to render the sidedrawer
    author: David Kennedy
*/
const sideDrawer = (props) => {
    // Hide the sideDrawer if it is not suppossed to be shown
    let displayStyle = {}; 
    if(props.show !== null) {
        if(props.show){
            displayStyle = {
              display: 'inline-block'
            }
        }
        else {
            displayStyle = {
                display: 'none'
            }
        }
    }

    let navItems = props.pages.map((navItem, index) => {
        return (
            <NavigationItem 
                key={index}
                active={navItem === props.selectedItem}
                click={() => {
                    props.navClick(navItem);
                }}>
                { textContent.sidedrawer[navItem]} 
            </NavigationItem>
        )
    })
    return (
        <nav 
            className={classes.SideDrawer} style={displayStyle}>
            {navItems}            
        </nav>
    );
};

export default sideDrawer;