import React, {Component} from 'react';
import axios from 'axios';
import textContent from '../../../assets/text.json';
import Form from '../../../components/UI/Form/Form';

import classes from './RoomPropertyInfoForm.module.css';



/*
    This component encapsulated the form used by the Leads container
    to create new rooms from a lead.
    Props:
        lead (Object): The lead this room is being created for
    author: David Kennedy 
*/

let getFormData = (props) => {
    return {
        //forum inputs displayed in the moda'
        
        lotSizeSquareFeet: {
            inputType: "input",
            inputConfig: {
                id: "taxAnnualAmount",
                type: "text",
                label: textContent.propertyInfo.lotSizeSquareFeet
            },
            value: (props.fieldData.lotSizeSquareFeet) ? props.fieldData.lotSizeSquareFeet : '',
            validation: {
            },
            valid: true,
            touched: true
        },
        roomsTotal: {
            inputType: "input",
            inputConfig: {
                id: "roomsTotal",
                type: "text",
                label: textContent.propertyInfo.roomsTotal
            },
            value: (props.fieldData.roomsTotal) ? props.fieldData.roomsTotal : '',
            validation: {
                isNumeric: true
            },
            valid: true,
            touched: true
        },
        bedroomsTotal: {
            inputType: "input",
            inputConfig: {
                id: "bedroomsTotal",
                type: "text",
                label: textContent.propertyInfo.bedroomsTotal
            },
            value: (props.fieldData.bedroomsTotal) ? props.fieldData.bedroomsTotal : '',
            validation: {
                isNumeric: true
            },
            valid: true,
            touched: true
        },
        bathroomsTotal: {
            inputType: "input",
            inputConfig: {
                id: "bathroomsTotal",
                type: "text",
                label: textContent.propertyInfo.bathroomsTotal
            },
            value: (props.fieldData.bathroomsTotal) ? props.fieldData.bathroomsTotal : '',
            validation: {
                isNumeric: true
            },
            valid: true,
            touched: true
        },
        garageSpaces: {
            inputType: "input",
            inputConfig: {
                id: "garageSpaces",
                type: "text",
                label: textContent.propertyInfo.garageSpaces
            },
            value: (props.fieldData.garageSpaces) ? props.fieldData.garageSpaces : '',
            validation: {
                isNumeric: true
            },
            valid: true,
            touched: true
        },
        taxAnnualAmount: {
            inputType: "input",
            inputConfig: {
                id: "taxAnnualAmount",
                type: "text",
                label: textContent.propertyInfo.taxAnnualAmount
            },
            value: (props.fieldData.taxAnnualAmount) ? props.fieldData.taxAnnualAmount : '',
            validation: {
                isNumeric: true,
            },
            valid: true,
            touched: true
        },
        lotSizeAcres: {
            inputType: "input",
            inputConfig: {
                id: "lotSizeAcres",
                type: "text",
                label: textContent.propertyInfo.lotSizeAcres
            },
            value: (props.fieldData.lotSizeAcres) ? props.fieldData.lotSizeAcres : '',
            validation: {
            },
            valid: true,
            touched: true
        },
        mlsId: {
            inputType: "input",
            inputConfig: {
                id: "lotSizeAcres",
                type: "text",
                label: textContent.propertyInfo.mlsId
            },
            value: (props.fieldData.mlsId) ? props.fieldData.mlsId : '',
            validation: {
            },
            valid: true,
            touched: true
        }
    }
};

class PropertyInfoForm extends Component {
    state = {
        formValidated: true, //form is not validated by default
        formData: getFormData(this.props),
    }

    /*
        Method sent to children to update form element state
    */
    updateState = (updatedFormData, formIsValid) => {
        this.setState({formData: updatedFormData, formValidated: formIsValid});
    }

    /*
        Form submission Handler obtains data from that state and sends it
        to the backend. Once the RoomID of the created room is received,
        it sets the state of the Layout container to Room and selectedRoom
        to the id.
    */
    formSubmissionHandler = async (event) => {

        //prevent page refresh
        event.preventDefault();

        //build the room data from the state
        let fieldData = {};
        for(const inputField in this.state.formData) {
            //skip empty string values
            if(this.state.formData[inputField].value !== '') {
                //converts strings to ints for required fields
                if(this.state.formData[inputField].validation.isNumeric) {
                    fieldData[inputField] = parseInt(this.state.formData[inputField].value, 10)
                }
                else fieldData[inputField] = this.state.formData[inputField].value;
            }
        }
        try{
            await axios.patch(`/rooms/${this.props.roomId}`, fieldData, {withCredentials: true});
            //update parent state with new info and 
            const updatedFieldData = {...this.props.fieldData };
            for(const key in fieldData) {
                updatedFieldData[key] = fieldData[key]
            }
            this.props.update(updatedFieldData);
            
        }
        catch(error) {
            console.log('Error updating field data');
        }
    }

    render() {
        return (
            <div className={classes.Layout}>
                <Form 
                formSubmissionHandler={this.formSubmissionHandler}
                formValidated={this.state.formValidated}
                update={this.updateState}
                format='twoColumns'
                formData={this.state.formData} />
            </div>
        )
    }
}

export default PropertyInfoForm;

