import React, { Component, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import {register} from '../../../actions/authaction';
import {clearError} from '../../../actions/erroraction';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, Container, NavLink, Alert } from 'reactstrap';
class Register extends Component {
    state = {
        modal: false,
        username: '',
        password: '',
        email: '',
        err:""
    }
    toggole = () => {
        this.props.clearError();
        this.setState({
            modal: !this.state.modal
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
      
const {username,email,password}=this.state;
        const user={
           username,email,password
        }
        console.log(user)
        this.props.register(user)
        // this.toggole();
    }
    
    onChangeusername = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    onChangeemail = (e) => {
        this.setState({
            email: e.target.value
        })
    } 
    onChangepassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    componentDidUpdate(prevProps){
        const {error}= this.props;
        if(error !== prevProps.error){
            if(error.id == "register_err"){
                this.setState({
                    msg:error.msg.msg
                })
            }
            else{
                this.setState({
                    msg:null
                })
            }
        }

        if(this.state.modal){
            if(this.props.isAutenticate){
                this.toggole();
            }
        }
    }
    componentDidMount(){
    //   window.location.replace("/app/invoice")

    }
    render() {
        return (

            <div>

            </div>

        )
    }
}
const mapstateToprops = (state) => ({
    item: state.item
});

const mapStatetoprops=(state)=>({
    error:state.error,
    // isAutenticate:state.auth.isauthenticated
})
export default connect(mapStatetoprops,{register,clearError}) (Register);