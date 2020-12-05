import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addProgram } from '../../actions/programaction';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
class AddProgram extends Component {
    state = {
        modalShow: false,
         program_name: ""

    }

    onChange = (e) => {
        this.setState({
            program_name: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        // console.log("this.state.role", this.state.role)

        this.props.addProgram(this.state.program_name);
        this.ontoggle()
    }

    ontoggle = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
    }


    render() {
        const { modalShow } = this.state;
        return (

            <div  >
                <Button variant="primary" className="addRole" onClick={this.ontoggle}>
                    Add Program
                 </Button>

                <Modal
                    show={modalShow}
                    size="auto"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton onClick={this.ontoggle}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Create Role
              </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Group as={Row} controlId="formPlaintextPassword">

                                <Col sm="10">
                                    <Form.Control type="text" onChange={this.onChange} autofocus placeholder="Enter  Program" />
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

export default connect(null, { addProgram })(AddProgram);