import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import Room from '../../components/Room/Room';
import Info from '../../components/UI/Info/Info';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import textContent from '../../assets/text.json';

import classes from './Rooms.module.css';

/*
    Room container that displays the user's rooms
    Author: David Kennedy
*/
class Rooms extends Component {
    state = {
        rooms: [], //rooms array
        displayInfo: false, //whether or not to display the info form
        open: true,  //display open rooms if true, closed if false
        loaded: false,  //true when didMount completes
        selectedRoom: null  //was a room selected?
    };

    infoToggleHandler = () => {
        this.setState((prevState, props) => ({
            displayInfo: !prevState.displayInfo
        }))
    };

    //Click Handler of Open and Closed Transaction buttons
    transactionButtonClickHandler = (value) => {
        this.setState({ open: value });
    }

    render() {
        let rooms = null;
        if (!this.state.loaded) {
            rooms = (
                <div className={classes.Rooms}>
                    <Spinner component="Rooms" />
                </div>
            )
        } else if (this.state.rooms) {
            rooms = this.state.rooms.map((room, index) => {
                return (
                    <Room room={this.state.rooms[index]} key={index} click={this.props.click.bind(this, this.state.rooms[index])} />
                )
            });
        }
        return (
            <Fragment>
                <Backdrop show={this.state.displayInfo} click={this.infoToggleHandler} />
                <div className={classes.Rooms}>
                    <div className={classes.TitleBar}>
                        <h1 id={classes.Title} className={classes.TitleHeader}>{textContent.rooms.title}</h1>
                        <Info show={this.state.displayInfo} click={this.infoToggleHandler} page="Rooms"></Info>
                    </div>
                    <div className={classes.RoomsFormatter}>
                        {rooms}
                    </div>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        console.log('apiUrl', apiUrl)
        axios.get(`${apiUrl}/rooms`, { withCredentials: true })
            .then(rooms => {
                this.setState({
                    rooms: rooms.data.rooms,
                    loaded: true
                });
            })
            .catch(error => {
                console.log("Error loading rooms: " + error.response.statusText);
            });
    }
}

export default Rooms;