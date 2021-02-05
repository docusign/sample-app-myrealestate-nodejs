import React, {Component} from 'react';
import axios from 'axios';
import RoomInfoSelector from '../../components/Navigation/RoomInfoSelector/RoomInfoSelector';
import StaticRoomContactInfo from '../../components/RoomStaticContent/StaticRoomContactInfo/StaticRoomContactInfo';
import StaticRoomHome from '../../components/RoomStaticContent/StaticRoomHome/StaticRoomHome';
import StaticRoomPropertyInfo from '../../components/RoomStaticContent/StaticRoomPropertyInfo/StaticRoomPropertyInfo';
import RoomContactInfoForm from '../Forms/RoomContactInfoForm/RoomContactInfoForm';
import RoomHomeForm from '../Forms/RoomHomeForm/RoomHomeForm';
import RoomPropertyInfoForm from '../Forms/RoomPropertyInfoForm/RoomPropertyInfoForm';
import textContent from '../../assets/text.json';
import Spinner from '../../components/UI/Spinner/Spinner';


import classes from './Room.module.css'

class Room extends Component {

    state = {
        selectedPage: 'Home',
        editMode: false,
        pages: ['Home', 'Property Info', 'Contact Info'],
        fieldData: null,
        showInfo: false,
        currentRoomData: this.props.room
    }


    modalToggleHandler = () => {
        this.setState((prevState, props) => ({
           showInfo: !prevState.showInfo
        }))
    }

    navClick = page => {
        this.setState({
            selectedPage: page,
            editMode: false
        });
        
    }

    editClick = (isEditMode) => {
        this.setState({
            editMode: isEditMode,
            tempFieldData: null
        });
    }

    updateFieldData = (newData) => {
        this.setState({
            fieldData: newData,
            editMode: false
        });
    }

    getViewableContent = () => {
        var {currentRoomData, fieldData} = this.state;
        switch(this.state.selectedPage) {
            case 'Home': 
                return <StaticRoomHome {...currentRoomData} {...fieldData} />
            case 'Property Info':
                return <StaticRoomPropertyInfo {...currentRoomData} {...fieldData} />
            case 'Contact Info':
                return <StaticRoomContactInfo {...currentRoomData} {...fieldData}/>
            default :
                return null;
        }
    }

    getEditableContent = () => {
        var statefieldData = this.state.fieldData;   
        const roomId = this.state.currentRoomData.roomId;
        switch(this.state.selectedPage) {
            case 'Home': 
                return <RoomHomeForm fieldData={statefieldData} update={this.updateFieldData} roomId={roomId}/>
            case 'Property Info':
                return <RoomPropertyInfoForm fieldData={statefieldData} update={this.updateFieldData} roomId={roomId}/>
            case 'Contact Info':
                return <RoomContactInfoForm fieldData={statefieldData} update={this.updateFieldData} roomId={roomId}/>
            default:
                return null;
        } 
    }


    render() {
        let editButtons = (this.state.editMode) ?
        (
            <div className={classes.EditButtons}>
                <button className={classes.EditButtonCancel} onClick={this.editClick.bind(this, false)}>Cancel Changes</button>
            </div>
        ) : 
        (
            <div className={classes.EditButtons}>
                <button className={classes.EditButtonPOS} onClick={this.editClick.bind(this, true)}>Edit Transaction</button>
            </div>
        );

        //content to render
        let displayContent = null;

        //are we in edit mode or not?
        if(this.state.editMode) {
            displayContent = this.getEditableContent();
        } else {
            displayContent = this.getViewableContent();
        }
        var {name, roomId, createdDate} = this.state.currentRoomData;

        //load a spinner if the field data has not loaded yet
        let room = this.state.fieldData ? displayContent: <Spinner component="Transaction:"/>;
        return (
            <div className={classes.Room}>
                <div className={classes.RoomContent}>
                    <RoomInfoSelector navClick={this.navClick} modalToggleHandler={this.modalToggleHandler} showInfo={this.state.showInfo}
                        pages={this.state.pages} selectedPage={this.state.selectedPage} editMode={this.state.editMode}/>
                    <div className={classes.RoomTitleBar}>
                        <h1 className={classes.Title}>{textContent.room.transaction} {name}</h1>
                        {editButtons}
                    </div>
                    <div className={classes.SubInfo}>
                        <h3>{textContent.room.id} {roomId}</h3>
                        <h3>{textContent.room.created} {new Date(createdDate).toLocaleDateString("en-US")}</h3>
                    </div>
                    <div className={classes.DispalyContent}>
                        {room}     
                    </div>     
                </div>
            </div>
        )
    }

    componentDidMount = async () => {
        try{
            var fieldData = await axios.get(`/rooms/fieldData/${this.state.currentRoomData.roomId}`, {withCredentials: true});
            this.setState({fieldData: fieldData.data})
        } catch(error) {
            console.log("error getting formData");
        }
    }
}

export default Room;