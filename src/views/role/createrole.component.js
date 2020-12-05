import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addRole } from '../../actions/owneraction';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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

        this.props.addRole(this.state.role);
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
                    Add Role
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
                                    <Form.Control type="text" onChange={this.onChange} placeholder="Enter Role" />
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

export default connect(null, { addRole })(ListRole);