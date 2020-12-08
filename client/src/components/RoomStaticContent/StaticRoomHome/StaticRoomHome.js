import React from 'react';
import textContent from '../../../assets/text.json';

import classes from './StaticRoomHome.module.css';

const countries = {
    "US": "United States",
    "CA": "Canada",
    "AU": "Australia",
    "NZ": "New Zealand"
}

const states = {
    "US": {
        "AL": "Alabama",
        "AK": "Alaska",
        "AS": "American Samoa",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "DC": "District Of Columbia",
        "FM": "Federated States Of Micronesia",
        "FL": "Florida",
        "GA": "Georgia",
        "GU": "Guam",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MH": "Marshall Islands",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "MP": "Northern Mariana Islands",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PW": "Palau",
        "PA": "Pennsylvania",
        "PR": "Puerto Rico",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VI": "Virgin Islands",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    },
    "CA": {
        'AB': 'Alberta',
        'BC': 'British Columbia',
        'MB': 'Manitoba',
        'NB': 'New Brunswick',
        'NL': 'Newfoundland and Labrador',
        'NT': 'Northwest Territories',
        'NS': 'Nova Scotia',
        'NU': 'Nunavut',
        'ON': 'Ontario',
        'PE': 'Prince Edward Island',
        'QC': 'Quebec',
        'SK': 'Saskatchewan',
        'YT': 'Yukon'
    },
    "AU": {
        'NSW': 'New South Wales',
        'QLD': 'Queensland',
        'SA': 'South Australia',
        'TAS': 'Tasmania',
        'VIC': 'Victoria',
        'WA': 'Western Australia',
        'ACT': 'Australian Capital Territory',
        'NT': 'Northern Territory'
    },
    "NZ": {
        'AUK': 'Auckland',
        'BOP': 'Bay of Plenty',
        'CAN': 'Canterbury',
        'HKB': "Hawke's Bay",
        'MWT': 'Manawatu-Wanganui',
        'NTL': 'Northland',
        'OTA': 'Otago',
        'STL': 'Southland',
        'TKI': 'Taranaki',
        'WKO': 'Waikato',
        'WGN': 'Wellington',
        'WTC': 'West Coast',
        'GIS': 'Gisborne District',
        'MBH': 'Marlborough District',
        'NSN': 'Nelson City',
        'TAS': 'Tasman District',
        'CIT': 'Chatham Islands Territory'
    }
  
}

const staticRoomHome = ({address1, address2, state, city, 
    postalCode, currentListingAmount, underContract}) => {
    return (
        <div className={classes.Info}>
            <div className={classes.Column}><p>{textContent.staticRoomHome.address}</p><p>{address1}</p></div>
            <div className={classes.Column}><p>{textContent.staticRoomHome.country}</p><p>{(state) ? countries[state.substring(0, 2)] : ''}</p></div>    
            <div className={classes.Column}><p>{textContent.staticRoomHome.addressCntd}</p><p>{address2}</p></div>
            <div className={classes.Column}><p>{textContent.staticRoomHome.state}</p><p>{(state) ? states[state.substring(0, 2)][state.substring(3,state.length)] : ''}</p></div>
            <div className={classes.Column}><p>{textContent.staticRoomHome.price}</p><p>${currentListingAmount}</p></div>  
            <div className={classes.Column}><p>{textContent.staticRoomHome.city}</p><p>{city}</p></div>      
            <div className={classes.Column}><p>{textContent.staticRoomHome.contract}</p><p>{underContract ? 'Yes' : 'No'}</p></div>         
            <div className={classes.Column}><p>{textContent.staticRoomHome.postalCode}</p><p>{postalCode}</p></div>
        </div>
    )
}

export default staticRoomHome;