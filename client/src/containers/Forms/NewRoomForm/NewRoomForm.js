import React, { Component } from 'react';
import axios from 'axios';
import localForage from 'localforage';
import textContent from '../../../assets/text.json';
import Form from '../../../components/UI/Form/Form';

const getStateOptions = () => {
    const stateOptions = {};
    stateOptions.CA = [
        { value: 'CA-AB', displayValue: 'Alberta' },
        { value: 'CA-BC', displayValue: 'British Columbia' },
        { value: 'CA-MB', displayValue: 'Manitoba' },
        { value: 'CA-NB', displayValue: 'New Brunswick' },
        { value: 'CA-NL', displayValue: 'Newfoundland and Labrador' },
        { value: 'CA-NT', displayValue: 'Northwest Territories' },
        { value: 'CA-NS', displayValue: 'Nova Scotia' },
        { value: 'CA-NU', displayValue: 'Nunavut' },
        { value: 'CA-ON', displayValue: 'Ontario' },
        { value: 'CA-PE', displayValue: 'Prince Edward Island' },
        { value: 'CA-QC', displayValue: 'Quebec' },
        { value: 'CA-SK', displayValue: 'Saskatchewan' },
        { value: 'CA-YT', displayValue: 'Yukon' }
    ];
    stateOptions.AU = [
        { value: 'AU-NSW', displayValue: 'New South Wales' },
        { value: 'AU-QLD', displayValue: 'Queensland' },
        { value: 'AU-SA', displayValue: 'South Australia' },
        { value: 'AU-TAS', displayValue: 'Tasmania' },
        { value: 'AU-VIC', displayValue: 'Victoria' },
        { value: 'AU-WA', displayValue: 'Western Australia' },
        { value: 'AU-ACT', displayValue: 'Australian Capital Territory' },
        { value: 'AU-NT', displayValue: 'Northern Territory' }
    ];
    stateOptions.NZ = [
        { value: 'NZ-AUK', displayValue: 'Auckland' },
        { value: 'NZ-BOP', displayValue: 'Bay of Plenty' },
        { value: 'NZ-CAN', displayValue: 'Canterbury' },
        { value: 'NZ-HKB', displayValue: "Hawke's Bay" },
        { value: 'NZ-MWT', displayValue: 'Manawatu-Wanganui' },
        { value: 'NZ-NTL', displayValue: 'Northland' },
        { value: 'NZ-OTA', displayValue: 'Otago' },
        { value: 'NZ-STL', displayValue: 'Southland' },
        { value: 'NZ-TKI', displayValue: 'Taranaki' },
        { value: 'NZ-WKO', displayValue: 'Waikato' },
        { value: 'NZ-WGN', displayValue: 'Wellington' },
        { value: 'NZ-WTC', displayValue: 'West Coast' },
        { value: 'NZ-GIS', displayValue: 'Gisborne District' },
        { value: 'NZ-MBH', displayValue: 'Marlborough District' },
        { value: 'NZ-NSN', displayValue: 'Nelson City' },
        { value: 'NZ-TAS', displayValue: 'Tasman District' },
        { value: 'NZ-CIT', displayValue: 'Chatham Islands Territory' }
    ];
    stateOptions.US = [
        { value: 'US-AL', displayValue: 'Alabama' },
        { value: 'US-AK', displayValue: 'Alaska' },
        { value: 'US-AZ', displayValue: 'Arizona' },
        { value: 'US-AR', displayValue: 'Arkansas' },
        { value: 'US-CA', displayValue: 'California' },
        { value: 'US-CO', displayValue: 'Colorado' },
        { value: 'US-CT', displayValue: 'Connecticut' },
        { value: 'US-DE', displayValue: 'Delaware' },
        { value: 'US-DC', displayValue: 'District of Columbia' },
        { value: 'US-FL', displayValue: 'Florida' },
        { value: 'US-GA', displayValue: 'Georgia' },
        { value: 'US-GU', displayValue: 'Guam' },
        { value: 'US-HI', displayValue: 'Hawaii' },
        { value: 'US-ID', displayValue: 'Idaho' },
        { value: 'US-IL', displayValue: 'Illinois' },
        { value: 'US-IN', displayValue: 'Indiana' },
        { value: 'US-IA', displayValue: 'Iowa' },
        { value: 'US-KS', displayValue: 'Kansas' },
        { value: 'US-KY', displayValue: 'Kentucky' },
        { value: 'US-LA', displayValue: 'Louisiana' },
        { value: 'US-ME', displayValue: 'Maine' },
        { value: 'US-MD', displayValue: 'Maryland' },
        { value: 'US-MA', displayValue: 'Massachusetts' },
        { value: 'US-MI', displayValue: 'Michigan' },
        { value: 'US-MN', displayValue: 'Minnesota' },
        { value: 'US-MS', displayValue: 'Mississippi' },
        { value: 'US-MO', displayValue: 'Missouri' },
        { value: 'US-MT', displayValue: 'Montana' },
        { value: 'US-NE', displayValue: 'Nebraska' },
        { value: 'US-NV', displayValue: 'Nevada' },
        { value: 'US-NH', displayValue: 'New Hampshire' },
        { value: 'US-NJ', displayValue: 'New Jersey' },
        { value: 'US-NM', displayValue: 'New Mexico' },
        { value: 'US-NY', displayValue: 'New York' },
        { value: 'US-NC', displayValue: 'North Carolina' },
        { value: 'US-ND', displayValue: 'North Dakota' },
        { value: 'US-OH', displayValue: 'Ohio' },
        { value: 'US-OK', displayValue: 'Oklahoma' },
        { value: 'US-OR', displayValue: 'Oregon' },
        { value: 'US-PA', displayValue: 'Pennsylvania' },
        { value: 'US-PR', displayValue: 'Puerto Rico' },
        { value: 'US-RI', displayValue: 'Rhode Island' },
        { value: 'US-SC', displayValue: 'South Carolina' },
        { value: 'US-SD', displayValue: 'South Dakota' },
        { value: 'US-TN', displayValue: 'Tennessee' },
        { value: 'US-TX', displayValue: 'Texas' },
        { value: 'US-VI', displayValue: 'US Virgin Islands' },
        { value: 'US-UT', displayValue: 'Utah' },
        { value: 'US-VT', displayValue: 'Vermont' },
        { value: 'US-VA', displayValue: 'Virginia' },
        { value: 'US-WA', displayValue: 'Washington' },
        { value: 'US-WV', displayValue: 'West Virginia' },
        { value: 'US-WI', displayValue: 'Wisconsin' },
        { value: 'US-WY', displayValue: 'Wyoming' }
    ];
    return stateOptions;
}


