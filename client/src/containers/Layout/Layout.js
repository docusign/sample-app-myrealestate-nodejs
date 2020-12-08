import React, { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Leads from '../Leads/Leads';
import Login from '../Login/Login';
import Rooms from '../Rooms/Rooms';
import Room from '../Room/Room';

import classes from './Layout.module.css';


/*
    This component is responsible for rendering the dynamic content of
    the web app. 
    author: David Kennedy
*/
class Layout extends Component {
    state = {
        page: 'Login', //which page is being loaded. Defaults to the login page
        selectedRoom: null, //selected room Info
        role: 'agent',  //app auth
        showSideDrawer: null,  //mobile responsive display of sidebar
        pages: ['Leads', 'Rooms'], //list of available pages for sidebar
      }


    /*
      Changes whether or not the sidedrawer is shown
    */
    sideDrawerToggleHandler = () => {
        if(this.state.showSideDrawer === null) {
            this.setState( ( prevState ) => {
                return { showSideDrawer: true};
            } );
        } else {
            this.setState( ( prevState ) => {
                return { showSideDrawer: !prevState.showSideDrawer };
            });
        }
    }
    
    /*
        Changes which page is selected
        Params:
            page: (String) the selected page
                See state.pages for options
    */
    pageChangeHandler = (page) => {
        this.setState({ page: page });
    }

        /*
        Changes which page is selected and which room is selected
        Params:
            page: (String) the selected page
                See state.pages for options
            selectedRoom: (Object) 
            {
                roomId: (integer)
                name: (string)
                createdDate: (string)
            }
    */
    pageAndRoomChangeHandler = (selectedRoom) => {
        this.setState({ 
            page: 'Room',
            selectedRoom: selectedRoom 
        });
    }
    
    /*
        Changes which role the user is logged in as
        Params:
            role: (String) the selected role -> either 'broker' or 'agent'
    */
    roleChangeHandler = (role) => {
        this.setState({ role: role });
    }

    render() {
        let sideDrawer = null;
        let currentPage = null;
        //Determine which page to render 
        if(this.state.page === 'Login') {
            currentPage = <Login click={this.pageChangeHandler.bind(this, 'Leads')} roleChange={this.roleChangeHandler} />;
        }
        else if(this.state.page === 'Leads') {
            currentPage = <Leads renderSelectedRoom={this.pageAndRoomChangeHandler} />
        }
        else if(this.state.page === 'Rooms') {
            currentPage = <Rooms click={this.pageAndRoomChangeHandler}/>
        }
        else if(this.state.page === 'Room') {
            currentPage = <Room room={this.state.selectedRoom} />
        }

        //do not render the sidedrawer on the login screen
        //also the toolbar is black on non Login pages
        
        //get the styling for the page, default styling if login page
        let className = (this.state.page !== 'Login') ? classes.DynamicContent : null;
        let toolbarColor = 'white'
        if (this.state.page !== 'Login') {
            sideDrawer = (
                <Sidedrawer 
                    pages={this.state.pages}
                    selectedItem={this.state.page}
                    navClick={this.pageChangeHandler} 
                    show={this.state.showSideDrawer}/>
            );
            toolbarColor = 'black';
        }
        return (
            <div style={{width: "100%"}}>
                <Toolbar color={toolbarColor} homeClick={this.pageChangeHandler.bind(this, 'Login')} showTogle={this.state.page !== 'Login'} sideDrawerToggle={this.sideDrawerToggleHandler} />
                {sideDrawer}
                <div className={className}>
                    {currentPage}
                </div>
            </div>
        )
    }
}

export default Layout;