import React from 'react';

import classes from './Backdrop.module.css';

/*
    Backdrop component used in tangent with modal components
    Props:
        show = boolean (whether or not backdrop is displayed)
        click = function (on click handler changing the state of the 
            parent component changing the state, resulting in the
            backdrop and modal components not being displayed)
    author: David Kennedy
*/
const backdrop = (props) => (
    props.show ? <div 
                    className={classes.Backdrop}
                    onClick={props.click}>
                 </div> : null
);

export default backdrop;