/*
    This component encapsulated the form used by the Leads container
    to create new rooms from a lead.
    Props:
        lead (Object): The lead this room is being created for
    author: David Kennedy 
*/

let getFormData = () => {
    return {
        // Forum inputs displayed in the modal
        name: {
            inputType: "input",
            inputConfig: {
                type: "text",
                id: "Room_Name",
                label: textContent.newRoomForm.name
            },
            value: '',
            validation: {
                required: true,
                minlength: 1
            },
            valid: false,
            touched: false
        },
        side: {
            inputType: "dropdown",
            inputConfig: {
                id: "Transaction_Side",
                options: [
                    { value: "buyer", displayValue: "Buyer" },
                    { value: "seller", displayValue: "Seller" }
                ],
                label: textContent.newRoomForm.side
            },
            value: 'buyer',
            validation: {},
            valid: true
        },
        address: {
            inputType: "input",
            inputConfig: {
                id: "Address",
                type: "text",
                label: textContent.newRoomForm.address
            },
            value: '',
            validation: {
                required: true,
                minlength: 3
            },
            valid: false,
            touched: false
        },
        country: {
            inputType: "country",
            inputConfig: {
                id: "Country",
                options: [
                    { value: "US", displayValue: "United States" },
                    { value: "CA", displayValue: "Canada" },
                    { value: "AU", displayValue: "Australia" },
                    { value: "NZ", displayValue: "New Zealand" },
                ],
                label: textContent.newRoomForm.country
            },
            value: '',
            validation: {},
            touched: false,
            valid: false
        },
        state: {
            inputType: "state",
            inputConfig: {
                id: "State",
                options: getStateOptions(),
                label: textContent.newRoomForm.state
            },
            value: '',
            validation: {},
            valid: false,
            touched: false
        },
        city: {
            inputType: "input",
            inputConfig: {
                type: "text",
                id: "City",
                label: textContent.newRoomForm.city
            },
            value: '',
            validation: {
                required: true,
                minLength: 1
            },
            valid: false,
            touched: false
        },
        zipcode: {
            inputType: "input",
            inputConfig: {
                id: "Zipcode",
                type: "text",
                label: textContent.newRoomForm.zipcode
            },
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
                isNumeric: true
            },
            touched: false,
            value: '',
            valid: false
        }
    }
};

