import React, {Component} from 'react';
import Form from '../../../components/UI/Form/Form';
import textContent from '../../../assets/text.json';

/*
    This component encapsulated the form used by the Leads container
    to create a new lead.
    Props:
        lead (Object): The lead this room is being created for
    author: David Kennedy 
*/
let getFormData = () => {
    return {
        //forum inputs displayed in the modal
        firstName: {
            inputType: "input",
            inputConfig: {
                type: "text",
                id: "First_Name",
                label: textContent.newContactForm.first
            },
            value: '',
            validation: {
                required: true,
                minLength: 1
            },
            valid: false,
            touched: false
        },
        lastName: {
            inputType: "input",
            inputConfig: {
                type: "text",
                id: "Last_Name",
                label: textContent.newContactForm.last
            },
            value: '',
            validation: {
                required: true,
                minLength: 1
            },
            valid: false,
            touched: false
        },
        email: {
            inputType: "input",
            inputConfig: {
                type: "text",
                id: "email",
                label: textContent.newContactForm.email
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        phoneNumber: {
            inputType: "input",
            inputConfig: {
                type: "text",
                id: "phone_number",
                label: textContent.newContactForm.phone
            },
            value: '',
            validation: {
                required: true,
                isPhone: true
            },
            valid: false,
            touched: false
        }
    }
};

class NewContactForm extends Component {
    state = {
        formValidated: false, //form is not validated by default
        formData: getFormData(),
    }

    /*
        Method sent to children to update form element state
    */
    updateState = (updatedFormData, formIsValid) => {
        this.setState({formData: updatedFormData, formValidated: formIsValid});
    }

    /*
        Form submission Handler obtains data from that state and sends it
        to the back end. Once the RoomID of the created room is received,
        it sets the state of the Layout container to Room and selectedRoom
        to the ID.
    */
    formSubmissionHandler = (event) => {
        event.preventDefault();
        let newLead = {};
        newLead.firstName = this.state.formData.firstName.value;
        newLead.lastName = this.state.formData.lastName.value;
        newLead.email = this.state.formData.email.value;
        newLead.phoneNumber = this.state.formData.phoneNumber.value;
        this.setState({formData: getFormData()});
        this.props.sub(newLead);
    }

    render() {
        return (
            <Form 
                formSubmissionHandler={this.formSubmissionHandler}
                formValidated={this.state.formValidated}
                formTitle='Create a Lead:'
                update={this.updateState}
                formData={this.state.formData} />
        )
    }
}

export default NewContactForm;