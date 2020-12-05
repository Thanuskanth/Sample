import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import {login} from '../action/authaction';
// import {clearError} from '../action/erroraction';
import { userActions } from '../_actions';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, Container, NavLink, Alert } from 'reactstrap';
class Register extends Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = { 
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
        
    }


    toggole = () => {
        // this.props.clearError();
        this.setState({
            modal: !this.state.modal
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
    onSubmit = (e) => {
        e.preventDefault();
      
const {email,password}=this.state;
        const user={
           email,password
        }
     
        // this.props.login(user)
        // this.toggole();
    }
    
    
    onChange = (e) => {
        this.setState({
           [ e.target.name]: e.target.value
        })
    }
    componentDidUpdate(prevProps){
        const {error}= this.props;
        if(error !== prevProps.error){
            if(error.id == "login_error"){
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
    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
      
        return (

            <div>

                <NavLink color="dark" onClick={this.toggole} href="#" >Login</NavLink>
                <Modal isOpen={this.state.modal}  >
                    <ModalHeader  toggle={this.toggole}>Login</ModalHeader>
        {this.state.msg ? (<Alert color="danger">{this.state.msg}</Alert>) : null}
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                           
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="text" id="email" value={username} placeholder="Enter Email " onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="text" id="password"  value={password}  placeholder="Enter Password "onChange={this.handleChange} />
                            </FormGroup>
                            <Button>Submit</Button>

                        </Form>
                    </ModalBody>

                </Modal>
            </div>

        )
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

// const mapStatetoprops=(state)=>({
//     // error:state.error,
//     // isAutenticate:state.auth.isauthenticated
// })
export default connect(mapState, actionCreators) (Register);