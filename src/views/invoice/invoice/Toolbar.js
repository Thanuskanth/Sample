import React, { Component } from 'react';
import { addCustomer } from '../../../actions/customeraction';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Box } from '@material-ui/core';
import Invoice from "../create/App"
class AddCustomer extends Component {
  state = {
    modalShow: false,

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
        <Box
          display="flex"
          justifyContent="flex-end"
          mt={3}
        >

          <Button
            color="primary"

            onClick={this.ontoggle}
          >
            ADD {this.props.data}
          </Button>
        </Box>



        <Modal
          show={modalShow}
          dialogClassName="modal-90w"
          size="xl"
          aria-labelledby="example-custom-modal-styling-title"
          centered
        >
          <Modal.Header closeButton onClick={this.ontoggle}>
            <Modal.Title id="contained-modal-title-vcenter">
              ADD INVOICE
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Invoice />
          </Modal.Body>

        </Modal>
      </div>
    );
  }
}

export default connect(null, { addCustomer })(AddCustomer);

