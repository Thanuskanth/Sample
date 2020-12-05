import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addRole } from '../../actions/roleaction';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addUser } from '../../actions/useractions';
import { getRole } from '../../actions/roleaction';
import Swal from 'sweetalert2'

class CreateUser extends Component {
    state = {
        modalShow: false,
        role: "",
        username: "",
        email: "",
        password: "",

    }

    onChangename = (e) => {
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
    onChangerole = (e) => {
        
        this.setState({
            role:this.refs.role.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
const {username,email,password,role}=this.state;
const user={
    
    username:username,
    email:email,
    password:password,
    role:role
}
        this.props.addUser(user);
        this.ontoggle()
    }

    ontoggle = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
    }
  componentDidMount(){
      this.props.getRole()
  }


    render() {
        const { modalShow } = this.state;




        const { role } = this.props;
        return (

            <div  >
                <Button variant="primary" className="addRole" onClick={this.ontoggle}>
                    Add user
                 </Button>

                <Modal
                    show={modalShow}
                    size="auto"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton onClick={this.ontoggle} >
                        <Modal.Title className="modeltitle" id="contained-modal-title-vcenter">
                            <h2>  Create User</h2>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username </Form.Label>
                                <Form.Control type="text" onChange={this.onChangename} placeholder="Enter name" />

                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" onChange={this.onChangeemail} placeholder="Enter email" />

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={this.onChangepassword} placeholder=" Enter Password" />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Select Role</Form.Label>
                                <Form.Control as="select" ref="role" custom onChange={this.onChangerole}>
                                    {role.map((role) => (
                                        <option value={role._id}>{role.role}</option>
                                    )
                                    )
                                    }

                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" className="mt-3" type="submit">
                                Submit
                    </Button>
                        </Form>
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    role: state.role.role
})
export default connect(mapStateToProps, { addUser,getRole })(CreateUser);