class NewRoomForm extends Component {
    state = {
        formValidated: false, //form is not validated by default
        submitted: false,
        formData: getFormData(),
    }

    /*
        Method sent to children to update form element state
    */
    updateState = (updatedFormData, formIsValid) => {
        this.setState({ formData: updatedFormData, formValidated: formIsValid });
    }

    /*
        Form submission Handler obtains data from that state and sends it
        to the back end. Once the RoomID of the created room is received,
        it sets the state of the Layout container to Room and selectedRoom
        to the ID.
    */
    formSubmissionHandler = (event) => {
        // Prevent page refresh
        event.preventDefault();

        //disable submit button
        this.setState({
            submitted: true
        });

        // Build the room data from the state
        let roomData = {};

        // Set contact info as either buyer1 or seller1
        const contact = {};
        contact.email = this.props.lead.email;
        contact.cellPhone = this.props.lead.phoneNumber;
        contact.name = this.props.lead.firstName + ' ' + this.props.lead.lastName;
        roomData.contactInfo = contact;

        // Room info
        roomData.name = this.state.formData.name.value;
        roomData.side = (this.state.formData.side.value === 'buyer') ? 'buy' : 'sell';

        // Location
        roomData.address1 = this.state.formData.address.value;
        roomData.city = this.state.formData.city.value;
        // Country and state info sent here in form "CountryCode-StateCode"
        // Such as "US-WA" for Washington, United States
        roomData.state = this.state.formData.state.value;
        roomData.postalCode = this.state.formData.zipcode.value;

        // We need to return the room ID of the room that was added so that it can be added to the contact
        axios.post('/rooms', roomData, { withCredentials: true })
            .then(async roomResponse => {
                const room = roomResponse.data;
                // Get leads from local storage
                await localForage.getItem('leads').then(async leads => {
                    if (leads) {
                        // Add the new Room to the selected lead and save leads back to local storage
                        leads[this.props.index].room = room;
                        await localForage.setItem('leads', leads);
                        // Render the Room page of the newly created room
                        this.props.renderSelectedRoom(room);
                    }
                });
            })
            .catch(error => {
                console.log("Error creating the room");
                console.log(error);
            });
    }

    render() {
        return (
            <Form
                formSubmissionHandler={this.formSubmissionHandler}
                formValidated={this.state.formValidated}
                formTitle={(this.props.lead !== null) ? "Create a New Transaction" : null}
                subTitle={(this.props.lead !== null) ? "For : " + this.props.lead.firstName + " " + this.props.lead.lastName : null}
                update={this.updateState}
                formData={this.state.formData}
                buttonDisabled={this.state.submitted} />
        )
    }
}

export default NewRoomForm;

