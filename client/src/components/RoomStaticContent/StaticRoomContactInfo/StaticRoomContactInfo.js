import React from 'react';
import textContent from '../../../assets/text.json';

import classes from './StaticRoomContactInfo.module.css';

const StaticContact = ({name, email, cellPhone, position}) => {
    return (
        <div className={classes.ContactBox}>
            <h3>{position}:</h3>
            <div className={classes.Contact}>
                <div className={classes.Group}><p>{textContent.roomContactInfo.name} {name}</p></div>
                <div className={classes.Group}><p>{textContent.roomContactInfo.email} {email}</p></div>
                <div className={classes.Group}><p>{textContent.roomContactInfo.phone} {cellPhone}</p></div>
            </div>
        </div>
    )
}

const staticRoomContactInfo = ({seller1, seller2, buyer1, buyer2, listingAgent1, buyerAgent1}) => {
    return (
        <div className={classes.Info}>
            <StaticContact {...seller1} position='Seller 1'/>
            <StaticContact {...seller2} position='Seller 2'/>
            <StaticContact {...buyer1} position='Buyer 1'/>
            <StaticContact {...buyer2} position='Buyer 2'/>
            <StaticContact {...buyerAgent1} position='Buyer Agent'/>
            <StaticContact {...listingAgent1} position='Listing Agent'/>
        </div>
    )
}

export default staticRoomContactInfo;