import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {logout} from '../../../actions/authaction';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, Container, NavLink, Alert } from 'reactstrap';
class Logout extends Component {
   
    render() {
        return (

            <Fragment>

                <NavLink color="dark" onClick={this.props.logout} href="/" >logout</NavLink>
               
            </Fragment>
          
        )
    }
}

export default connect(null,{logout}) (Logout);