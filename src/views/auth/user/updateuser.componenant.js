import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addRole } from '../../actions/roleaction';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getRole } from '../../actions/roleaction';
import { deleteUser } from '../../actions/useractions';
import { header ,updateuser} from '../../actions/authaction';
import { Pencil, X } from 'react-bootstrap-icons';
import axios from 'axios';
import Swal from 'sweetalert2';
import store from '../../store';

class CreateUser extends Component {
    state = {
        modalShow: false,
        role: [],
        username: "",
        email: "",
        password: "",

    }
    onDelete=(id)=>{
  
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.props.deleteUser(id);
          }
        })
            
  
         
       
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
        this.props.updateuser(this.props.id,user);
        this.ontoggle()
    }

    ontoggle = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
       this.componentDidMount();
    }
    componentDidMount() {
       
        axios.get('http://localhost:5000/user/' + this.props.id,header(store.getState().auth.token)).then(res => {
            console.log(res.data,"response")
            this.setState({
                username: res.data.user.username,
                email: res.data.user.email,
                password: res.data.user.password,
                role: res.data.user.role,
            })
        }
       

        )
        console.log(this.state)
    }

    render() {
        const { modalShow } = this.state;




        const { role } = this.props;
        return (

            <div  >
                <Button variant="success" className="mr-3" onClick={this.ontoggle}>
                    <Pencil />
                </Button>
                <Button variant="danger" onClick={()=>this.onDelete(this.props.id)}>
                                            <X />
                                        </Button>
                <Modal
                    show={modalShow}
                    size="auto"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton onClick={this.ontoggle} >
                        <Modal.Title className="modeltitle" id="contained-modal-title-vcenter">
                            <h2>  Update User</h2>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username </Form.Label>
                                <Form.Control type="text" value={this.state.username} onChange={this.onChangename} placeholder="Enter name" />

                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" value={this.state.email} onChange={this.onChangeemail} placeholder="Enter email" />

                            </Form.Group>

                            {/* <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={this.state.password} onChange={this.onChangepassword} placeholder=" Enter Password" />
                            </Form.Group> */}
                            <Form.Group controlId="exampleForm.SelectCustom" >
                                <Form.Label>Select Role</Form.Label>
                                <Form.Control as="select" ref="role"  custom onClick={this.onChangerole}>
                                <option value={this.state.role._id}>{this.state.role.role}</option>

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
export default connect(mapStateToProps, { updateuser,getRole ,deleteUser})(CreateUser);