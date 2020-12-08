import React from 'react';
import Info from '../../UI/Info/Info';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './RoomInfoSelector.module.css';

const roomInfoSelector = ({pages, navClick, selectedPage, showInfo, modalToggleHandler}) => {

    const pageButtons = pages.map((page, index) => {
        var style = classes.NavButton;
        if(page === selectedPage) {
            style = style.concat(` ${classes.Selected}`);
        }
        return <button key={index} className={style} onClick={navClick.bind(this, page)}>{page}</button>
    })

    const pageButtonGroup = (
        <div className={classes.PageButtonGroup}>
            {pageButtons}
        </div>
    )
    return (
        <div className={classes.RoomInfoSelector}>
            <Backdrop show={showInfo} click={modalToggleHandler}/>
            {pageButtonGroup}
            <Info show={showInfo} click={modalToggleHandler} page="Room"></Info>
        </div>
    )
}

export default roomInfoSelector;