import React from 'react';
import textContent from '../../../assets/text.json';

import classes from './StaticRoomPropertyInfo.module.css';

const staticRoomPropertyInfo = ({taxAnnualAmount, bedroomsTotal, garageSpaces, lotSizeAcres, 
    lotSizeSquareFeet, bathroomsTotal, roomsTotal, mlsId}) => {
    return (
        <div className={classes.Info}>
            <div className={classes.Column}><p>{textContent.propertyInfo.lotSizeSquareFeet}</p><p>{lotSizeSquareFeet}</p></div>
            <div className={classes.Column}><p>{textContent.propertyInfo.garageSpaces}</p><p>{garageSpaces}</p></div>
            <div className={classes.Column}><p>{textContent.propertyInfo.roomsTotal}</p><p>{roomsTotal}</p></div>
            <div className={classes.Column}><p>{textContent.propertyInfo.taxAnnualAmount}</p><p>{taxAnnualAmount ? `$${taxAnnualAmount}` : null }</p></div>
            <div className={classes.Column}><p>{textContent.propertyInfo.bedroomsTotal}</p><p>{bedroomsTotal}</p></div>
            <div className={classes.Column}><p>{textContent.propertyInfo.lotSizeAcres}</p><p>{lotSizeAcres}</p></div>        
            <div className={classes.Column}><p>{textContent.propertyInfo.bathroomsTotal}</p><p>{bathroomsTotal}</p></div>
            <div className={classes.Column}><p>{textContent.propertyInfo.mlsId}</p><p>{mlsId}</p></div>

        </div>
    )
}

export default staticRoomPropertyInfo;