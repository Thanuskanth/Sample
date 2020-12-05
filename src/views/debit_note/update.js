import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { ImBin } from "react-icons/im";
import { RiBillLine } from "react-icons/ri";

import ViewDebit from './view/src/creaate';

import Swal from 'sweetalert2'
import { getinvoicedec, getAinvoicedec } from '../../actions/itemdescription';
import { removeFromStorage } from "../../storage"

class UpdateCustomer extends Component {
  state = {
    modalInvoiceShow: false,
    modelshow: false,
    modelreceipt: false,
    modelreceiptdet: false,
    modeldebit: false,
    modeldebitdet: false
    

  }

  componentDidMount() {
    this.props.getinvoicedec()

  }
  ontoggleInvoice = () => {
    this.setState({
      modalInvoiceShow: !this.state.modalInvoiceShow
    })
  }
  ontoggleDebit = () => {
    this.setState({
      modeldebit: !this.state.modeldebit
    })
  }
  ontoggleDebitDet = () => {
    this.setState({
      modeldebitdet: !this.state.modeldebitdet
    })
  }
  ontoggleInvoiceclose = () => {
    this.setState({
      modalInvoiceShow: !this.state.modalInvoiceShow
    })
   

  }
  ontogglereceiptdetail = () => {
    this.setState({
      modelreceiptdet: !this.state.modelreceiptdet
    })
  }
  ontoggle = () => {
    removeFromStorage("debitdet")
 
    this.setState({
      modalshow: !this.state.modalshow
    })
  }
  ontogglereceipt = () => {
    this.setState({
      modelreceipt: !this.state.modelreceipt
    })
  }

  onDelete = (id) => {

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
        Swal.fire({
          title: "You won't be able to revert this!",
          text: "",
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
            this.props.deleteCustomer(id);
          }
        })
      }
    })




  }
  render() {
    const { modalshow, modalInvoiceShow, modelreceipt, modelreceiptdet, modeldebit, modeldebitdet } = this.state;
    return (

      <div >
        <RiBillLine color="blue" size={20} className="mr-3" onClick={this.ontoggle} />
        {/* <ImBin color="red" size={20} className="mr-3" onClick={this.ontogglereceipt} /> */}
         {/* <Pencil color="green" size={20} className="mr-3" onClick={this.ontoggle} /> */}
        {/* <RiBillLine color="blue" size={20} className="mr-3" onClick={this.ontogglereceiptdetail} /> */}
        {/* <ImBin color="red" size={20} className="mr-3" onClick={this.ontoggleDebit} /> */}








{/* 
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

        </Modal> */}


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
            <ViewDebit id={this.props.id} />

          </Modal.Body>

        </Modal>

{/* 
        <Modal
          show={modelreceipt}
          dialogClassName="modal-90w"
          size="xl"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton onClick={this.ontogglereceipt}>
            <Modal.Title id="example-custom-modal-styling-title">
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Receipt id={this.props.id} />

          </Modal.Body>

        </Modal>


        <Modal
          show={modelreceiptdet}
          dialogClassName="modal-90w"
          size="xl"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton onClick={this.ontogglereceiptdetail}>
            <Modal.Title id="example-custom-modal-styling-title">
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReceiptList id={this.props.id} />

          </Modal.Body>

        </Modal>

        <Modal
                    show={modeldebit}
                    dialogClassName="modal-90w"
                    size="xl"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton onClick={this.ontoggleDebit}>
                        <Modal.Title  id="example-custom-modal-styling-title">
              </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <ViewDebit id={this.props.id}/>
                  
                    </Modal.Body>

                </Modal> */}

      </div>
    );
  }
}

export default connect(null, { getinvoicedec })(UpdateCustomer);



