

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { RiBillLine } from "react-icons/ri";
import ViewInvoice from '../invoice/src/App';
import ADDInvoice from './src/create';
import Swal from 'sweetalert2'
import { getinvoicedec } from '../../../actions/itemdescription';
import { removeFromStorage } from "../../../storage"

class UpdateCustomer extends Component {
  state = {
    modalInvoiceShow: false,
    modelshow: false,    

  }

  componentDidMount() {
    this.props.getinvoicedec()

  }
 
  ontoggleInvoiceclose = () => {
    this.setState({
      modalInvoiceShow: !this.state.modalInvoiceShow
    })
    removeFromStorage("items");
    removeFromStorage("program");

  }
 
  ontoggleInvoice = () => {
    this.setState({
      modalInvoiceShow: !this.state.modalInvoiceShow
    })
   

  }
 
  ontoggle = () => {
    this.setState({
      modalshow: !this.state.modalshow
    })
  }
 
  render() {
    const { modalshow, modalInvoiceShow } = this.state;
    return (

      <div >
        {/* <RiBillLine color="blue" size={20} className="mr-3"  /> */}
        <button type="button" class="btn btn-lg btn-primary btn-block print" onClick={this.ontoggleInvoice} >Print</button>

        <Modal
          show={modalInvoiceShow}
          dialogClassName="modal-90w"
          size="xl"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton onClick={this.ontoggleInvoiceclose}>
            <Modal.Title id="example-custom-modal-styling-title">
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ViewInvoice id={this.props.id} />

          </Modal.Body>

        </Modal>


        <Modal
          show={modalshow}
          dialogClassName="modal-90w"
          size="xl"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton onClick={this.ontoggle}>
            <Modal.Title id="example-custom-modal-styling-title">
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ADDInvoice id={this.props.id} />

          </Modal.Body>

        </Modal>

      </div>
    );
  }
}

export default connect(null, { getinvoicedec })(UpdateCustomer);



