
import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { updateuser } from '../../../actions/authaction';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Pencil, X } from 'react-bootstrap-icons';
import axios from 'axios';
import Swal from 'sweetalert2'

class UpdateUser extends Component {
    state = {
        modalShow: false,
        role: "",
        name: ""

    }




    onChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const val = this.props.name.toLowerCase();
       
        if (val==="username"){ this.props.updateuser(this.props.id, { username: this.state.name });}
      else { this.props.updateuser(this.props.id, { email: this.state.name });}
        this.ontoggle()
    }

    ontoggle = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
    }
    componentDidMount() {
        this.setState({
            name: this.props.value
        })
    }

    render() {
        const { modalShow } = this.state;
        const { value } = this.props;
        return (

            <div >

                <Button variant="success" className="mr-3" onClick={this.ontoggle}>
                    <Pencil />
                </Button>

                <Modal
                    show={modalShow}
                    size="auto"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton onClick={this.ontoggle}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Update {this.props.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group as={Row} controlId="formPlaintextPassword">

                                <Col sm="10">
                                  {this.props.isemail ?  <Form.Control type="email" placeholder="Enter New Value" defaultValue={this.props.value} onChange={this.onChange} /> : <Form.Control type="text" placeholder= "Enter UserName" defaultValue={this.props.value} onChange={this.onChange} />} 
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

export default connect(null, { updateuser })(UpdateUser);



