
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteRole, updaterole } from '../../actions/owneraction';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Pencil, X } from 'react-bootstrap-icons';
import axios from 'axios';
import Swal from 'sweetalert2'
import store from '../../store';
import { header } from '../../actions/authaction';

class ListRole extends Component {
    state = {
        modalShow: false,
        role: ""

    }




    onChange = (e) => {
        this.setState({
            role: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        console.log("this.state.role", this.state.role)
        const role={
            role:this.state.role,
            id:this.props.id
        }
        this.props.updaterole(role);
        this.ontoggle()
    }

    ontoggle = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
        this.componentDidMount();
    }
    componentDidMount() {
        axios.get('http://localhost:5000/role/' + this.props.id,header(store.getState().auth.token)).then(res => {
            this.setState({
                role: res.data.role
            })
        }

        )
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
            this.props.deleteRole(id);
          }
        })
            
  
         
       
  }
    render() {
        const { modalShow } = this.state;
        return (

            <div >

                <Button variant="success" className="mr-3" onClick={this.ontoggle}>
                    <Pencil />
                </Button>
                {/* <Button variant="danger" onClick={()=>this.onDelete(this.props.id)}>
                                            <X />
                                        </Button> */}
                <Modal
                    show={modalShow}
                    size="auto"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton onClick={this.ontoggle}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update Role
                          </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group as={Row} controlId="formPlaintextPassword">

                                <Col sm="10">
                                    <Form.Control type="text" value={this.state.role} onChange={this.onChange} placeholder="Enter Role" />
                                </Col>
                                <Button variant="primary" sm="2" type="submit">
                                    Save
                                            </Button>
                            </Form.Group>




                        </Form>
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}

export default connect(null, { deleteRole,updaterole,header })(ListRole);



